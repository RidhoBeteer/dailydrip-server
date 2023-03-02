const wrapper = require("../utils/wrapper");
const userModel = require("../models/user.model");

module.exports = {
  getUsers: async (req, res) => {
    try {
      let { search, column, orderBy, limit } = req.query;

      column = column || "id";
      orderBy = orderBy || "ASC";
      limit = +limit || 5;

      const result = await userModel.getUsers(search, column, orderBy, limit);

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
      const result = await userModel.getUser(id);

      if (result.rows.length < 1) {
        return wrapper.response(res, 404, "Data Not Found", []);
      }

      const data = result.rows;

      return wrapper.response(res, 200, "Success Get Data", data);
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
        return wrapper.response(res, 400, "All Inputs should be filled", []);
      }

      const result = await userModel.createUser(email, password, phone);

      return wrapper.response(res, 201, "Success Create User", result.rows);
    } catch (error) {
      return wrapper.response(res, 500, "Internal Server Error", null);
    }
  },
};
