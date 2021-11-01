import { PrismaClient, Services } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime";
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

import IServiceRepository from "../repositories/IServiceRepository";

interface IRequest {
   provider_id: string;
   id: string;
   service: string;
   description: string;
   time: string;
   value: string;
}
@injectable()
export default class UpdateServices {
   private prisma = new PrismaClient();

   constructor(
      @inject("ServiceRepository")
      private serviceRepository: IServiceRepository
   ) {}

   public async execute({
      id,
      service,
      description,
      time,
      value,
   }: IRequest): Promise<Services> {
      const ser = await this.serviceRepository.findById(id);

      if (!ser) {
         throw new AppError("Esse serviço nao existe");
      }

      ser.service = service;
      ser.time = time;
      ser.value = value;
      ser.description = description;

      await this.prisma.services.update({
         where: { id: ser.id },
         data: {
            service,
            time,
            value,
            description,
         },
      });

      return ser;
   }
}
