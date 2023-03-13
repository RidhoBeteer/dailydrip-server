const wrapper = require("../utils/wrapper");
const authModel = require("../models/auth.model");

module.exports = {
  loginAuth: async (req, res) => {
    try {
      console.log(req.body);
    } catch (error) {
      console.log(error);
      return wrapper.response(res, 500, "Internal Server Error", null);
    }
  },
};
