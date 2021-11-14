"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _CreateUserService = _interopRequireDefault(require("../../../services/CreateUserService"));

var _FindUsuarioService = _interopRequireDefault(require("../../../services/FindUsuarioService"));

var _ShowProfleleService = _interopRequireDefault(require("../../../services/ShowProfleleService"));

var _tsyringe = require("tsyringe");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UserController {
  async create(req, res) {
    const {
      nome,
      email,
      telefone,
      senha
    } = req.body;

    const create = _tsyringe.container.resolve(_CreateUserService.default);

    const user = await create.execute({
      nome,
      email,
      telefone,
      senha
    });
    return res.json(user);
  }

  async listUser(req, res) {
    const {
      user_id
    } = req.params;

    const list = _tsyringe.container.resolve(_ShowProfleleService.default);

    const listUser = list.execute({
      user_id
    });
    return res.json(listUser);
  }

  async findUser(req, res) {
    try {
      const {
        provider_id
      } = req.params;
      const {
        nome
      } = req.query;

      const list = _tsyringe.container.resolve(_FindUsuarioService.default);

      const listUser = await list.execute({
        nome: String(nome),
        provider_id: String(provider_id)
      });
      return res.json(listUser);
    } catch (error) {
      return res.json(error).status(400);
    }
  }

}

exports.default = UserController;