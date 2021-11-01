import FindServiçoService from "@modules/agendamento/services/FindServiçoServce";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class ProviderController {
   public async create(req: Request, res: Response): Promise<Response> {
      const { provider_id } = req.params;

      const listService = container.resolve(FindServiçoService);

      const services = await listService.execute({
         provider_id,
      });

      return res.json(services);
   }
}
