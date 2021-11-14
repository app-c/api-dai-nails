"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.notifica = void 0;

var _midlewareAuth = _interopRequireDefault(require("../../../../shared/infra/http/midleWares/midlewareAuth"));

var _express = require("express");

var _NotificationController = require("../controller/NotificationController");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable import/prefer-default-export */
const notifica = (0, _express.Router)();
exports.notifica = notifica;
const notificaController = new _NotificationController.NotificationController();
notifica.get("/find", _midlewareAuth.default, notificaController.list);