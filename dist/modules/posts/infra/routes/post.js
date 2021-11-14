"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.post = void 0;

var _upload = _interopRequireDefault(require("../../../../config/upload"));

var _midlewareAuth = _interopRequireDefault(require("../../../../shared/infra/http/midleWares/midlewareAuth"));

var _express = require("express");

var _multer = _interopRequireDefault(require("multer"));

var _PostController = require("../controllers/PostController");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable import/prefer-default-export */
const controller = new _PostController.PostController();
const up = (0, _multer.default)(_upload.default.multer);
const post = (0, _express.Router)();
exports.post = post;
post.use(_midlewareAuth.default);
post.patch("/", up.single("post"), controller.create);
post.get("/list", controller.list);
post.get("/list/prestador", controller.listPresetadorPost);