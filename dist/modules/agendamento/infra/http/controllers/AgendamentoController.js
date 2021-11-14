"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _CreateAgendamentoService = _interopRequireDefault(require("../../../services/CreateAgendamentoService"));

var _tsyringe = require("tsyringe");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AgendamentoController {
  async create(req, res) {
    const {
      provider_id,
      from,
      service,
      dia,
      mes,
      ano
    } = req.body;
    const user_id = req.user.id;

    const createAgendamento = _tsyringe.container.resolve(_CreateAgendamentoService.default);

    const agendamento = await createAgendamento.execute({
      provider_id,
      user_id,
      from,
      at: from,
      dia,
      mes,
      ano,
      service
    });
    await req.io.emit("hora", agendamento);
    return res.json(agendamento);
  }

}

exports.default = AgendamentoController;