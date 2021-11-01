import IHashProvider from "@modules/users/providers/HashProvider/models/IHashProvider";
import { isAfter, addHours } from "date-fns";

import AppError from "@shared/errors/AppError";
import IPrestadorRepository from "@modules/prestador/repositories/IPrestadorRepository";
import { inject, injectable } from "tsyringe";
import { PrismaClient } from "@prisma/client";
import IPrestadorToken from "../repositories/IPrestadorToken";

interface IRequest {
   token: string;
   senha: string;
}

@injectable()
export default class ResetSenhaService {
   private prisma = new PrismaClient();

   constructor(
      @inject("PrestadorRepository")
      private prestadorRepository: IPrestadorRepository,

      @inject("Prestadortoken")
      private tokenRepository: IPrestadorToken,

      @inject("HashProvider")
      private hashProvider: IHashProvider
   ) {}

   public async execute({ token, senha }: IRequest): Promise<void> {
      const providerToken = await this.tokenRepository.findByToken(token);

      if (!providerToken) {
         throw new AppError("Token nao existe");
      }

      const prestador = await this.prestadorRepository.findById(
         providerToken.provider_id
      );

      if (!prestador) {
         throw new AppError("usuario nao existe");
      }

      const createToken = providerToken.created_at;
      const conpareDate = addHours(createToken, 2);

      if (isAfter(Date.now(), conpareDate)) {
         throw new AppError("Token expirado");
      }

      const hasg = await this.hashProvider.generateHah(senha);

      await this.prisma.prestador.update({
         where: { id: prestador.id },
         data: {
            senha: hasg,
         },
      });
   }
}
