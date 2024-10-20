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

## Add express

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

