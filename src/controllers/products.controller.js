const wrapper = require("../utils/wrapper");
const productsModel = require("../models/products.model");

module.exports = {
  getProducts: async (req, res) => {
    try {
      let { search, column, order, limit, category } = req.query;

      search = search ? search.toLowerCase() : "";
      column = column ? column.toLowerCase() : "price";
      order = order ? order.toLowerCase() : "asc";
      limit = limit ? Math.abs(+limit) : 5;
      category = category || "";

      const filters = {
        search,
        column,
        order,
        limit,
        category,
      };

      switch (filters.column) {
        case "price":
        case "stocks":
        case "category":
          filters.column = column;
          break;
        default:
          filters.column = "price";
          break;
      }

      switch (filters.order) {
        case "asc":
        case "desc":
          break;
        default:
          filters.order = "asc";
      }

      if (isNaN(filters.limit)) {
        filters.limit = 5;
      }

      const result = await productsModel.getProducts(filters);

      if (result.rows.length < 1) {
        return wrapper.response(res, 404, "Data Not Found", []);
      }

      return wrapper.response(res, 200, "Success Get Products", result.rows);
    } catch (error) {
      console.log(error);
      return wrapper.response(res, 500, "Internal Server Error", null);
    }
  },
  getProductDetails: async (req, res) => {
    try {
      const { id } = req.params;

      const result = await productsModel.getProductDetails(id);

      if (result.rows.length < 1) {
        return wrapper.response(res, 404, "Data Not Found", []);
      }

      return wrapper.response(res, 200, "Success Get Data", result.rows);
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
          "All input fields should be filled",
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
      return wrapper.response(res, 500, "Internal Server Error", null);
    }
  },
  updateProduct: async (req, res) => {
    try {
      const { id } = req.params;

      if (id === undefined || id === ":id") {
        return wrapper.response(res, 400, "Invalid Product Id", []);
      }

      const checkId = await productsModel.getProductDetails(id);

      if (checkId.rows.length < 1) {
        return wrapper.response(
          res,
          404,
          "Product with provided ID does not exist",
          []
        );
      }

      const payload = { ...req.body };

      if (Object.keys(payload).length < 1) {
        return wrapper.response(
          res,
          400,
          "Provide at least one data to update",
          []
        );
      }

      const result = await productsModel.updateProduct(id, payload);

      return wrapper.response(res, 200, "Success Update Product", result.rows);
    } catch (error) {
      return wrapper.response(res, 500, "Internal Server Error", null);
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const { id } = req.params;

      // add id checking later;

      const result = await productsModel.deleteProduct(id);

      return wrapper.response(res, 200, "Success Delete Product", result.rows);
    } catch (error) {
      console.log(error);
      return wrapper.response(res, 500, "Internal Server Error", null);
    }
  },
};
