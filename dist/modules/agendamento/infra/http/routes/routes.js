"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _Agendamento = _interopRequireDefault(require("./Agendamento.routes"));

var _BloqueioRoutes = _interopRequireDefault(require("./BloqueioRoutes.routes"));

var _Service = _interopRequireDefault(require("./Service.routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const RouteAgendamento = (0, _express.Router)();
RouteAgendamento.use("/agendamento", _Agendamento.default);
RouteAgendamento.use("/service", _Service.default);
RouteAgendamento.use("/", _BloqueioRoutes.default);
var _default = RouteAgendamento;
exports.default = _default;