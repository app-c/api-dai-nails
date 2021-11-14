"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _midlewareAuth = _interopRequireDefault(require("../../../../../shared/infra/http/midleWares/midlewareAuth"));

var _express = require("express");

var _BloqueioConroller = _interopRequireDefault(require("../controllers/BloqueioConroller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const bloqueioRoutes = (0, _express.Router)();
const createServiceController = new _BloqueioConroller.default();
bloqueioRoutes.post("/service/bloqueio", _midlewareAuth.default, createServiceController.create);
var _default = bloqueioRoutes;
exports.default = _default;