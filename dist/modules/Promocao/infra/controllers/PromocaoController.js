"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PromocaoController = void 0;

var _tsyringe = require("tsyringe");

var _createPromocaoService = require("../../service/createPromocaoService");

var _listPromocaoService = require("../../service/listPromocaoService");

/* eslint-disable @typescript-eslint/no-non-null-assertion */

/* eslint-disable import/prefer-default-export */
class PromocaoController {
  async create(req, res) {
    const service = _tsyringe.container.resolve(_createPromocaoService.CreatePromocaoService);

    const {
      descricao
    } = req.body;
    const prestador_id = req.user.id;
    const image = req.file.filename;
    const po = await service.execute({
      descricao,
      image,
      prestador_id
    });
    return res.json(po);
  }

  async list(req, res) {
    const service = _tsyringe.container.resolve(_listPromocaoService.listPromocaoService);

    const {
      prestador_id
    } = req.query;
    const po = await service.execute({
      prestador_id: String(prestador_id)
    });
    return res.json(po);
  }

}

exports.PromocaoController = PromocaoController;