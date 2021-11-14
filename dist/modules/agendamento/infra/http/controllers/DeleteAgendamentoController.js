"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _DeletAgendamentoService = _interopRequireDefault(require("../../../services/DeletAgendamentoService"));

var _tsyringe = require("tsyringe");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DeleteAgendamentoContrller {
  async delet(re, res) {
    const geteAgendamento = _tsyringe.container.resolve(_DeletAgendamentoService.default);

    const {
      id
    } = re.params;
    re.io.emit("delet", id);
    await geteAgendamento.delete(id);
    return res.status(204).send();
  }

}

exports.default = DeleteAgendamentoContrller;