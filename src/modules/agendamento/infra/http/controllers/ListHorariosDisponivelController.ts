import ListHorarioDiponilvelService from "@modules/agendamento/services/ListHorariosDisponivelService";
import { classToClass } from "class-transformer";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class ListHorariosDisponivelController {
   public async list(req: Request, res: Response): Promise<Response> {
      try {
         const listHorarios = container.resolve(ListHorarioDiponilvelService);

         const { dia, mes, ano, service, provider_id } = req.query;

         const list = await listHorarios.exec({
            provider_id: String(provider_id),
            service: String(service),
            dia: Number(dia),
            mes: Number(mes),
            ano: Number(ano),
         });

         return res.json(classToClass(list));
      } catch (err) {
         return res.json(err.message).status(400);
      }
   }
}
