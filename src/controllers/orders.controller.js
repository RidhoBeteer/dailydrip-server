const wrapper = require("../utils/wrapper");
const ordersModel = require("../models/orders.model");

module.exports = {
  createOrder: async (req, res) => {
    try {
      const { user_id, product_id } = req.body;

      if (user_id === undefined || product_id === undefined) {
        return wrapper.response(res, 400, "Input Provided is Invalid", []);
      }

      if (
        user_id.replace(/\s/g, "") === "" ||
        product_id.replace(/\s/g, "") === ""
      ) {
        return wrapper.response(
          res,
          400,
          "Please Provide valid User ID and Product Id",
          []
        );
      }

      const payload = {
        user_id,
        product_id,
      };

      const result = await ordersModel.createOrder(payload);

      return wrapper.response(res, 201, "Success Creating Order", result.rows);
    } catch (error) {
      return wrapper.response(res, 500, "Internal Server Error", null);
    }
  },
};
