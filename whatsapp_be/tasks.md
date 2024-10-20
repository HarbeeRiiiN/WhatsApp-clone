## Backend Settings

1. init project: `yarn init`
2. create dirs:
   ![1](./src/note_figs/1.png)

3. add scripts in the `package.json`

4. yarn add nodemon

   ```json
   "scripts": {
   	"start": "nodemon ./src/index.js"
    },
   ```



## express

`yarn add express`

```javascript
const express = require("express");
const app = express();
```

manage secured info: 

instead of using `const PORT = "xxx"`, use `.env`  

`yarn add dotenv`

```javascript
const dotenv = require("dotenv");

// dotEnv config
dotenv.config();

const PORT = process.env.PORT || 8081;
```



change the "type" to module, use `import` rather than `require`

in package.json:`"type": "module",`

index.js:

```javascript
import express from "express";
const app = express();

// dotenv config
import dotenv from "dotenv";
dotenv.config();

// create express app
const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
  console.log("serer is listening on ", PORT, "...");
});

export default app;

```



reorganize `app.js` and `index.js`

`app.js`:

```javascript
import express from "express";

// create app
const app = express();
export default app;

```

`index.js`:

```javascript
import app from "./app.js";
import dotenv from "dotenv";

// dotEnv config
dotenv.config();

// dot variables
const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
  console.log("serer is listening on ", PORT, "...");
});

```

note:

```javascript
console.log(`serer is listening at ${PORT}...`);
```



## middleware

+ Run scripts that set and use environment variables across platforms with cross-env.

  `yarn add cross-env`

  ```javascript
   "start": "node ./src/index.js",
   "dev": "cross-env NODE_ENV=development nodemon ./src/index.js"
  ```

  `yarn start` -> `yarn dev`

+ Adding `Morgan`  middleware as an HTTP request logger middleware for node js.

  ```shell
  ::1 - - [Sun, 20 Oct 2024 19:20:33 GMT] "POST / HTTP/1.1" 200 14 "-" "PostmanRuntime/7.42.0"
  ::1 - - [Sun, 20 Oct 2024 19:20:41 GMT] "GET / HTTP/1.1" 200 14 "-" "PostmanRuntime/7.42.0"
  
  ```

+ Add `Helmet` middleware, Helmet helps you secure your Express apps by setting various HTTP headers.

+ Adding Express json and urlencoded middleware to parse json request from body and url.

+ Adding `Express-mongo-sanitize` middleware which sanitizes user-supplied data to prevent MongoDB Operator Injection.

+ Adding `Cookie-parser` middleware to parse Cookie header and populate req.cookies with an object keyed by the cookie names.

+ Adding `Compression` middleware to compress response bodies for all request that traverse through the middleware.

+ Adding `Express-fileupload` middleware to make uploaded files accessible from req.files.

+ Adding `cors` middleware to protect and restrict access to the server.

  ```java
  app.use(
    cors({
      origin: "http://localhost:3000",
    })
  );
  ```



## Custom logger, handle Server and http errors

Adding a custom logger, Handling uncaughtException, unhandledRejection errors, SIGTERM, and handle http errors.

**Objectifs**

- Adding a custom logger to use instead of using the boring console.log to help us read the console better and separate errors from infos.
- Handle Server closing when facing uncaughtException, unhandledRejection errors.
- Close server gracefully on SIGTERM signal.
- Handle http errors and get proper error messages from server.

```javascript
import logger from "./configs/logger.config.js";

logger.info(`serer is listening at ${PORT}...`);

logger.info()
```



# Problems & Solutions

+ Run scripts that set and use environment variables across platforms with cross-env.

+ forgot to ignore node_modules & .env 

  1. update .gitignore

  2. git rm -r --cached 
  3. git add . / git commit again
  4. push

+ md中npm package + version

  ![npm version](https://img.shields.io/npm/v/express.svg)
