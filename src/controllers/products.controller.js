const wrapper = require("../utils/wrapper");
const productsModel = require("../models/products.model");

module.exports = {
  getProducts: async (req, res) => {
    try {
      const result = await productsModel.getProducts();

      if (result.rows.length < 1) {
        return wrapper.response(res, 404, "Data Not Found", []);
      }

      return wrapper.response(res, 200, "Success Get Products", result.rows);
    } catch (error) {
      return wrapper.response(res, 500, "Internal Server Error", null);
    }
  },
};
