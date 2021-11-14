"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ListHorariosDisponivelService = _interopRequireDefault(require("../../../services/ListHorariosDisponivelService"));

var _classTransformer = require("class-transformer");

var _tsyringe = require("tsyringe");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ListHorariosDisponivelController {
  async list(req, res) {
    try {
      const listHorarios = _tsyringe.container.resolve(_ListHorariosDisponivelService.default);

      const {
        dia,
        mes,
        ano,
        service,
        provider_id
      } = req.query;
      const list = await listHorarios.exec({
        provider_id: String(provider_id),
        service: String(service),
        dia: Number(dia),
        mes: Number(mes),
        ano: Number(ano)
      });
      return res.json((0, _classTransformer.classToClass)(list));
    } catch (err) {
      return res.json(err.message).status(400);
    }
  }

}

exports.default = ListHorariosDisponivelController;