const db = require("../configs/postgre");

module.exports = {
  createNewPromo: (data) => {
    return new Promise((resolve, reject) => {
      const sql =
        "INSERT INTO promos (name, description, code, discount, promo_start, promo_end) values ($1, $2, $3, $4, $5, $6) RETURNING *";
      const values = [
        data.name,
        data.description,
        data.code,
        data.discount,
        data.promo_start,
        data.promo_end,
      ];

      db.query(sql, values, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    });
  },
};
