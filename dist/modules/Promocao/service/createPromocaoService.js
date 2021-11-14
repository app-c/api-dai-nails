"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreatePromocaoService = void 0;

var _IPrestadorRepository = _interopRequireDefault(require("../../prestador/repositories/IPrestadorRepository"));

var _client = require("@prisma/client");

var _IStorageProviders = _interopRequireDefault(require("../../../shared/container/providers/StorageProvider/models/IStorageProviders"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _tsyringe = require("tsyringe");

var _IPromocaoRepository = require("../repositories/IPromocaoRepository");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreatePromocaoService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("PrismaPromocao")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("StorageProvider")(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)("PrestadorRepository")(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IPromocaoRepository.IPromocaoRepository === "undefined" ? Object : _IPromocaoRepository.IPromocaoRepository, typeof _IStorageProviders.default === "undefined" ? Object : _IStorageProviders.default, typeof _IPrestadorRepository.default === "undefined" ? Object : _IPrestadorRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class CreatePromocaoService {
  constructor(promocaoRespository, storage, prestadorRespository) {
    this.promocaoRespository = promocaoRespository;
    this.storage = storage;
    this.prestadorRespository = prestadorRespository;
    this.prisma = new _client.PrismaClient();
  }

  async execute({
    descricao,
    image,
    prestador_id
  }) {
    const user = await this.prestadorRespository.findById(prestador_id);
    const promo = await this.promocaoRespository.list(prestador_id);

    if (!user) {
      throw new _AppError.default("prestador nao encontrado");
    }

    console.log(promo);

    if (promo[0]) {
      await this.prisma.promocao.delete({
        where: {
          id: promo[0].id
        }
      });
    }

    await this.storage.saveFile(image, "promocao");
    const create = await this.promocaoRespository.create({
      descricao,
      image,
      prestador_id
    });
    return create;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
exports.CreatePromocaoService = CreatePromocaoService;