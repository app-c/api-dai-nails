/* eslint-disable import/prefer-default-export */
import { PrismaClient, Promocao } from "@prisma/client";

import { IPromocaoDtos } from "../Dtos/IPromocaoDtos";
import { IPromocaoRepository } from "./IPromocaoRepository";

export class PromocaoRespository implements IPromocaoRepository {
   private prisma = new PrismaClient();

   async create(data: IPromocaoDtos): Promise<Promocao> {
      const crate = await this.prisma.promocao.create({
         data: {
            descricao: data.descricao,
            image: data.image,
            prestador_id: data.prestador_id,
         },
      });

      return crate;
   }

   async delete(id: string): Promise<void> {
      await this.prisma.promocao.delete({
         where: { id },
      });
   }

   async list(prestador_id: string): Promise<Promocao[]> {
      const post = await this.prisma.promocao.findMany({
         where: { prestador_id },
      });

      return post;
   }
}
