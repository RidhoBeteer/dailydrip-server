const wrapper = require("../utils/wrapper");
const promosModel = require("../models/promos.model");

module.exports = {
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
};
