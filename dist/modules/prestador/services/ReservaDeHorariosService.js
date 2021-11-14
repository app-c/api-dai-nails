"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _IPrestadorRepository = _interopRequireDefault(require("../repositories/IPrestadorRepository"));

var _IReservaRepository = _interopRequireDefault(require("../repositories/IReservaRepository"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _tsyringe = require("tsyringe");

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ReservaDeHorariosService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("PrestadorRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("ReservaRepository")(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IPrestadorRepository.default === "undefined" ? Object : _IPrestadorRepository.default, typeof _IReservaRepository.default === "undefined" ? Object : _IReservaRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class ReservaDeHorariosService {
  constructor(prestadorRepository, reservaRepository) {
    this.prestadorRepository = prestadorRepository;
    this.reservaRepository = reservaRepository;
  }

  async execute({
    provider_id,
    from,
    at,
    dia,
    mes,
    ano,
    week
  }) {
    const findPrestador = await this.prestadorRepository.findById(provider_id);

    if (!findPrestador) {
      throw new _AppError.default("prestador nao encontrado");
    }

    const res = await this.reservaRepository.create({
      provider_id: findPrestador.id,
      from,
      at,
      dia,
      mes,
      ano,
      week
    });
    return res;
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.default = ReservaDeHorariosService;