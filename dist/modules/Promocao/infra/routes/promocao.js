"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.promocao = void 0;

var _upload = _interopRequireDefault(require("../../../../config/upload"));

var _midlewareAuth = _interopRequireDefault(require("../../../../shared/infra/http/midleWares/midlewareAuth"));

var _express = require("express");

var _multer = _interopRequireDefault(require("multer"));

var _PromocaoController = require("../controllers/PromocaoController");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable import/prefer-default-export */
const controller = new _PromocaoController.PromocaoController();
const up = (0, _multer.default)(_upload.default.multer);
const promocao = (0, _express.Router)();
exports.promocao = promocao;
promocao.use(_midlewareAuth.default);
promocao.patch("/", up.single("image"), controller.create);
promocao.get("/list", controller.list);