"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.routeNofica = void 0;

var _express = require("express");

var _notificaRoute = require("./routes/notificaRoute.routes");

/* eslint-disable import/prefer-default-export */
const routeNofica = (0, _express.Router)();
exports.routeNofica = routeNofica;
routeNofica.use("/notification", _notificaRoute.notifica);