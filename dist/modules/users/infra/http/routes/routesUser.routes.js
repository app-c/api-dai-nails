"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _upload = _interopRequireDefault(require("../../../../../config/upload"));

var _midlewareAuth = _interopRequireDefault(require("../../../../../shared/infra/http/midleWares/midlewareAuth"));

var _celebrate = require("celebrate");

var _express = require("express");

var _multer = _interopRequireDefault(require("multer"));

var _ForgotPasswordController = _interopRequireDefault(require("../controller/ForgotPasswordController"));

var _ResetPasswordController = _interopRequireDefault(require("../controller/ResetPasswordController"));

var _SessionController = _interopRequireDefault(require("../controller/SessionController"));

var _UpdateAvatarController = _interopRequireDefault(require("../controller/UpdateAvatarController"));

var _UpdateProfileContrller = _interopRequireDefault(require("../controller/UpdateProfileContrller"));

var _UserController = _interopRequireDefault(require("../controller/UserController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const UserRoute = (0, _express.Router)();
const userController = new _UserController.default();
const sessionController = new _SessionController.default();
const updateProfile = new _UpdateProfileContrller.default();
const updateAvatercontrller = new _UpdateAvatarController.default();
const resetPassword = new _ResetPasswordController.default();
const forgot = new _ForgotPasswordController.default();
const img = (0, _multer.default)(_upload.default.multer);
UserRoute.post("/user", (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    nome: _celebrate.Joi.string().required(),
    email: _celebrate.Joi.string().required(),
    telefone: _celebrate.Joi.string().required(),
    senha: _celebrate.Joi.string().required().min(6)
  }
}), userController.create);
UserRoute.get("/show", userController.listUser);
UserRoute.get("/find", userController.findUser);
UserRoute.post("/session", sessionController.create);
UserRoute.get("/profile", _midlewareAuth.default, updateProfile.show);
UserRoute.put("/profile", _midlewareAuth.default, updateProfile.update);
UserRoute.patch("/avatar", _midlewareAuth.default, img.single("avatar"), updateAvatercontrller.update);
UserRoute.post("/forgot", forgot.create);
UserRoute.post("/reset", resetPassword.create);
var _default = UserRoute;
exports.default = _default;