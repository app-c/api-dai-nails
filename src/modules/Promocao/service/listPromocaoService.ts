import { Promocao } from "@prisma/client";
import AppError from "@shared/errors/AppError";
/* eslint-disable import/prefer-default-export */
import { inject, injectable } from "tsyringe";

import { IPromocaoRepository } from "../repositories/IPromocaoRepository";

interface IProps {
   prestador_id: string;
}
@injectable()
export class listPromocaoService {
   constructor(
      @inject("PrismaPromocao")
      private postRespository: IPromocaoRepository
   ) {}

   async execute({ prestador_id }: IProps): Promise<Promocao[]> {
      const promocao = await this.postRespository.list(prestador_id);

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
