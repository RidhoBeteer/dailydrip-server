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
};
