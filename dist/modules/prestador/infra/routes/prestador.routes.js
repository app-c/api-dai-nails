"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _upload = _interopRequireDefault(require("../../../../config/upload"));

var _midlewareAuth = _interopRequireDefault(require("../../../../shared/infra/http/midleWares/midlewareAuth"));

var _celebrate = require("celebrate");

var _express = require("express");

var _multer = _interopRequireDefault(require("multer"));

var _PrestadorController = _interopRequireDefault(require("../controllers/PrestadorController"));

var _ReservaController = _interopRequireDefault(require("../controllers/ReservaController"));

var _SendMailPrestadorController = _interopRequireDefault(require("../controllers/SendMailPrestadorController"));

var _SessionPrestadorController = _interopRequireDefault(require("../controllers/SessionPrestadorController"));

var _UpateAvatarController = _interopRequireDefault(require("../controllers/UpateAvatarController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const prestadorRoute = (0, _express.Router)();
const img = (0, _multer.default)(_upload.default.multer);
const prestadorControler = new _PrestadorController.default();
const sessionController = new _SessionPrestadorController.default();
const forgotController = new _SendMailPrestadorController.default();
const avatarController = new _UpateAvatarController.default();
const reservaController = new _ReservaController.default(); //* */ Show profile *//

prestadorRoute.get("/profile", _midlewareAuth.default, prestadorControler.show); //* */ Create *//

prestadorRoute.post("/", (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    nome: _celebrate.Joi.string().required(),
    email: _celebrate.Joi.string().required(),
    telefone: _celebrate.Joi.string().required(),
    senha: _celebrate.Joi.string().required(),
    work_init: _celebrate.Joi.string().required(),
    work_and: _celebrate.Joi.string().required(),
    funcao: _celebrate.Joi.string().required().min(6)
  }
}), prestadorControler.create);
prestadorRoute.post("/reserva", _midlewareAuth.default, reservaController.create);
prestadorRoute.get("/reserva/find", _midlewareAuth.default, reservaController.findAll);
prestadorRoute.post("/session", sessionController.create);
prestadorRoute.post("/forgot", forgotController.create);
prestadorRoute.put("/update", _midlewareAuth.default, prestadorControler.update);
prestadorRoute.put("/updateToken", _midlewareAuth.default, prestadorControler.updateToken);
prestadorRoute.patch("/avatar", _midlewareAuth.default, img.single("avatar"), avatarController.update);
var _default = prestadorRoute;
exports.default = _default;