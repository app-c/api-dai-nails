"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _prestador = _interopRequireDefault(require("./prestador.routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const RoutePrestador = (0, _express.Router)();
RoutePrestador.use("/prestador", _prestador.default);
var _default = RoutePrestador;
exports.default = _default;