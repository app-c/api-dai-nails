/* eslint-disable import/prefer-default-export */
import { Posts } from "@prisma/client";
import { inject, injectable } from "tsyringe";

import { IPostsRepository } from "../repositories/IPostRepository";

interface IPost {
   post: string;
   postUrl: string;
   descricao: string;
}

@injectable()
export class listPostService {
   constructor(
      @inject("PrismaPosts")
      private postRespository: IPostsRepository
   ) {}

   async execute(): Promise<IPost[]> {
      const post = await this.postRespository.list();

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
