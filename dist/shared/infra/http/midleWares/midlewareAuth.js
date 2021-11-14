"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = midlewareAuth;

var _auth = _interopRequireDefault(require("../../../../config/auth"));

var _AppError = _interopRequireDefault(require("../../../errors/AppError"));

var _jsonwebtoken = require("jsonwebtoken");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function midlewareAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new _AppError.default("falta o token");
  }

  const [, token] = authHeader.split(" ");

  try {
    const decode = (0, _jsonwebtoken.verify)(token, _auth.default.jwt.secret);
    const {
      sub
    } = decode;
    req.user = {
      id: sub
    };
    return next();
  } catch (err) {
    throw new _AppError.default("token expirou");
  }
}