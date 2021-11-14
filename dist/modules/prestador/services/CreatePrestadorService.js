"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _IPrestadorRepository = _interopRequireDefault(require("../repositories/IPrestadorRepository"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _bcryptjs = require("bcryptjs");

var _tsyringe = require("tsyringe");

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreatePrestadorService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("PrestadorRepository")(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IPrestadorRepository.default === "undefined" ? Object : _IPrestadorRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class CreatePrestadorService {
  constructor(prestadorRepository) {
    this.prestadorRepository = prestadorRepository;
  }

  async execute({
    nome,
    email,
    telefone,
    senha,
    work_init,
    work_and,
    funcao
  }) {
    const findPrestador = await this.prestadorRepository.findByMail(email);

    if (findPrestador) {
      throw new _AppError.default("prestador ja cadastrodo");
    }

    const senhaHash = await (0, _bcryptjs.hash)(senha, 8);
    const prestador = await this.prestadorRepository.create({
      nome,
      email,
      telefone,
      senha: senhaHash,
      work_init,
      work_and,
      funcao
    });
    return prestador;
  }

}) || _class) || _class) || _class) || _class);
var _default = CreatePrestadorService;
exports.default = _default;