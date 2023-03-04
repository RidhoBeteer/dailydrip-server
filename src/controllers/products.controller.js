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
  createNewProduct: async (req, res) => {
    try {
      const { name, price, description, stocks, category_id } = req.body;

      if (
        name === "" ||
        price === "" ||
        description === "" ||
        stocks === "" ||
        category_id === ""
      ) {
        return wrapper.response(res, 400, "Provided data invalid", []);
      }

      if (
        name === undefined ||
        price === undefined ||
        description === undefined ||
        stocks === undefined ||
        category_id === undefined
      ) {
        return wrapper.response(
          res,
          400,
          "All input fields should not be empty",
          []
        );
      }

      const payload = {
        name,
        price,
        description,
        stocks,
        category_id,
      };

      const result = await productsModel.createNewProduct(payload);

      return wrapper.response(
        res,
        201,
        "Success Creating New Product",
        result.rows
      );
    } catch (error) {
      console.log(error);
      return wrapper.response(res, 500, "Internal Server Error", null);
    }
  },
};
