"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _client = require("@prisma/client");

var _IStorageProviders = _interopRequireDefault(require("../../../shared/container/providers/StorageProvider/models/IStorageProviders"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _tsyringe = require("tsyringe");

var _IUsersRepository = _interopRequireDefault(require("../repositories/IUsersRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let UpdateUserAvatarService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("UserRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("StorageProvider")(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IUsersRepository.default === "undefined" ? Object : _IUsersRepository.default, typeof _IStorageProviders.default === "undefined" ? Object : _IStorageProviders.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class UpdateUserAvatarService {
  constructor(userRepository, storageProvider) {
    this.userRepository = userRepository;
    this.storageProvider = storageProvider;
    this.prisma = new _client.PrismaClient();
  }

  async execute({
    user_id,
    avatarFilename
  }) {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new _AppError.default("usuario naos encontrado");
    } // if (user.avatar) {
    //    await this.storageProvider.deleteFile(user.avatar, "avatar");
    // }


    const filename = await this.storageProvider.saveFile(avatarFilename, "avatar");
    user.avatar = filename;
    await this.prisma.users.update({
      where: {
        id: user_id
      },
      data: {
        avatar: filename
      }
    });
    return user;
  }

}) || _class) || _class) || _class) || _class) || _class);
var _default = UpdateUserAvatarService;
exports.default = _default;