const db = require("../configs/postgre");

module.exports = {
  getUsers: (search, column, orderBy, limit) => {
    return new Promise((resolve, reject) => {
      // const sql = `SELECT * FROM users where lower(display_name) like '%${search}%' ORDER BY ${column} ${orderBy} LIMIT ${limit}`;
      const sql = `SELECT * FROM users WHERE role_id = 2 ORDER BY ${column} ${orderBy} LIMIT ${limit}`;
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
  updateUserData: (id, data) => {
    return new Promise((resolve, reject) => {
      const sql = "UPDATE users set ";
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
  updateUserPassword: (id, newPwd) => {
    return new Promise((resolve, reject) => {
      const sql =
        "UPDATE users SET password = $1 WHERE id = $2 RETURNING id, email";
      const values = [newPwd, id];

      db.query(sql, values, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    });
  },
  deleteUser: (id) => {
    return new Promise((resolve, reject) => {
      const sql = "DELETE FROM users WHERE id = $1 RETURNING *";
      const values = [id];

      db.query(sql, values, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    });
  },
};
