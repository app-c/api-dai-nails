import ReservaDeHorariosService from "@modules/prestador/services/ReservaDeHorariosService";
import { format } from "date-fns";
import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListAllReservas } from "../../services/ListAllReservas";

export default class ReservaController {
   public async create(req: Request, res: Response): Promise<Response> {
      const createService = container.resolve(ReservaDeHorariosService);
      const { from, at, dia, mes, ano, week } = req.body;
      const provider_id = req.user.id;

      const services = await createService.execute({
         provider_id,
         from,
         at,
         dia,
         mes,
         ano,
         week,
      });

      return res.json(services);
   }

   public async findAll(req: Request, res: Response): Promise<Response> {
      const createService = container.resolve(ListAllReservas);
      const provider_id = req.user.id;

      const services = await createService.execute({
         id: provider_id,
      });

      return res.json(services);
   }
}
