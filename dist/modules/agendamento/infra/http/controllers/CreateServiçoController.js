"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _CreateSerivçoSerice = _interopRequireDefault(require("../../../services/CreateSeriv\xE7oSerice"));

var _UpdateService = _interopRequireDefault(require("../../../services/UpdateService"));

var _DeleteServicoService = _interopRequireDefault(require("../../../../prestador/services/DeleteServicoService"));

var _tsyringe = require("tsyringe");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CreateServiçoController {
  async create(req, res) {
    try {
      const createService = _tsyringe.container.resolve(_CreateSerivçoSerice.default);

      const {
        service,
        description,
        time,
        value
      } = req.body;
      const provider_id = req.user.id;
      const services = await createService.execute({
        provider_id,
        service,
        description,
        time,
        value
      });
      return res.json(services);
    } catch (error) {
      return res.json(error).status(400);
    }
  }

  async update(req, res) {
    const updateService = _tsyringe.container.resolve(_UpdateService.default);

    const {
      id,
      service,
      description,
      time,
      value
    } = req.body;
    const provider_id = req.user.id;
    const services = await updateService.execute({
      id,
      provider_id,
      service,
      description,
      time,
      value
    });
    return res.json(services);
  }

  async delet(re, res) {
    try {
      const geteAgendamento = _tsyringe.container.resolve(_DeleteServicoService.default);

      const {
        id
      } = re.params;
      await geteAgendamento.delete(id);
      return res.status(204).send();
    } catch (error) {
      return res.json(error).status(400);
    }
  }

}

exports.default = CreateServiçoController;