import CreateAgendamentoService from "@modules/agendamento/services/CreateAgendamentoService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class AgendamentoController {
   public async create(req: Request, res: Response): Promise<Response> {
      try {
         const {
            provider_id,
            user_id,
            from,
            service,
            dia,
            mes,
            ano,
         } = req.body;

         const createAgendamento = container.resolve(CreateAgendamentoService);

         const agendamento = await createAgendamento.execute({
            provider_id,
            user_id,
            from,
            at: from,
            dia,
            mes,
            ano,
            service,
         });

         await req.io.emit("hora", agendamento);

         return res.json(agendamento);
      } catch (error) {
         return res.json(error).status(200);
      }
   }
}
