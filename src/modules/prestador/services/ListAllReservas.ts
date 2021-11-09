/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Reservas } from "@prisma/client";
import { AppError } from "@shared/errors/AppError";
/* eslint-disable import/prefer-default-export */
import { getDate, getMonth } from "date-fns";
import { inject, injectable } from "tsyringe";

import IReservarRepository from "../repositories/IReservaRepository";

interface Props {
   id: string;
}
@injectable()
export class ListAllReservas {
   constructor(
      @inject("ReservaRepository")
      private reservasRepository: IReservarRepository
   ) {}

   async execute({ id }: Props): Promise<Reservas[]> {
      const find = await this.reservasRepository.findAll(id);

      const mes = getMonth(new Date()) + 1;
      console.log(mes);

      const lista = find.filter((h) => {
         if (h.mes >= mes) {
            return h;
         }
      });

      return lista;
   }
}
