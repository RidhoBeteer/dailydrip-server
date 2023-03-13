const db = require("../configs/postgre");

module.exports = {
  userChecking: (data) => {
    return new Promise((resolve, reject) => {
      const sql = "select count(*) from users where ";
      let conditions = "email = $1";
      const values = [data.email];

      if ("phone" in data) {
        conditions = "phone = $1";
        values.pop();
        values.push(data.phone);
      }

      const completeSql = sql + conditions;

      db.query(completeSql, values, (error, result) => {
        if (error) return reject(error);
        resolve(result.rows[0].count);
      });
    });
  },
  loginHandler: (data) => {
    return new Promise((resolve, reject) => {
      const sql =
        "select u.id, u.email, u.password, u.display_name, r.name as role from users u join roles r on r.id = u.role_id where email = $1";
      const values = [data.email];

      db.query(sql, values, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    });
  },
  getPassword: (userId) => {
    return new Promise((resolve, reject) => {
      const sql = "select password from users where id = $1";
      const values = [userId];

      db.query(sql, values, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    });
  },
  changePassword: (userId, newPassword) => {
    return new Promise((resolve, reject) => {
      const sql = "update users set password = $1 where id = $2";
      const values = [newPassword, userId];

      db.query(sql, values, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    });
  },
  registerHandler: (data) => {
    return new Promise((resolve, reject) => {
      const sql =
        "insert into users(email, phone, password) values($1, $2, $3) returning id, email, phone";
      const values = [data.email, data.phone, data.password];

      db.query(sql, values, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    });
  },
  createOtp: (email, otp) => {
    return new Promise((resolve, reject) => {
      const sql = "update users set otp = $1 WHERE email = $2";
      const values = [otp, email];

      db.query(sql, values, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    });
  },
  resetWithOtp: (data) => {
    return new Promise((resolve, reject) => {
      const sql = "update users set password = $1 where otp = $2";
      const values = [data.hashedPassword, data.otp];

      db.query(sql, values, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    });
  },
  removeOtp: (otp) => {
    return new Promise((resolve, reject) => {
      const sql = "update users set otp = NULL where otp = $1";
      db.query(sql, [otp], (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    });
  },
};
