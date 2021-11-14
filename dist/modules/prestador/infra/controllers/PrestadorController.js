"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _CreatePrestadorService = _interopRequireDefault(require("../../services/CreatePrestadorService"));

var _CreateTokenService = _interopRequireDefault(require("../../services/CreateTokenService"));

var _ShowProfileService = _interopRequireDefault(require("../../services/ShowProfileService"));

var _UpdateProfilePrestadorService = _interopRequireDefault(require("../../services/UpdateProfilePrestadorService"));

var _tsyringe = require("tsyringe");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PrestadorController {
  async create(req, res) {
    const {
      nome,
      email,
      telefone,
      senha,
      work_init,
      work_and,
      funcao
    } = req.body;

    const create = _tsyringe.container.resolve(_CreatePrestadorService.default);

    const prestador = await create.execute({
      nome,
      email,
      telefone,
      senha,
      work_init,
      work_and,
      funcao
    });
    return res.json(prestador);
  }

  async update(req, res) {
    const {
      nome,
      email,
      telefone,
      senha,
      work_init,
      work_and,
      funcao,
      old_senha
    } = req.body;
    const prestador_id = req.user.id;

    const create = _tsyringe.container.resolve(_UpdateProfilePrestadorService.default);

    const prestador = await create.execute({
      prestador_id,
      nome,
      email,
      telefone,
      senha,
      work_init,
      work_and,
      funcao,
      old_senha
    });
    return res.status(200).json(prestador);
  }

  async updateToken(req, res) {
    const {
      token
    } = req.body;
    const provider_id = req.user.id;

    const create = _tsyringe.container.resolve(_CreateTokenService.default);

    const prestador = await create.execute({
      provider_id,
      token
    });
    return res.status(200).json(prestador);
  }

  async show(req, res) {
    const {
      provider_id
    } = req.query;

    const create = _tsyringe.container.resolve(_ShowProfileService.default);

    const prestador = await create.execute({
      provider_id: String(provider_id)
    });
    return res.json(prestador);
  }

}

exports.default = PrestadorController;