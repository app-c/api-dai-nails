"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListAllReservas = void 0;

var _dateFns = require("date-fns");

var _tsyringe = require("tsyringe");

var _IReservaRepository = _interopRequireDefault(require("../repositories/IReservaRepository"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ListAllReservas = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("ReservaRepository")(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IReservaRepository.default === "undefined" ? Object : _IReservaRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class ListAllReservas {
  constructor(reservasRepository) {
    this.reservasRepository = reservasRepository;
  }

  async execute({
    id
  }) {
    const find = await this.reservasRepository.findAll(id);
    const mes = (0, _dateFns.getMonth)(new Date()) + 1;
    console.log(mes);
    const lista = find.filter(h => {
      if (h.mes >= mes) {
        return h;
      }
    });
    return lista;
  }

}) || _class) || _class) || _class) || _class);
exports.ListAllReservas = ListAllReservas;