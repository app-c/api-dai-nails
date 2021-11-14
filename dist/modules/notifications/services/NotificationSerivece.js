"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NotificationService = void 0;

var _IPrestadorRepository = _interopRequireDefault(require("../../prestador/repositories/IPrestadorRepository"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _tsyringe = require("tsyringe");

var _INotificationsReposiotry = _interopRequireDefault(require("../repositories/INotificationsReposiotry"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let NotificationService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("PrestadorRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("NotificationRepository")(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IPrestadorRepository.default === "undefined" ? Object : _IPrestadorRepository.default, typeof _INotificationsReposiotry.default === "undefined" ? Object : _INotificationsReposiotry.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class NotificationService {
  constructor(prestadorRespository, notificationRepository) {
    this.prestadorRespository = prestadorRespository;
    this.notificationRepository = notificationRepository;
  }

  async execute({
    provider_id
  }) {
    const find = await this.prestadorRespository.findById(provider_id);

    if (!find) {
      throw new _AppError.default("Erro: prestador nao encontrado");
    }

    const findNotifica = await this.notificationRepository.findByid(provider_id);

    if (!findNotifica) {
      throw new _AppError.default("Notficação nao encontrada");
    }

    return findNotifica;
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.NotificationService = NotificationService;