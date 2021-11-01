import { bloqueio } from "@prisma/client";
import { inject, injectable } from "tsyringe";
import IBloqueioRepository from "../repositories/IBloqueioRepository";

@injectable()
export default class CreateBloqueioService {
   constructor(
      @inject("BloqueioRepostory")
      private bloqueioRepository: IBloqueioRepository
   ) {}

   public async execute(
      provider_id: string,
      from: string,
      at: string,
      dia: number,
      mes: number
   ): Promise<bloqueio> {
      const createBloqueio = await this.bloqueioRepository.create(
         provider_id,
         from,
         at,
         dia,
         mes
      );

      return createBloqueio;
   }
}
