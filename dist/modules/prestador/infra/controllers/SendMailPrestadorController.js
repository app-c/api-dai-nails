"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _SendEmailPrestadorService = _interopRequireDefault(require("../../services/SendEmailPrestadorService"));

var _tsyringe = require("tsyringe");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ForgotPasswordController {
  async create(req, res) {
    const {
      email
    } = req.body;

    const sendForgotPasswordEmail = _tsyringe.container.resolve(_SendEmailPrestadorService.default);

    const user = await sendForgotPasswordEmail.execute({
      email
    });
    return res.json(user);
  }

}

exports.default = ForgotPasswordController;