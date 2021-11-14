"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ReservaDeHorariosService = _interopRequireDefault(require("../../services/ReservaDeHorariosService"));

var _tsyringe = require("tsyringe");

var _ListAllReservas = require("../../services/ListAllReservas");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ReservaController {
  async create(req, res) {
    const createService = _tsyringe.container.resolve(_ReservaDeHorariosService.default);

    const {
      from,
      at,
      dia,
      mes,
      ano,
      week
    } = req.body;
    const provider_id = req.user.id;
    const services = await createService.execute({
      provider_id,
      from,
      at,
      dia,
      mes,
      ano,
      week
    });
    return res.json(services);
  }

  async findAll(req, res) {
    const createService = _tsyringe.container.resolve(_ListAllReservas.ListAllReservas);

    const provider_id = req.user.id;
    const services = await createService.execute({
      id: provider_id
    });
    return res.json(services);
  }

}

exports.default = ReservaController;