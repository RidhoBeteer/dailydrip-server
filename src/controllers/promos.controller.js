const wrapper = require("../utils/wrapper");
const promosModel = require("../models/promos.model");

module.exports = {
  getPromos: async (req, res) => {
    try {
      const result = await promosModel.getPromos();

      if (result.rows.length < 1) {
        return wrapper.response(res, 404, "Data Not Found", []);
      }

      return wrapper.response(res, 200, "Success Get Promos", result.rows);
    } catch (error) {
      console.log(error);
      return wrapper.response(res, 500, "Internal Server Error", null);
    }
  },
  getPromoDetails: async (req, res) => {
    try {
      const { id } = req.params;

      if (
        id.replace(/\s/g, "") === "" ||
        +id === 1 ||
        id === undefined ||
        id == null
      ) {
        return wrapper.response(res, 400, "Invalid Id", []);
      }

      const result = await promosModel.getPromoDetails(id);

      if (result.rows.length < 1) {
        return wrapper.response(res, 404, "Data Not Found", []);
      }

      return wrapper.response(res, 200, "Success Get Data", result.rows);
    } catch (error) {
      console.log(error);
      return wrapper.response(res, 500, "Internal Server Error", null);
    }
  },
  createNewPromo: async (req, res) => {
    try {
      const { name, description, code, discount, promo_start, promo_end } =
        req.body;

      if (
        name === "" ||
        description === "" ||
        code === "" ||
        discount === "" ||
        promo_start === "" ||
        promo_end === ""
      ) {
        return wrapper.response(res, 400, "Provided data invalid", []);
      }

      if (
        name === undefined ||
        description === undefined ||
        code === undefined ||
        discount === undefined ||
        promo_start === undefined ||
        promo_end === undefined
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
        description,
        code,
        discount,
        promo_start,
        promo_end,
      };

      const result = await promosModel.createNewPromo(payload);
      console.log(result);
      return wrapper.response(
        res,
        201,
        "Success Creating New Promo",
        result.rows
      );
    } catch (error) {
      return wrapper.response(res, 500, "Internal Server Error", null);
    }
  },
  updatePromo: async (req, res) => {
    try {
      const { id } = req.params;

      const checkId = await promosModel.getPromoDetails(id);

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

      const result = await promosModel.updatePromo(id, payload);

      return wrapper.response(res, 200, "Success Update Product", result.rows);
    } catch (error) {
      return wrapper.response(res, 500, "Internal Server Error", null);
    }
  },
  deletePromo: async (req, res) => {
    try {
      const { id } = req.params;
      if (
        id.replace(/\s/g, "") === "" ||
        +id === 1 ||
        id === undefined ||
        id == null
      ) {
        return wrapper.response(res, 400, "Invalid Id", []);
      }

      const checkId = await promosModel.getPromoDetails(id);

      if (checkId.rows.length < 1) {
        return wrapper.response(res, 404, "Data Not Found", []);
      }

      const result = await promosModel.deletePromo(id);
      return wrapper.response(res, 200, "Success Deleting Promo", result.rows);
    } catch (error) {
      return wrapper.response(res, 500, "Internal Server Error", null);
    }
  },
};
