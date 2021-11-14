"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ResetSenhaService = _interopRequireDefault(require("../../services/ResetSenhaService"));

var _tsyringe = require("tsyringe");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ResetPasswordController {
  async create(req, res) {
    try {
      const {
        token,
        senha
      } = req.body;

      const sendForgotPasswordEmail = _tsyringe.container.resolve(_ResetSenhaService.default);

      const user = await sendForgotPasswordEmail.execute({
        token,
        senha
      });
      return res.json(user);
    } catch (err) {
      return res.json(err);
    }
  }

}

exports.default = ResetPasswordController;