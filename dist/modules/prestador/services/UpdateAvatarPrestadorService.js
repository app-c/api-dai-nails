"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _client = require("@prisma/client");

var _IStorageProviders = _interopRequireDefault(require("../../../shared/container/providers/StorageProvider/models/IStorageProviders"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _tsyringe = require("tsyringe");

var _IPrestadorRepository = _interopRequireDefault(require("../repositories/IPrestadorRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let UpdateAvatarPrestadorService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("PrestadorRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("StorageProvider")(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IPrestadorRepository.default === "undefined" ? Object : _IPrestadorRepository.default, typeof _IStorageProviders.default === "undefined" ? Object : _IStorageProviders.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class UpdateAvatarPrestadorService {
  constructor(prestadorRepository, storageProvider) {
    this.prestadorRepository = prestadorRepository;
    this.storageProvider = storageProvider;
    this.prisma = new _client.PrismaClient();
  }

  async execute({
    provider_id,
    avatarName
  }) {
    const prestador = await this.prestadorRepository.findById(provider_id);
    console.log(prestador);

    if (!prestador) {
      throw new _AppError.default("Usuário nãos encontrado");
    } // if (prestador.avatar) {
    //    await this.storageProvider.deleteFile(prestador.avatar, "avatar");
    // }


    const fileName = await this.storageProvider.saveFile(avatarName, "avatar");
    prestador.avatar = fileName;
    await this.prisma.prestador.update({
      where: {
        id: provider_id
      },
      data: {
        avatar: fileName
      }
    });
    return prestador;
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.default = UpdateAvatarPrestadorService;