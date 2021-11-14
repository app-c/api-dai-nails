"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PostRoute = void 0;

var _express = require("express");

var _post = require("./post");

/* eslint-disable import/prefer-default-export */
const PostRoute = (0, _express.Router)();
exports.PostRoute = PostRoute;
PostRoute.use("/post", _post.post);