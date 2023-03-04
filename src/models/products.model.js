const db = require("../configs/postgre");

module.exports = {
  getProducts: () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM products LIMIT 5", (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    });
  },
  createNewProduct: (data) => {
    return new Promise((resolve, reject) => {
      const sql =
        "INSERT INTO products (name, price, description, stocks, category_id) values ($1, $2, $3, $4, $5) RETURNING *";
      const values = [
        data.name,
        data.price,
        data.description,
        data.stocks,
        data.category_id,
      ];

      db.query(sql, values, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    });
  },
};
