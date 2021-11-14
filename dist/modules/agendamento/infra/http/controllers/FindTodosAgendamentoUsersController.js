"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _FindTodosAgendamentosUserService = _interopRequireDefault(require("../../../services/FindTodosAgendamentosUserService"));

var _tsyringe = require("tsyringe");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FindTodosAgendamentosUserController {
  async list(req, res) {
    try {
      const agenda = _tsyringe.container.resolve(_FindTodosAgendamentosUserService.default);

      const user_id = req.user.id;
      const ag = await agenda.execute(user_id);
      return res.json(ag);
    } catch (err) {
      return res.json(err.message).status(200);
    }
  }

}

exports.default = FindTodosAgendamentosUserController;