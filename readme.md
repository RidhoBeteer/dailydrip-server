# Daily-Drip-Backend

This is REST API for Daily Drip Coffee Shop website. With Daily Drip Website, users can order meals and beverages.

## How to Install

```sh
$ git clone https://github.com/RidhoBeteer/dailydrip-server.git
$ npm install
```

Then create .env file with the following contents:

```
SERVER_PORT = [YOUR_PORT]

DB_HOST = [YOUR_DB_HOST]
DB_PORT = [YOUR_DB_PORT]
DB_NAME = [YOUR_DB_NAME]
DB_USER = [YOUR_DB_USER]
DB_PASSWORD = [YOUR_DB_PASSWORD]
```

Then visit [http://localhost:SERVER_PORT/](http://localhost:SERVER_PORT/) on browser or [Postman](https://www.postman.com/)

## Dependencies

- [![dotenv](https://img.shields.io/badge/dotenv-v16.0.3-blue)](https://www.npmjs.com/package/dotenv)
- [![express](https://img.shields.io/badge/express-v4.18.2-blue)](https://www.npmjs.com/package/express)
- [![pg](https://img.shields.io/badge/pg-v8.9.0-blue)](https://www.npmjs.com/package/pg)

## Development Dependencies

- [![nodemon](https://img.shields.io/badge/nodemon-v2.0.20-brightgreen)](https://www.npmjs.com/package/nodemon)
