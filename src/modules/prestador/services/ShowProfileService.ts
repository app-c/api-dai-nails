import IPrestadorRepository from "@modules/prestador/repositories/IPrestadorRepository";
import { Prestador } from "@prisma/client";
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest {
   provider_id: string;
}

@injectable()
export default class ShowProfilePrestadorService {
   constructor(
      @inject("PrestadorRepository")
      private prestadorRepository: IPrestadorRepository
   ) {}

   public async execute({ provider_id }: IRequest): Promise<Prestador> {
      const prestador = await this.prestadorRepository.findById(provider_id);

      if (!prestador) {
         throw new AppError("prestador nao encontrado");
      }

      return prestador;
   }
}
