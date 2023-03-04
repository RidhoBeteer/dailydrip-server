const db = require("../configs/postgre");

module.exports = {
  getPromos: () => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM promos WHERE id <> 1 ORDER BY promo_end DESC";
      db.query(sql, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    });
  },
  getPromoDetails: (id) => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM promos WHERE id = $1";
      const values = [id];

      db.query(sql, values, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    });
  },
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
  updatePromo: (id, data) => {
    return new Promise((resolve, reject) => {
      const sql = "UPDATE promos set ";
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
  deletePromo: (id) => {
    return new Promise((resolve, reject) => {
      const sql = "DELETE FROM promos WHERE ID = $1 RETURNING *";
      const values = [id];

      db.query(sql, values, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    });
  },
};
