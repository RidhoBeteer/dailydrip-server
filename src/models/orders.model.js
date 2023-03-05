const db = require("../configs/postgre");

module.exports = {
  createOrder: (data) => {
    return new Promise((resolve, reject) => {
      const sql =
        "INSERT INTO orders (user_id, product_id) values ($1, $2) RETURNING *";
      const values = [data.user_id, data.product_id];

      db.query(sql, values, (error, result) => {
        if (error) return rejec(error);
        resolve(result);
      });
    });
  },
};
