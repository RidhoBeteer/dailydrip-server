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
  getProductDetails: (id) => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM products where id = $1";
      const values = [id];

      db.query(sql, values, (error, result) => {
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
  updateProduct: (id, data) => {
    return new Promise((resolve, reject) => {
      const sql = "UPDATE products set ";
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

      values.push(id);
      const sqlQuery =
        sql + dataUpdate.join(", ") + " WHERE id = $" + i + " RETURNING *";

      db.query(sqlQuery, values, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    });
  },
  deleteProduct: (id) => {
    return new Promise((resolve, reject) => {
      const sql = "DELETE FROM products where id = $1 RETURNING *";
      const values = [id];

      db.query(sql, values, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    });
  },
};
