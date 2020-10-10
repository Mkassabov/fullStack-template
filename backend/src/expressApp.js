const express = require("express");
const app = express();
const path = require("path");

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const responsesMiddleware = require("@/middlewares/responses");
app.use(responsesMiddleware);

const apiLogger = require("@/middlewares/apiLogger");
app.use(apiLogger);

const routes = require("@/app/routes");
app.use("/v1", routes);

app.get("/*", (req, res) => {
  let file;
  switch (req.url) {
    case "/global.css":
    case "/build/bundle.css":
    case "/build/bundle.css.map":
    case "/build/bundle.js":
    case "/build/bundle.js.map":
      file = req.url;
      break;

    default:
      file = "/index.html";
      break;
  }
  res.sendFile(path.resolve(`../frontend/public${file}`));
});

const errorHandler = require("@/middlewares/errorHandler");
app.use(errorHandler);

app.use(express.static("../node_modules"));

module.exports = app;
