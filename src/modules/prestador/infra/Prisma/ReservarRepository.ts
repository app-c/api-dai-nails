import { PrismaClient } from "@prisma/client";
import IReservarRepository from "@modules/prestador/repositories/IReservaRepository";
import IReservaDTO from "@modules/prestador/dtos/IReservaDTO";

import { Reservas } from ".prisma/client";

export default class ReservasRepository implements IReservarRepository {
   private prisma = new PrismaClient();

   public async create(data: IReservaDTO): Promise<Reservas> {
      const res = await this.prisma.reservas.create({
         data: {
            provider_id: data.provider_id,
            from: data.from,
            at: data.at,
            dia: data.dia,
            mes: data.mes,
            ano: data.ano,
            week: data.week,
         },
      });

      return res;
   }

   public async findById(mes: number): Promise<Reservas[]> {
      const res = await this.prisma.reservas.findMany({
         where: { mes },
      });

      return res;
   }

   async findByWeekMonth(mes: number, week: string): Promise<Reservas | null> {
      const res = await this.prisma.reservas.findFirst({
         where: { mes, week },
      });
      return res;
   }

   async findAll(id: string): Promise<Reservas[]> {
      const find = await this.prisma.reservas.findMany({
         where: { provider_id: id },
      });

      return find;
   }
}
