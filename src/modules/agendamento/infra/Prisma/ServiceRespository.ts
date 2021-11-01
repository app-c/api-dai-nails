import { PrismaClient, Services } from "@prisma/client";
import { IServiceDTO } from "@modules/agendamento/dtos/IServiceDTO";
import IServiceRepository from "@modules/agendamento/repositories/IServiceRepository";
import AppError from "@shared/errors/AppError";

export default class ServiceRepository implements IServiceRepository {
   private prisma = new PrismaClient();

   public async findUniqService(
      provider_id: string,
      service: string
   ): Promise<Services | null> {
      const find = await this.prisma.services.findFirst({
         where: {
            provider_id,
            service,
         },
      });

      return find;
   }

   public async findById(id: string): Promise<Services | null> {
      const find = await this.prisma.services.findFirst({
         where: { id },
      });

      return find;
   }

   public async listService(provider_id: string): Promise<Services[]> {
      const find = await this.prisma.services.findMany({
         where: { provider_id },
      });

      return find;
   }

   public async create(data: IServiceDTO): Promise<Services> {
      const servico = await this.prisma.services.create({
         data: {
            provider_id: data.provider_id,
            description: data.description,
            value: data.value,
            time: data.time,
            service: data.service,
         },
      });

      return servico;
   }

   public async delete(id: string): Promise<void> {
      await this.prisma.services.delete({ where: { id } });
   }
}
