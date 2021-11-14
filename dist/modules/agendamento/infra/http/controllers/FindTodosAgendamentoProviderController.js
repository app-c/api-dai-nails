"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _FindTodosAgendamentosPrestadorServicce = _interopRequireDefault(require("../../../services/FindTodosAgendamentosPrestadorServicce"));

var _classTransformer = require("class-transformer");

var _tsyringe = require("tsyringe");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FindTodosAgendamentosPrestadorController {
  async list(req, res) {
    const agenda = _tsyringe.container.resolve(_FindTodosAgendamentosPrestadorServicce.default);

    const provider_id = req.user.id;
    const ag = await agenda.execute(provider_id);
    await req.io.emit("ag", ag);
    return res.json((0, _classTransformer.classToClass)(ag));
  }

}

exports.default = FindTodosAgendamentosPrestadorController;