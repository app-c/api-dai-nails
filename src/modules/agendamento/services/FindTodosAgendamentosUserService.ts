import { Agendamento } from "@prisma/client";
import AppError from "@shared/errors/AppError";
import { format, getDate } from "date-fns";
import { inject, injectable } from "tsyringe";
import { IAgendamentoRepository } from "../repositories/IAgendamentoRespository";

type Ihorarios = Array<{
   id: string;
   name: string;
   from: string;
   at: string;
   dia: number;
   mes: number;
   ano: number;
}>;
@injectable()
export default class FindTodosAgendamentosUserSerice {
   constructor(
      @inject("AgendamentoRepository")
      private agendamentoRepository: IAgendamentoRepository
   ) {}

   public async execute(user_id: string): Promise<Agendamento[]> {
      const agendamento = await this.agendamentoRepository.findTodosAgendamentosUser(
         user_id
      );

      if (!agendamento) {
         throw new AppError("sem agendamento");
      }

      // const [hour, minutes] = time.split(":").map(Number);

      const agenda = agendamento.sort((a, b) => {
         return a.from - b.from;
      });

      agenda.sort((a, b) => {
         return a.dia - b.dia;
      });

      return agenda;
   }
}
