/* eslint-disable import-helpers/order-imports */
import { IAgendamentoRepository } from "@modules/agendamento/repositories/IAgendamentoRespository";
import IServiceRepository from "@modules/agendamento/repositories/IServiceRepository";
import IPrestadorRepository from "@modules/prestador/repositories/IPrestadorRepository";
import IReservarRepository from "@modules/prestador/repositories/IReservaRepository";
import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import { container } from "tsyringe";
import "./providers";
import "@modules/users/providers";
import INotification from "@modules/notifications/repositories/INotificationsReposiotry";
import IUserTokenRepository from "@modules/users/repositories/IUserTokenRepository";
import IBloqueioRepository from "@modules/agendamento/repositories/IBloqueioRepository";
import PrismaUsersRepository from "@modules/users/infra/Prisma/PrismaUsersRepository";
import PrestadorRepository from "@modules/prestador/infra/Prisma/PrestadorRepository";
import PrismaTokenRepository from "@modules/users/infra/Prisma/PrismaTokenRepository";
import AgendamentoRepository from "@modules/agendamento/infra/Prisma/AgendamentoRepository";
import ServiceRepository from "@modules/agendamento/infra/Prisma/ServiceRespository";
import BloqueioRepository from "@modules/agendamento/infra/Prisma/BloqueioRepository";
import NotificationsRepository from "@modules/notifications/infra/Prisma/NotificatonRepository";
import ReservasRepository from "@modules/prestador/infra/Prisma/ReservarRepository";
import { IPromocaoRepository } from "@modules/Promocao/repositories/IPromocaoRepository";
import { PromocaoRespository } from "@modules/Promocao/repositories/PromocaoRepository";
import { IPostsRepository } from "../../modules/posts/repositories/IPostRepository";
import { PostRespository } from "../../modules/posts/repositories/PosterRepository";
import { S3Storage } from "./providers/StorageProvider/implementations/S3Provider";

import IStorageProvider from "./providers/StorageProvider/models/IStorageProviders";

container.registerSingleton<IStorageProvider>("StorageProvider", S3Storage);

container.registerSingleton<IAgendamentoRepository>(
   "AgendamentoRepository",
   AgendamentoRepository
);

container.registerSingleton<IServiceRepository>(
   "ServiceRepository",
   ServiceRepository
);

container.registerSingleton<IBloqueioRepository>(
   "BloqueioRepostory",
   BloqueioRepository
);

container.registerSingleton<IUsersRepository>(
   "UserRepository",
   PrismaUsersRepository
);

container.registerSingleton<IPrestadorRepository>(
   "PrestadorRepository",
   PrestadorRepository
);

container.registerSingleton<IReservarRepository>(
   "ReservaRepository",
   ReservasRepository
);

container.registerSingleton<IUserTokenRepository>(
   "UserToken",
   PrismaTokenRepository
);

container.registerSingleton<INotification>(
   "NotificationRepository",
   NotificationsRepository
);

container.registerSingleton<IPostsRepository>("PrismaPosts", PostRespository);
container.registerSingleton<IPromocaoRepository>(
   "PrismaPromocao",
   PromocaoRespository
);
