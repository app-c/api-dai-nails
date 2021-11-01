import FindTodosAgendamentos from "@modules/agendamento/services/FindTodosAgendamentos";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class FindTodosAgendamenosController {
   public async list(req: Request, res: Response): Promise<Response> {
      try {
         const agenda = container.resolve(FindTodosAgendamentos);
         const user_id = req.user.id;

         const ag = await agenda.execute();
         return res.json(ag);
      } catch (err) {
         return res.json(err.message).status(400);
      }
   }
}
