"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _routesUser = _interopRequireDefault(require("./routesUser.routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Route = (0, _express.Router)();
Route.use("/user", _routesUser.default);
var _default = Route;
exports.default = _default;