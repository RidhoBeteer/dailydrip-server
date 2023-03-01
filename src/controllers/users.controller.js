const wrapper = require("../utils/wrapper");
const userModel = require("../models/user.model");

module.exports = {
  getUsers: async (req, res) => {
    try {
      const result = await userModel.getUsers();

      if (result.rows.length < 1) {
        return wrapper.response(res, 404, "Data Not Found", []);
      }

      const data = result.rows;

      return wrapper.response(res, 200, "Success Get Data", data);
    } catch (error) {
      return wrapper.response(res, 500, "Internal Server Error", []);
    }
  },
};
