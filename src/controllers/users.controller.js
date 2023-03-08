const wrapper = require("../utils/wrapper");
const usersModel = require("../models/users.model");

module.exports = {
  getUsers: async (req, res) => {
    try {
      // let { search, column, orderBy, limit } = req.query;

      // search = search || "";
      // column = column || "id";
      // orderBy = orderBy || "ASC";
      // limit = +limit || 5;
      // console.log(search, column, orderBy, limit);

      const result = await usersModel.getUsers();

      if (result.rows.length < 1) {
        return wrapper.response(res, 404, "Data Not Found", []);
      }

      const data = result.rows;

      return wrapper.response(res, 200, "Success Get Data", data);
    } catch (error) {
      return wrapper.response(res, 500, "Internal Server Error", null);
    }
  },
  getUser: async (req, res) => {
    try {
      const { id } = req.params;

      if (id === undefined || id === ":id") {
        return wrapper.response(res, 400, "Invalid User ID", []);
      }

      const result = await usersModel.getUser(id);

      if (result.rows.length < 1) {
        return wrapper.response(res, 404, "Data Not Found", []);
      }

      return wrapper.response(res, 200, "Success Get Data", result.rows);
    } catch (error) {
      return wrapper.response(res, 500, "Internal Server Error", null);
    }
  },
  createUser: async (req, res) => {
    try {
      const { email, password, phone } = req.body;
      // const isValid = [];

      if (
        email === "" ||
        email === undefined ||
        password === "" ||
        password === undefined ||
        phone === "" ||
        phone === undefined
      ) {
        return wrapper.response(
          res,
          400,
          "All Input fields should be filled",
          []
        );
      }

      const result = await usersModel.createUser(email, password, phone);

      return wrapper.response(res, 201, "Success Create User", result.rows);
    } catch (error) {
      return wrapper.response(res, 500, "Internal Server Error", null);
    }
  },
  updateUserData: async (req, res) => {
    try {
      const { id } = req.params;

      if (id === undefined || id === ":id") {
        return wrapper.response(res, 400, "Invalid User ID", []);
      }

      const checkId = await usersModel.getUser(id);

      if (checkId.rows.length < 1) {
        return wrapper.response(
          res,
          404,
          "User with provided ID does not exist",
          []
        );
      }

      const updateObj = { ...req.body };

      if (Object.keys(updateObj).length < 1) {
        return wrapper.response(
          res,
          400,
          "Provide at least one data to update",
          []
        );
      }

      const result = await usersModel.updateUserData(id, updateObj);

      return wrapper.response(
        res,
        200,
        "Success Updating User Data",
        result.rows
      );
    } catch (error) {
      return wrapper.response(res, 500, "Internal Server Error", null);
    }
  },
  updateUserPassword: async (req, res) => {
    try {
      const { id } = req.params;

      if (id === undefined || id === ":id") {
        return wrapper.response(res, 400, "Invalid User ID", []);
      }

      const checkId = await usersModel.getUser(id);

      if (checkId.rows.length < 1) {
        return wrapper.response(
          res,
          400,
          "User with provided ID does not exist",
          []
        );
      }

      const { oldPassword, newPassword, confirmNewPassword } = req.body;
      const isFilled = [
        oldPassword || null,
        newPassword || null,
        confirmNewPassword || null,
      ];
      const isValidInput = isFilled.every((el) => el !== null);

      if (!isValidInput) {
        return wrapper.response(
          res,
          400,
          "All Input fields should be filled",
          []
        );
      }

      const checkOldPassword = await usersModel.getUser(id);

      if (oldPassword !== checkOldPassword.rows[0].password) {
        return wrapper.response(
          res,
          403,
          "The password provided doesn't match the one stored in the database",
          []
        );
      }

      if (newPassword !== confirmNewPassword) {
        return wrapper.response(
          res,
          400,
          "New Password and Confirm Password doesn't match",
          []
        );
      }

      const result = await usersModel.updateUserPassword(id, newPassword);

      return wrapper.response(
        res,
        200,
        "Success Updating Password",
        result.rows
      );
    } catch (error) {
      return wrapper.response(res, 500, "Internal Server Error", null);
    }
  },
  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;

      if (id === undefined || id === ":id") {
        return wrapper.response(res, 400, "Invalid User ID", []);
      }

      const checkId = await usersModel.getUser(id);

      if (checkId.rows.length < 1) {
        return wrapper.response(
          res,
          404,
          "User with provided ID does not exist",
          []
        );
      }

      const result = await usersModel.deleteUser(id);

      return wrapper.response(res, 200, "Success Delete User", result.rows);
    } catch (error) {
      return wrapper.response(res, 500, "Internal Server Error", null);
    }
  },
};
