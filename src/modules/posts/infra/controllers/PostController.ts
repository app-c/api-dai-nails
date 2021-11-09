/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable import/prefer-default-export */
import { listPostPrestadorService } from "@modules/posts/service/listPostsPrestadorService";
import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreatePostsService } from "../../service/createPostsService";
import { listPostService } from "../../service/listPostsService";

export class PostController {
   async create(req: Request, res: Response): Promise<Response> {
      const service = container.resolve(CreatePostsService);
      const { descricao } = req.body;
      const prestador_id = req.user.id;
      const post = req.file.filename;

      const po = await service.execute({
         descricao,
         post,
         prestador_id,
      });

      return res.json(po);
   }

   async listPresetadorPost(req: Request, res: Response): Promise<Response> {
      const service = container.resolve(listPostPrestadorService);
      const { prestador_id } = req.query;

      const po = await service.execute({ prestador_id: String(prestador_id) });

      return res.json(po);
   }

   async list(req: Request, res: Response): Promise<Response> {
      const service = container.resolve(listPostService);

      const po = await service.execute();

      return res.json(po);
   }
}
