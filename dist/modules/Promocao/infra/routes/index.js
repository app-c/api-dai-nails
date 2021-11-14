"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PromocaoRoute = void 0;

var _express = require("express");

var _promocao = require("./promocao");

/* eslint-disable import/prefer-default-export */
const PromocaoRoute = (0, _express.Router)();
exports.PromocaoRoute = PromocaoRoute;
PromocaoRoute.use("/promocao", _promocao.promocao);