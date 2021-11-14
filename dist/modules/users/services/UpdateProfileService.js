"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _client = require("@prisma/client");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _tsyringe = require("tsyringe");

var _IHashProvider = _interopRequireDefault(require("../providers/HashProvider/models/IHashProvider"));

var _IUsersRepository = _interopRequireDefault(require("../repositories/IUsersRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let UpdateProfileService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("UserRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("HashProvider")(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IUsersRepository.default === "undefined" ? Object : _IUsersRepository.default, typeof _IHashProvider.default === "undefined" ? Object : _IHashProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class UpdateProfileService {
  constructor(userRepository, hashProvider) {
    this.userRepository = userRepository;
    this.hashProvider = hashProvider;
    this.prisma = new _client.PrismaClient();
  }

  async execute({
    user_id,
    nome,
    email,
    telefone,
    senha,
    old_password
  }) {
    const user = await this.userRepository.findById(user_id);
    console.log(user);

    if (!user) {
      throw new _AppError.default("Usuario nao existe");
    }

    const userEmail = await this.userRepository.findByEmail(email);

    if (userEmail && userEmail.id !== user_id) {
      throw new _AppError.default("E-mail ja esta em uso");
    }

    user.nome = nome;
    user.email = email;
    user.telefone = telefone;

    if (senha && !old_password) {
      throw new _AppError.default("voce precisa informar sua senha antiga");
    }

    if (senha && old_password) {
      const checkOld = await this.hashProvider.compareHah(old_password, user.senha);

      if (!checkOld) {
        throw new _AppError.default("Senha antiga nao confere");
      }

      user.senha = await this.hashProvider.generateHah(senha);
    }

    await this.prisma.users.update({
      where: {
        id: user_id
      },
      data: {
        nome,
        email,
        telefone,
        senha
      }
    });
    return user;
  }

}) || _class) || _class) || _class) || _class) || _class);
var _default = UpdateProfileService;
exports.default = _default;