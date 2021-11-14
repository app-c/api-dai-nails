"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AuthenticatePrestadorService = _interopRequireDefault(require("../../services/AuthenticatePrestadorService"));

var _tsyringe = require("tsyringe");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SessionController {
  async create(req, res) {
    const {
      email,
      senha
    } = req.body;

    const auth = _tsyringe.container.resolve(_AuthenticatePrestadorService.default);

    const {
      prestador,
      token
    } = await auth.execute({
      email,
      senha
    });
    return res.json({
      prestador,
      token
    });
  }

}

exports.default = SessionController;