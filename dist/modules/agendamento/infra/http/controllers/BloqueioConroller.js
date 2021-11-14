"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _CreateBloqueio = _interopRequireDefault(require("../../../services/CreateBloqueio"));

var _tsyringe = require("tsyringe");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Bloqueiocontroller {
  async create(req, res) {
    const createService = _tsyringe.container.resolve(_CreateBloqueio.default);

    const {
      from,
      at,
      dia,
      mes
    } = req.body;
    const provider_id = req.user.id;
    const services = await createService.execute(provider_id, from, at, dia, mes);
    return res.json(services);
  }

}

exports.default = Bloqueiocontroller;