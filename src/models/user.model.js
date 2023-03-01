const db = require("../configs/postgre");

module.exports = {
  getUsers: () => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM users";
      db.query(sql, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    });
  },
};
