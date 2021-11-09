import IPrestadorRepository from "@modules/prestador/repositories/IPrestadorRepository";
import { Posts } from "@prisma/client";
import IStorageProvider from "@shared/container/providers/StorageProvider/models/IStorageProviders";
import AppError from "@shared/errors/AppError";
/* eslint-disable import/prefer-default-export */
import { inject, injectable } from "tsyringe";

import { IPostsDtos } from "../Dtos/IPostsDtos";
import { IPostsRepository } from "../repositories/IPostRepository";

@injectable()
export class CreatePostsService {
   constructor(
      @inject("PrismaPosts")
      private postRespository: IPostsRepository,

      @inject("StorageProvider")
      private storage: IStorageProvider,

      @inject("PrestadorRepository")
      private prestadorRespository: IPrestadorRepository
   ) {}

   async execute({
      descricao,
      post,
      prestador_id,
   }: IPostsDtos): Promise<Posts> {
      const user = await this.prestadorRespository.findById(prestador_id);

      if (!user) {
         throw new AppError("prestador nao encontrado");
      }
      await this.storage.saveFile(post, "posts");
      const create = await this.postRespository.create({
         descricao,
         post,
         prestador_id,
      });

      return create;
   }
}
