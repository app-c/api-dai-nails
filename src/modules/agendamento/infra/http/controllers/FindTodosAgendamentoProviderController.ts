import FindTodosAgendamentosPrestadorSerice from "@modules/agendamento/services/FindTodosAgendamentosPrestadorServicce";
import { classToClass } from "class-transformer";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class FindTodosAgendamentosPrestadorController {
   public async list(req: Request, res: Response): Promise<Response> {
      const agenda = container.resolve(FindTodosAgendamentosPrestadorSerice);
      const provider_id = req.user.id;

      const ag = await agenda.execute(provider_id);
      await req.io.emit("ag", ag);
      return res.json(classToClass(ag));
   }
}
