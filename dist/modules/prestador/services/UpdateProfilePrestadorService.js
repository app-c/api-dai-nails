"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _client = require("@prisma/client");

var _tsyringe = require("tsyringe");

var _IHashProvider = _interopRequireDefault(require("../../users/providers/HashProvider/models/IHashProvider"));

var _IPrestadorRepository = _interopRequireDefault(require("../repositories/IPrestadorRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let UpdatePretadorService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("PrestadorRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("HashProvider")(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IPrestadorRepository.default === "undefined" ? Object : _IPrestadorRepository.default, typeof _IHashProvider.default === "undefined" ? Object : _IHashProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class UpdatePretadorService {
  constructor(prestadorRepository, hashProvider) {
    this.prestadorRepository = prestadorRepository;
    this.hashProvider = hashProvider;
    this.prisma = new _client.PrismaClient();
  }

  async execute({
    prestador_id,
    nome,
    email,
    telefone,
    senha,
    work_init,
    work_and,
    funcao,
    old_senha
  }) {
    const prestador = await this.prestadorRepository.findById(prestador_id);

    if (!prestador) {
      throw new _AppError.default("prestador nao encontrado");
    }

    const prestadorMail = await this.prestadorRepository.findByMail(email);

    if (prestadorMail && prestadorMail.id !== prestador.id) {
      throw new _AppError.default("email ja cadastrado");
    }

    prestador.nome = nome;
    prestador.email = email;
    prestador.telefone = telefone;
    prestador.funcao = funcao;
    prestador.work_init = work_init;
    prestador.work_and = work_and;

    if (senha && !old_senha) {
      throw new _AppError.default("você precisa informar a senha antiga");
    }

    if (senha && old_senha) {
      const checkOld = await this.hashProvider.compareHah(old_senha, prestador.senha);

      if (!checkOld) {
        throw new _AppError.default("Senha antiga nao confere");
      }

      prestador.senha = await this.hashProvider.generateHah(senha);
    }

    await this.prisma.prestador.update({
      where: {
        id: prestador.id
      },
      data: {
        nome,
        email,
        telefone,
        funcao,
        work_init,
        work_and
      }
    });
    return prestador;
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.default = UpdatePretadorService;