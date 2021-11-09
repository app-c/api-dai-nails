/* eslint-disable import/prefer-default-export */
import { Posts } from "@prisma/client";
import { inject, injectable } from "tsyringe";

import { IPostsRepository } from "../repositories/IPostRepository";

interface IPost {
   post: string;
   postUrl: string;
   descricao: string;
}

interface IProps {
   prestador_id: string;
}
@injectable()
export class listPostPrestadorService {
   constructor(
      @inject("PrismaPosts")
      private postRespository: IPostsRepository
   ) {}

   async execute({ prestador_id }: IProps): Promise<IPost[]> {
      const post = await this.postRespository.listByPrestador(prestador_id);

      const po = post.map((h) => {
         return {
            post: h.post,
            postUrl: `${process.env.AWS_URL}posts/${h.post}`,
            descricao: h.descricao,
         };
      });

      return po;
   }
}
