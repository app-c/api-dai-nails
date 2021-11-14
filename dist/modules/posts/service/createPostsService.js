"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreatePostsService = void 0;

var _IPrestadorRepository = _interopRequireDefault(require("../../prestador/repositories/IPrestadorRepository"));

var _IStorageProviders = _interopRequireDefault(require("../../../shared/container/providers/StorageProvider/models/IStorageProviders"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _tsyringe = require("tsyringe");

var _IPostRepository = require("../repositories/IPostRepository");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreatePostsService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("PrismaPosts")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("StorageProvider")(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)("PrestadorRepository")(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IPostRepository.IPostsRepository === "undefined" ? Object : _IPostRepository.IPostsRepository, typeof _IStorageProviders.default === "undefined" ? Object : _IStorageProviders.default, typeof _IPrestadorRepository.default === "undefined" ? Object : _IPrestadorRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class CreatePostsService {
  constructor(postRespository, storage, prestadorRespository) {
    this.postRespository = postRespository;
    this.storage = storage;
    this.prestadorRespository = prestadorRespository;
  }

  async execute({
    descricao,
    post,
    prestador_id
  }) {
    const user = await this.prestadorRespository.findById(prestador_id);

    if (!user) {
      throw new _AppError.default("prestador nao encontrado");
    }

    await this.storage.saveFile(post, "posts");
    const create = await this.postRespository.create({
      descricao,
      post,
      prestador_id
    });
    return create;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
exports.CreatePostsService = CreatePostsService;