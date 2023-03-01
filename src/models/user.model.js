const db = require("../configs/postgre");

module.exports = {
  getUsers: (search, column, orderBy, limit) => {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM users where lower(display_name) like '%${search}%' ORDER BY ${column} ${orderBy} LIMIT ${limit}`;
      db.query(sql, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    });
  },
  getUser: (id) => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM users WHERE id = $1";
      const value = [id];
      db.query(sql, value, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    });
  },
};
