const db = require("../configs/postgre");

module.exports = {
  getProducts: (query) => {
    return new Promise((resolve, reject) => {
      const sql = `select p.id as product_id, p."name" as product_name, p.description, p.price, p.stocks, c."name" as category from products p join categories c on c.id = p.category_id `;
      let conditions = `where lower(p."name") like '%' || $1 || '%' `;
      const values = [query.search];

      if (
        query.category !== undefined &&
        query.category.replace(/\s/g, "") !== ""
      ) {
        conditions += `and lower(c."name") like $2 `;
        values.push(query.category);
      }

      const orders = `order by ${query.column} ${query.order} `;
      const limits = `limit ${query.limit}`;

      const fullQuery = sql + conditions + orders + limits;
      // console.log(fullQuery);
      // console.log(values);
      db.query(fullQuery, values, (error, result) => {
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
