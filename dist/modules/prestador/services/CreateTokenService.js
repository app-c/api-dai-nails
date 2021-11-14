"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _IPrestadorRepository = _interopRequireDefault(require("../repositories/IPrestadorRepository"));

var _client = require("@prisma/client");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _tsyringe = require("tsyringe");

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreateTokenService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("PrestadorRepository")(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IPrestadorRepository.default === "undefined" ? Object : _IPrestadorRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class CreateTokenService {
  constructor(prestadorRepository) {
    this.prestadorRepository = prestadorRepository;
    this.prisma = new _client.PrismaClient();
  }

  async execute({
    token,
    provider_id
  }) {
    const findPrestador = await this.prestadorRepository.findById(provider_id);

    if (!findPrestador) {
      throw new _AppError.default("prestador nao encontrado");
    }

    findPrestador.token = token;
    const update = await this.prisma.prestador.update({
      where: {
        id: provider_id
      },
      data: {
        token
      }
    });
    return update;
  }

}) || _class) || _class) || _class) || _class);
var _default = CreateTokenService;
exports.default = _default;