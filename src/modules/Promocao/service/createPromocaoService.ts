import IPrestadorRepository from "@modules/prestador/repositories/IPrestadorRepository";
import { PrismaClient, Promocao } from "@prisma/client";
import IStorageProvider from "@shared/container/providers/StorageProvider/models/IStorageProviders";
import AppError from "@shared/errors/AppError";
/* eslint-disable import/prefer-default-export */
import { inject, injectable } from "tsyringe";

import { IPromocaoDtos } from "../Dtos/IPromocaoDtos";
import { IPromocaoRepository } from "../repositories/IPromocaoRepository";

@injectable()
export class CreatePromocaoService {
   private prisma = new PrismaClient();

   constructor(
      @inject("PrismaPromocao")
      private promocaoRespository: IPromocaoRepository,

      @inject("StorageProvider")
      private storage: IStorageProvider,

      @inject("PrestadorRepository")
      private prestadorRespository: IPrestadorRepository
   ) {}

   async execute({
      descricao,
      image,
      prestador_id,
   }: IPromocaoDtos): Promise<Promocao> {
      const user = await this.prestadorRespository.findById(prestador_id);
      const promo = await this.promocaoRespository.list(prestador_id);

      if (!user) {
         throw new AppError("prestador nao encontrado");
      }

      console.log(promo);

      if (promo[0]) {
         await this.prisma.promocao.delete({
            where: { id: promo[0].id },
         });
      }

      await this.storage.saveFile(image, "promocao");

      const create = await this.promocaoRespository.create({
         descricao,
         image,
         prestador_id,
      });

      return create;
   }
}
