const db = require("../configs/postgre");

module.exports = {
  createOrder: (data) => {
    return new Promise((resolve, reject) => {
      const sql =
        "INSERT INTO orders (user_id, product_id) values ($1, $2) RETURNING *";
      const values = [data.user_id, data.product_id];

      db.query(sql, values, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    });
  },
  getOrdersHistory: (userId) => {
    return new Promise((resolve, reject) => {
      const sql =
        "select o.id, u.display_name as user_name, p.name as product_name, p.price, o.status, o.ordered_at from users u join orders o on o.user_id = u.id join products p on o.product_id = p.id WHERE u.id = $1";
      const values = [userId];

      db.query(sql, values, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    });
  },
  getOrderDetails: (userId, orderId) => {
    return new Promise((resolve, reject) => {
      const sql =
        "select o.id as order_id, o.user_id, o.status, o.ordered_at, o.product_id, p.name as product_name, p.price from orders o join products p on p.id = o.product_id where o.id = $1 and o.user_id = $2;";
      const values = [orderId, userId];

      db.query(sql, values, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    });
  },
  getOrderById: (id) => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM orders where id = $1";
      const values = [id];

      db.query(sql, values, (error, result) => {
        if (error) reject(error);
        resolve(result);
      });
    });
  },
  deleteOrder: (id) => {
    return new Promise((resolve, reject) => {
      const sql = "DELETE FROM orders WHERE id = $1 RETURNING *";
      const values = [id];

      db.query(sql, values, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    });
  },
  updateOrder: (id, data, updated_at) => {
    return new Promise((resolve, reject) => {
      const sql = "update orders set ";
      const dataUpdate = [];
      const values = [];

      let i = 1;
      for (let props in data) {
        if (data[props] !== "" && data[props] != null) {
          dataUpdate.push(`${props} = $${i}`);
          values.push(data[props]);
          i += 1;
        }
      }

      const dateQuery = `, updated_at = $${i}`;

      values.push(updated_at, id);
      i += 1;

      const sqlQuery =
        sql +
        dataUpdate.join(", ") +
        dateQuery +
        " WHERE id = $" +
        i +
        " RETURNING *";

      db.query(sqlQuery, values, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    });
  },
};
