import { Promocao } from "@prisma/client";
import AppError from "@shared/errors/AppError";
/* eslint-disable import/prefer-default-export */
import { inject, injectable } from "tsyringe";

import { IPromocaoRepository } from "../repositories/IPromocaoRepository";

@injectable()
export class listPromocaoService {
   constructor(
      @inject("PrismaPromocao")
      private postRespository: IPromocaoRepository
   ) {}

   async execute(): Promise<Promocao[]> {
      const promocao = await this.postRespository.list();

      if (!promocao) {
         throw new AppError("sem promocao");
      }

      const res = promocao.map((h) => {
         return {
            id: h.id,
            descricao: h.descricao,
            prestador_id: h.prestador_id,
            image: `${process.env.AWS_URL}promocao/${h.image}`,
         };
      });

      return res;
   }
}
