const wrapper = require("../utils/wrapper");
const authModel = require("../models/auth.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const otpGen = require("otp-generator");

module.exports = {
  loginHandler: async (req, res) => {
    try {
      const result = await authModel.loginHandler(req.body);

      if (result.rows.length < 1) {
        return wrapper.response(res, 401, "Incorrect Email/Password", []);
      }
      const { id, email, display_name, password, role } = result.rows[0];

      const isValidPassword = await bcrypt.compare(req.body.password, password);

      if (!isValidPassword) {
        return wrapper.response(res, 401, "Incorrect Email/Password", []);
      }

      const jwtPayload = { id, display_name, role };
      const jwtSecret = process.env.JWT_SECRET;
      const jwtOptions = {
        expiresIn: "5m",
      };

      jwt.sign(jwtPayload, jwtSecret, jwtOptions, (err, token) => {
        if (err) throw err;
        return wrapper.response(res, 200, "Success Login", { email, token });
      });
    } catch (error) {
      console.log(error);
      return wrapper.response(res, 500, "Internal Server Error", null);
    }
  },
  registerHandler: async (req, res) => {
    try {
      if (Object.keys(req.body).length < 3) {
        return wrapper.response(
          res,
          400,
          "All input fields must be filled",
          []
        );
      }

      const { email, phone, password } = req.body;
      const registrationData = { email };

      const isValidEmail = await authModel.userChecking(registrationData);
      if (+isValidEmail > 0) {
        return wrapper.response(res, 400, "Email already registered", []);
      }

      registrationData.phone = phone;
      const isValidPhone = await authModel.userChecking(registrationData);
      if (+isValidPhone > 0) {
        return wrapper.response(
          res,
          400,
          "Phone number already registered",
          []
        );
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      registrationData.password = hashedPassword;

      const result = await authModel.registerHandler(registrationData);
      return wrapper.response(res, 201, "Success Register", result.rows);
    } catch (error) {
      return wrapper.response(res, 500, "Internal Server Error", null);
    }
  },
  changePassword: async (req, res) => {
    try {
      const { id: userId } = req.authInfo;
      const { oldPassword, newPassword, confirmNewPassword } = req.body;

      const checkPass = await authModel.getPassword(userId);
      const storedPassword = checkPass.rows[0].password;

      const isValidPassword = await bcrypt.compare(oldPassword, storedPassword);
      if (!isValidPassword) {
        return wrapper.response(res, 403, "Old Password is incorrect", []);
      }

      if (newPassword !== confirmNewPassword) {
        return wrapper.response(
          res,
          400,
          "New Password and Confirm New Password do not match",
          []
        );
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await authModel.changePassword(userId, hashedPassword);

      return wrapper.response(res, 200, "Success Change Password", []);
    } catch (error) {
      console.log(error);
      return wrapper.response(res, 500, "Internal Server Error", null);
    }
  },
  requestReset: async (req, res) => {
    try {
      const { email } = req.body;

      if (!email || email.replace(/\s/g, "") === "") {
        return wrapper.response(res, 400, "Invalid Email", []);
      }

      const checkEmail = await authModel.userChecking({ email });

      let otp;
      if (+checkEmail > 0) {
        otp = otpGen.generate(6, {
          upperCaseAlphabets: false,
          lowerCaseAlphabets: false,
          specialChars: false,
        });

        await authModel.createOtp(email, otp);
      }

      return wrapper.response(
        res,
        200,
        "If email is registered, we will send the OTP to reset your password",
        []
      );
    } catch (error) {
      console.log(error);
      return wrapper.response(res, 500, "Internal Server Error", null);
    }
  },
  resetPassword: async (req, res) => {
    try {
      const { otp, password, confirmPassword } = req.body;

      if (!otp || !password || !confirmPassword) {
        return wrapper.response(
          res,
          400,
          "All Input fields must be filled",
          []
        );
      }

      if (password !== confirmPassword) {
        return wrapper.response(
          res,
          400,
          "Password and confirm password do not match!",
          []
        );
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const result = await authModel.resetWithOtp({ otp, hashedPassword });

      if (result.rowCount === 0) {
        return wrapper.response(
          res,
          401,
          "Oops, make sure the entered OTP is correct!",
          []
        );
      }
      await authModel.removeOtp(otp);
      return wrapper.response(res, 200, "Success Reset Password", []);
    } catch (error) {
      console.log(error);
      return wrapper.response(res, 500, "Internal Server Error", null);
    }
  },
};
