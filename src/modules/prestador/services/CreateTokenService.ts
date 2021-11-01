import IPrestadorRepository from "@modules/prestador/repositories/IPrestadorRepository";
import { Prestador, PrismaClient } from "@prisma/client";
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface Res {
   provider_id: string;
   token: string;
}

@injectable()
class CreateTokenService {
   private prisma = new PrismaClient();

   constructor(
      @inject("PrestadorRepository")
      private prestadorRepository: IPrestadorRepository
   ) {}

   public async execute({ token, provider_id }: Res): Promise<Prestador> {
      const findPrestador = await this.prestadorRepository.findById(
         provider_id
      );

      if (!findPrestador) {
         throw new AppError("prestador nao encontrado");
      }

      findPrestador.token = token;

      const update = await this.prisma.prestador.update({
         where: { id: provider_id },
         data: {
            token,
         },
      });

      return update;
   }
}

export default CreateTokenService;
