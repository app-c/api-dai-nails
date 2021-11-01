/* eslint-disable import/prefer-default-export */
import IPrestadorRepository from "@modules/prestador/repositories/IPrestadorRepository";
import { notification } from "@prisma/client";
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

import INotification from "../repositories/INotificationsReposiotry";

interface IRequest {
   provider_id: string;
}

@injectable()
export class NotificationService {
   constructor(
      @inject("PrestadorRepository")
      private prestadorRespository: IPrestadorRepository,

      @inject("NotificationRepository")
      private notificationRepository: INotification
   ) {}

   public async execute({ provider_id }: IRequest): Promise<notification[]> {
      const find = await this.prestadorRespository.findById(provider_id);

      if (!find) {
         throw new AppError("Erro: prestador nao encontrado");
      }

      const findNotifica = await this.notificationRepository.findByid(
         provider_id
      );

      if (!findNotifica) {
         throw new AppError("Notficação nao encontrada");
      }

      return findNotifica;
   }
}
