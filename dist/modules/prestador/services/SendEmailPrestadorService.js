"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _IMailProvider = _interopRequireDefault(require("../../../shared/container/providers/MailProvider/models/IMailProvider"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _tsyringe = require("tsyringe");

var _IPrestadorRepository = _interopRequireDefault(require("../repositories/IPrestadorRepository"));

var _IPrestadorToken = _interopRequireDefault(require("../repositories/IPrestadorToken"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let SendEmailPrestadorService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("PrestadorRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("MailProvider")(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)("PrestadorToken")(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IPrestadorRepository.default === "undefined" ? Object : _IPrestadorRepository.default, typeof _IMailProvider.default === "undefined" ? Object : _IMailProvider.default, typeof _IPrestadorToken.default === "undefined" ? Object : _IPrestadorToken.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class SendEmailPrestadorService {
  constructor(prestadorRepository, mailProvider, prestadorToken) {
    this.prestadorRepository = prestadorRepository;
    this.mailProvider = mailProvider;
    this.prestadorToken = prestadorToken;
  }

  async execute({
    email
  }) {
    const provider = await this.prestadorRepository.findByMail(email);

    if (!provider) {
      throw new _AppError.default("Usuário nao existe");
    }

    const {
      token
    } = await this.prestadorToken.generate(provider.id);

    const forgotSenha = _path.default.resolve(__dirname, "..", "views", "forgot_password.hbs");

    await this.mailProvider.sendMail({
      to: {
        name: provider.nome,
        email: provider.email
      },
      subject: "[DaisyNails] Recuperaçao de senha",
      templateData: {
        file: forgotSenha,
        variables: {
          name: provider.nome,
          token,
          link: `${process.env.APP_WEB_URL}/reset_password?token=${token}`
        }
      }
    });
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
exports.default = SendEmailPrestadorService;