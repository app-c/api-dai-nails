/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable import/prefer-default-export */
import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreatePromocaoService } from "../../service/createPromocaoService";
import { listPromocaoService } from "../../service/listPromocaoService";

export class PromocaoController {
   async create(req: Request, res: Response): Promise<Response> {
      const service = container.resolve(CreatePromocaoService);
      const { descricao } = req.body;
      const prestador_id = req.user.id;
      const image = req.file.filename;

      const po = await service.execute({
         descricao,
         image,
         prestador_id,
      });

      return res.json(po);
   }

   async list(req: Request, res: Response): Promise<Response> {
      const service = container.resolve(listPromocaoService);

      const po = await service.execute();

      return res.json(po);
   }
}
