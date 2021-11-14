"use strict";

var _tsyringe = require("tsyringe");

require("./providers");

require("../../modules/users/providers");

var _PrismaUsersRepository = _interopRequireDefault(require("../../modules/users/infra/Prisma/PrismaUsersRepository"));

var _PrestadorRepository = _interopRequireDefault(require("../../modules/prestador/infra/Prisma/PrestadorRepository"));

var _PrismaTokenRepository = _interopRequireDefault(require("../../modules/users/infra/Prisma/PrismaTokenRepository"));

var _AgendamentoRepository = _interopRequireDefault(require("../../modules/agendamento/infra/Prisma/AgendamentoRepository"));

var _ServiceRespository = _interopRequireDefault(require("../../modules/agendamento/infra/Prisma/ServiceRespository"));

var _BloqueioRepository = _interopRequireDefault(require("../../modules/agendamento/infra/Prisma/BloqueioRepository"));

var _NotificatonRepository = _interopRequireDefault(require("../../modules/notifications/infra/Prisma/NotificatonRepository"));

var _ReservarRepository = _interopRequireDefault(require("../../modules/prestador/infra/Prisma/ReservarRepository"));

var _PromocaoRepository = require("../../modules/Promocao/repositories/PromocaoRepository");

var _PosterRepository = require("../../modules/posts/repositories/PosterRepository");

var _S3Provider = _interopRequireDefault(require("./providers/StorageProvider/implementations/S3Provider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable import-helpers/order-imports */
_tsyringe.container.registerSingleton("StorageProvider", _S3Provider.default);

_tsyringe.container.registerSingleton("AgendamentoRepository", _AgendamentoRepository.default);

_tsyringe.container.registerSingleton("ServiceRepository", _ServiceRespository.default);

_tsyringe.container.registerSingleton("BloqueioRepostory", _BloqueioRepository.default);

_tsyringe.container.registerSingleton("UserRepository", _PrismaUsersRepository.default);

_tsyringe.container.registerSingleton("PrestadorRepository", _PrestadorRepository.default);

_tsyringe.container.registerSingleton("ReservaRepository", _ReservarRepository.default);

_tsyringe.container.registerSingleton("UserToken", _PrismaTokenRepository.default);

_tsyringe.container.registerSingleton("NotificationRepository", _NotificatonRepository.default);

_tsyringe.container.registerSingleton("PrismaPosts", _PosterRepository.PostRespository);

_tsyringe.container.registerSingleton("PrismaPromocao", _PromocaoRepository.PromocaoRespository);