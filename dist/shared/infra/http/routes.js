"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _routes = _interopRequireDefault(require("../../../modules/agendamento/infra/http/routes/routes"));

var _index = require("../../../modules/notifications/infra/index.routes");

var _routes2 = require("../../../modules/posts/infra/routes");

var _index2 = _interopRequireDefault(require("../../../modules/prestador/infra/routes/index.routes"));

var _routes3 = require("../../../modules/Promocao/infra/routes");

var _routesUser = _interopRequireDefault(require("../../../modules/users/infra/http/routes/routesUser.routes"));

var _express = require("express");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Route = (0, _express.Router)();
Route.use(_routes.default);
Route.use(_routesUser.default);
Route.use(_index2.default);
Route.use(_index.routeNofica);
Route.use(_routes2.PostRoute);
Route.use(_routes3.PromocaoRoute);
var _default = Route;
exports.default = _default;