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
};
