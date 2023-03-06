const wrapper = require("../utils/wrapper");
const ordersModel = require("../models/orders.model");
const usersModel = require("../models/users.model");
const productsModel = require("../models/products.model");

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

      const checkUserId = await usersModel.getUser(user_id);

      if (checkUserId.rows.length < 1) {
        return wrapper.response(
          res,
          404,
          "Error, There's no user with provided ID",
          []
        );
      }

      const checkProductId = await productsModel.getProductDetails(product_id);

      if (checkProductId.rows.length < 1) {
        return wrapper.response(
          res,
          404,
          "Error, There's no product with provided ID",
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
      console.log(error);
      return wrapper.response(res, 500, "Internal Server Error", null);
    }
  },
  getOrdersHistory: async (req, res) => {
    try {
      const { user_id } = req.headers;

      if (user_id === undefined || user_id.replace(/\s/g, "") === "") {
        return wrapper.response(
          res,
          403,
          "Error, Make sure you're logged in!",
          []
        );
      }

      const result = await ordersModel.getOrdersHistory(user_id);

      if (result.rows.length < 1) {
        return wrapper.response(res, 404, "Data Not Found", []);
      }

      return wrapper.response(
        res,
        200,
        "Success Get Orders History",
        result.rows
      );
    } catch (error) {
      return wrapper.response(res, 500, "Internal Server Erro", null);
    }
  },
  getOrderDetails: async (req, res) => {
    try {
      const { id: order_id } = req.params;
      const { user_id } = req.headers;

      if (user_id === undefined || user_id.replace(/\s/g, "") === "") {
        return wrapper.response(
          res,
          403,
          "Error, Make sure you're logged in!",
          []
        );
      }

      if (order_id === undefined || order_id.replace(/\s/g, "") === "") {
        return wrapper.response(res, 403, "Error, Invalid Order ID", []);
      }

      const result = await ordersModel.getOrderDetails(user_id, order_id);

      if (result.rows.length < 1) {
        return wrapper.response(res, 404, "Data Not Found", []);
      }

      return wrapper.response(res, 200, "Success Get Order Data", result.rows);
    } catch (error) {
      console.log(error);
      return wrapper.response(res, 500, "Internal Server Error", null);
    }
  },
  deleteOrder: async (req, res) => {
    try {
      const { id } = req.params;

      if (id === undefined || id.replace(/\s/g, "") === "") {
        return wrapper.response(res, 400, "Invalid Order ID", []);
      }

      const checkId = await ordersModel.getOrderById(id);

      if (checkId.rows.length < 1) {
        return wrapper.response(res, 404, "Data Not Found", []);
      }

      const result = await ordersModel.deleteOrder(id);

      return wrapper.response(res, 200, "Success Deleting Order", result.rows);
    } catch (error) {
      return wrapper.response(res, 500, "Internal Server Error", null);
    }
  },
  updateOrder: async (req, res) => {
    try {
      const { id } = req.params;

      const checkOrderId = await ordersModel.getOrderById(id);

      if (checkOrderId.rows.length < 1) {
        return wrapper.response(res, 404, "Data Not Found", []);
      }

      const reqData = { ...req.body };

      if (Object.keys(reqData).length < 1) {
        return wrapper.response(
          res,
          400,
          "Provide at least one data to update",
          []
        );
      }

      if (reqData.user_id !== undefined) {
        if (reqData.user_id.replace(/\s/g, "") === "") {
          return wrapper.response(res, 400, "Invalid User ID Type", []);
        }

        const checkUserId = await usersModel.getUser(reqData.user_id);

        if (checkUserId.rows.length < 1) {
          return wrapper.response(
            res,
            400,
            "There's no user with provided ID",
            []
          );
        }
      }

      if (reqData.product_id !== undefined) {
        if (reqData.product_id.replace(/\s/g, "") === "") {
          return wrapper.response(res, 400, "Invalid Product ID Type", []);
        }

        const checkProductId = await productsModel.getProductDetails(
          reqData.product_id
        );

        if (checkProductId.rows.length < 1) {
          return wrapper.response(
            res,
            400,
            "There's no Product with provided ID",
            []
          );
        }
      }

      if (reqData.status !== undefined) {
        if (reqData.status.replace(/\s/g, "") === "") {
          return wrapper.response(
            res,
            400,
            "Make sure 'status' input is not an empty string",
            []
          );
        }
      }

      const currDate = new Date();

      const result = await ordersModel.updateOrder(id, reqData, currDate);

      return wrapper.response(
        res,
        200,
        "Success Updating Order History Data",
        result.rows
      );
    } catch (error) {
      console.log(error);
      return wrapper.response(res, 500, "Internal Server Error", null);
    }
  },
};
