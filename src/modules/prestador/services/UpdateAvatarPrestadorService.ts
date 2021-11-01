import { Prestador, PrismaClient } from "@prisma/client";
import IStorageProvider from "@shared/container/providers/StorageProvider/models/IStorageProviders";
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import IPrestadorRepository from "../repositories/IPrestadorRepository";

interface IRequest {
   provider_id: string;
   avatarName: string;
}

@injectable()
export default class UpdateAvatarPrestadorService {
   private prisma = new PrismaClient();

   constructor(
      @inject("PrestadorRepository")
      private prestadorRepository: IPrestadorRepository,

      @inject("StorageProvider")
      private storageProvider: IStorageProvider
   ) {}

   public async execute({
      provider_id,
      avatarName,
   }: IRequest): Promise<Prestador> {
      const prestador = await this.prestadorRepository.findById(provider_id);
      console.log(prestador);

      if (!prestador) {
         throw new AppError("Usuário nãos encontrado");
      }

      if (prestador.avatar) {
         await this.storageProvider.deleteFile(prestador.avatar);
      }

      const fileName = await this.storageProvider.saveFile(avatarName);

      prestador.avatar = fileName;

      await this.prisma.prestador.update({
         where: {
            id: provider_id,
         },
         data: {
            avatar: fileName,
         },
      });

      return prestador;
   }
}
