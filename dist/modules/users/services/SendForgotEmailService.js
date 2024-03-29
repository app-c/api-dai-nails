"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _tsyringe = require("tsyringe");

var _IMailProvider = _interopRequireDefault(require("../../../shared/container/providers/MailProvider/models/IMailProvider"));

var _IUsersRepository = _interopRequireDefault(require("../repositories/IUsersRepository"));

var _IUserTokenRepository = _interopRequireDefault(require("../repositories/IUserTokenRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let SendForgotPasswordEmailService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("UserRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("MailProvider")(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)("UserToken")(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IUsersRepository.default === "undefined" ? Object : _IUsersRepository.default, typeof _IMailProvider.default === "undefined" ? Object : _IMailProvider.default, typeof _IUserTokenRepository.default === "undefined" ? Object : _IUserTokenRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class SendForgotPasswordEmailService {
  constructor(userRepository, mailProvider, userTokenRepository) {
    this.userRepository = userRepository;
    this.mailProvider = mailProvider;
    this.userTokenRepository = userTokenRepository;
  }

  async execute({
    email
  }) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new _AppError.default("Usuario nao existe");
    }

    const {
      token
    } = await this.userTokenRepository.generate(user.id);

    const forgotPassword = _path.default.resolve(__dirname, "..", "views", "forgot_password.hbs");

    await this.mailProvider.sendMail({
      to: {
        name: user.nome,
        email: user.email
      },
      subject: "[DaisyNails] Recuperaçao de senha",
      templateData: {
        file: forgotPassword,
        variables: {
          name: user.nome,
          token,
          link: `${process.env.APP_WEB_URL}/reset_password?token=${token}`
        }
      }
    });
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
var _default = SendForgotPasswordEmailService;
exports.default = _default;