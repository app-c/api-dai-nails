"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listPromocaoService = void 0;

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _tsyringe = require("tsyringe");

var _IPromocaoRepository = require("../repositories/IPromocaoRepository");

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let listPromocaoService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("PrismaPromocao")(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IPromocaoRepository.IPromocaoRepository === "undefined" ? Object : _IPromocaoRepository.IPromocaoRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class listPromocaoService {
  constructor(postRespository) {
    this.postRespository = postRespository;
  }

  async execute({
    prestador_id
  }) {
    const promocao = await this.postRespository.list(prestador_id);

    if (!promocao) {
      throw new _AppError.default("sem promocao");
    }

    const res = promocao.map(h => {
      return {
        id: h.id,
        descricao: h.descricao,
        prestador_id: h.prestador_id,
        image: `${process.env.AWS_URL}promocao/${h.image}`
      };
    });
    return res;
  }

}) || _class) || _class) || _class) || _class);
exports.listPromocaoService = listPromocaoService;