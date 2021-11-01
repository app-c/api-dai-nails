/* eslint-disable block-scoped-var */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
import AppError from "@shared/errors/AppError";
import IReservarRepository from "@modules/prestador/repositories/IReservaRepository";
import IPrestadorRepository from "@modules/prestador/repositories/IPrestadorRepository";
import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import { Reservas } from "@prisma/client";
import { inject, injectable } from "tsyringe";

interface IRequest {
   provider_id: string;
   from: string;
   at: string;
   mes: number;
}

@injectable()
export default class ReservaDeHorariosService {
   constructor(
      @inject("PrestadorRepository")
      private prestadorRepository: IPrestadorRepository,

      @inject("ReservaRepository")
      private reservaRepository: IReservarRepository
   ) {}

   public async execute({
      provider_id,
      from,
      at,
      mes,
   }: IRequest): Promise<Reservas> {
      const findPrestador = await this.prestadorRepository.findById(
         provider_id
      );

      if (!findPrestador) {
         throw new AppError("prestador nao encontrado");
      }

      const res = await this.reservaRepository.create({
         provider_id: findPrestador.id,
         from,
         at,
         mes,
      });

      return res;
   }
}
