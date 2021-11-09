/* eslint-disable import/prefer-default-export */
import { Posts, PrismaClient } from "@prisma/client";

import { IPostsDtos } from "../Dtos/IPostsDtos";
import { IPostsRepository } from "./IPostRepository";

export class PostRespository implements IPostsRepository {
   private prisma = new PrismaClient();

   async create(data: IPostsDtos): Promise<Posts> {
      const crate = await this.prisma.posts.create({
         data: {
            descricao: data.descricao,
            post: data.post,
            prestador_id: data.prestador_id,
         },
      });

      return crate;
   }

   async delete(id: string): Promise<void> {
      await this.prisma.posts.delete({
         where: { id },
      });
   }

   async list(): Promise<Posts[]> {
      const post = await this.prisma.posts.findMany();

      return post;
   }

   async listByPrestador(prestador_id: string): Promise<Posts[]> {
      const find = await this.prisma.posts.findMany({
         where: { prestador_id },
      });

      return find;
   }
}
