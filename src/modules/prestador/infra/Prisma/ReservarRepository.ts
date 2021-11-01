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
            mes: data.mes,
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
}
