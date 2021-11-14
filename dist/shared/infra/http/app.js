"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.clients = void 0;

require("reflect-metadata");

require("express-async-errors");

require("../../container");

var _upload = _interopRequireDefault(require("../../../config/upload"));

var _AppError = _interopRequireDefault(require("../../errors/AppError"));

var _celebrate = require("celebrate");

var _cors = _interopRequireDefault(require("cors"));

var _express = _interopRequireDefault(require("express"));

var _http = _interopRequireDefault(require("http"));

var _socket = _interopRequireDefault(require("socket.io"));

var _rateLimit = _interopRequireDefault(require("./midleWares/rateLimit"));

var _routes = _interopRequireDefault(require("./routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable import/no-unresolved */

/* eslint-disable @typescript-eslint/no-var-requires */
// import "@shared/infra/typeorm";
const app = (0, _express.default)();

const server = _http.default.createServer(app);

const io = (0, _socket.default)(server);
const clients = [];
exports.clients = clients;
io.on("connection", client => {
  console.log(`conectado ${client.id}`);
});
app.use((req, res, nex) => {
  req.io = io;
  nex();
});
app.use(_rateLimit.default);
app.use((0, _cors.default)());
app.use(_express.default.json());
app.use("/file", _express.default.static(_upload.default.UploadFolder));
app.use(_routes.default);
app.use((0, _celebrate.errors)());
app.use((err, request, response, _) => {
  if (err instanceof _AppError.default) {
    return response.status(err.statusCode).json({
      status: "error",
      message: err.message
    });
  }

  console.log(err);
  return response.status(500).json({
    status: "error",
    message: "Interal server error"
  });
});
server.listen(3333, () => console.log("Server is Ok"));
var _default = app;
exports.default = _default;