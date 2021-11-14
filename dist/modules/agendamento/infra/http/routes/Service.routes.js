"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _midlewareAuth = _interopRequireDefault(require("../../../../../shared/infra/http/midleWares/midlewareAuth"));

var _express = require("express");

var _CreateServiçoController = _interopRequireDefault(require("../controllers/CreateServi\xE7oController"));

var _FindServiceController = _interopRequireDefault(require("../controllers/FindServiceController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const serviceRoute = (0, _express.Router)();
const createServiceController = new _CreateServiçoController.default();
const listController = new _FindServiceController.default(); // Create Serviço

serviceRoute.post("/", _midlewareAuth.default, createServiceController.create);
serviceRoute.patch("/service/update", _midlewareAuth.default, createServiceController.update);
serviceRoute.delete("/service/:id/delet", _midlewareAuth.default, createServiceController.delet);
serviceRoute.get("/:provider_id/list", _midlewareAuth.default, listController.create);
var _default = serviceRoute;
exports.default = _default;