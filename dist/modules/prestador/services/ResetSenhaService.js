"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _IHashProvider = _interopRequireDefault(require("../../users/providers/HashProvider/models/IHashProvider"));

var _dateFns = require("date-fns");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _IPrestadorRepository = _interopRequireDefault(require("../repositories/IPrestadorRepository"));

var _tsyringe = require("tsyringe");

var _client = require("@prisma/client");

var _IPrestadorToken = _interopRequireDefault(require("../repositories/IPrestadorToken"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ResetSenhaService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("PrestadorRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("Prestadortoken")(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)("HashProvider")(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IPrestadorRepository.default === "undefined" ? Object : _IPrestadorRepository.default, typeof _IPrestadorToken.default === "undefined" ? Object : _IPrestadorToken.default, typeof _IHashProvider.default === "undefined" ? Object : _IHashProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class ResetSenhaService {
  constructor(prestadorRepository, tokenRepository, hashProvider) {
    this.prestadorRepository = prestadorRepository;
    this.tokenRepository = tokenRepository;
    this.hashProvider = hashProvider;
    this.prisma = new _client.PrismaClient();
  }

  async execute({
    token,
    senha
  }) {
    const providerToken = await this.tokenRepository.findByToken(token);

    if (!providerToken) {
      throw new _AppError.default("Token nao existe");
    }

    const prestador = await this.prestadorRepository.findById(providerToken.provider_id);

    if (!prestador) {
      throw new _AppError.default("usuario nao existe");
    }

    const createToken = providerToken.created_at;
    const conpareDate = (0, _dateFns.addHours)(createToken, 2);

    if ((0, _dateFns.isAfter)(Date.now(), conpareDate)) {
      throw new _AppError.default("Token expirado");
    }

    const hasg = await this.hashProvider.generateHah(senha);
    await this.prisma.prestador.update({
      where: {
        id: prestador.id
      },
      data: {
        senha: hasg
      }
    });
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
exports.default = ResetSenhaService;