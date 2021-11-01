import ReservaDeHorariosService from "@modules/prestador/services/ReservaDeHorariosService";
import { Request, Response } from "express";

import { container } from "tsyringe";

export default class ReservaController {
   public async create(req: Request, res: Response): Promise<Response> {
      const createService = container.resolve(ReservaDeHorariosService);
      const { from, at, mes } = req.body;
      const provider_id = req.user.id;

      const services = await createService.execute({
         provider_id,
         from,
         at,
         mes,
      });

      return res.json(services);
   }
}
