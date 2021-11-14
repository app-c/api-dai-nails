"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _SessionController = _interopRequireDefault(require("../controller/SessionController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const session = (0, _express.Router)();
const sessionController = new _SessionController.default();
session.post("/session", sessionController.create);
var _default = session;
exports.default = _default;