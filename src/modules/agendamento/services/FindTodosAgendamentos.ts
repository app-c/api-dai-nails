import { Agendamento } from "@prisma/client";
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { IAgendamentoRepository } from "../repositories/IAgendamentoRespository";

@injectable()
export default class FindTodosAgendamentos {
   constructor(
      @inject("AgendamentoRepository")
      private agendamentoRepository: IAgendamentoRepository
   ) {}

   public async execute(): Promise<Agendamento[]> {
      const agenda = await this.agendamentoRepository.findTodosAgendamentos();

      if (!agenda) {
         throw new AppError("Nenhum agendamento disponivel");
      }

      return agenda;
   }
}
