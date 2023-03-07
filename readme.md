<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/ridhobeteer/daily-drip">
    <img src="./public/assets/image/coffee-shop-logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center" style="font-size: 32px;">Daily Drip</h3>

  <p align="center">
    A REST API for Daily Drip Coffee Shop website. With Daily Drip Website, users can find promos and purchase their favorite meals and beverages.
    <br />
    <a href="https://github.com/ridhobeteer/daily-drip"><strong>Explore the docs »</strong></a>
    <!-- <a href="https://dailydrip.netlify.app/">View Demo</a> -->
    <!-- <a href="https://github.com/ridhobeteer/daily-drip/issues">Report Bug</a> -->
    <!-- <a href="https://github.com/ridhobeteer/daily-drip/issues">Request Feature</a> -->
  </p>
</div>

<br/>

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

Then,

```sh
$ npm run dev
```

Visit [http://localhost:SERVER_PORT/](http://localhost:SERVER_PORT/) on browser or [Postman](https://www.postman.com/)

## Dependencies

- [![cors](https://img.shields.io/badge/cors-v2.8.5-blue)](https://www.npmjs.com/package/cors)
- [![dotenv](https://img.shields.io/badge/dotenv-v16.0.3-blue)](https://www.npmjs.com/package/dotenv)
- [![express](https://img.shields.io/badge/express-v4.18.2-blue)](https://www.npmjs.com/package/express)
- [![morgan](https://img.shields.io/badge/morgan-v1.1.0-blue)](https://www.npmjs.com/package/morgan)
- [![pg](https://img.shields.io/badge/pg-v8.9.0-blue)](https://www.npmjs.com/package/pg)

## Development Dependencies

- [![eslint](https://img.shields.io/badge/nodemon-v8.35.0-blue)](https://www.npmjs.com/package/eslint)
- [![nodemon](https://img.shields.io/badge/nodemon-v2.0.20-brightgreen)](https://www.npmjs.com/package/nodemon)
