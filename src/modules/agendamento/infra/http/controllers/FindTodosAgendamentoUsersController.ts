import FindTodosAgendamentosUserSerice from "@modules/agendamento/services/FindTodosAgendamentosUserService";
import { classToClass } from "class-transformer";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class FindTodosAgendamentosUserController {
   public async list(req: Request, res: Response): Promise<Response> {
      try {
         const agenda = container.resolve(FindTodosAgendamentosUserSerice);
         const user_id = req.user.id;

         const ag = await agenda.execute(user_id);
         return res.json(ag);
      } catch (err) {
         return res.json(err.message).status(200);
      }
   }
}
