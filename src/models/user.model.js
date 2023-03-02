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
  createUser: (email, password, phone) => {
    return new Promise((resolve, reject) => {
      const sql =
        "INSERT INTO users(email, phone, password) values ($1, $2, $3) RETURNING email, phone";
      const values = [email, phone, password];

      db.query(sql, values, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    });
  },
};
