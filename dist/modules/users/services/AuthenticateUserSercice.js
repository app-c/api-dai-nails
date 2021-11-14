"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _bcryptjs = require("bcryptjs");

var _tsyringe = require("tsyringe");

var _jsonwebtoken = require("jsonwebtoken");

var _auth = _interopRequireDefault(require("../../../config/auth"));

var _IUsersRepository = _interopRequireDefault(require("../repositories/IUsersRepository"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let AuthenticateUserService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("UserRepository")(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IUsersRepository.default === "undefined" ? Object : _IUsersRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class AuthenticateUserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({
    email,
    senha
  }) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new _AppError.default("email incorreto");
    }

    const compareSenhaa = await (0, _bcryptjs.compare)(senha, user.senha);

    if (!compareSenhaa) {
      throw new _AppError.default("senha incorreta");
    }

    const token = (0, _jsonwebtoken.sign)({}, _auth.default.jwt.secret, {
      subject: user.id,
      expiresIn: _auth.default.jwt.expiresIn
    });
    return {
      user,
      token
    };
  }

}) || _class) || _class) || _class) || _class);
exports.default = AuthenticateUserService;