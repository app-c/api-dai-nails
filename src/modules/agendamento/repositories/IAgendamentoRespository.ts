/* eslint-disable camelcase */
import { Agendamento, Prestador } from "@prisma/client";
import { ICreateAgendamentoDTO } from "../dtos/ICreateAgendamentoDTO";

export interface IAgendamentoRepository {
   create(data: ICreateAgendamentoDTO): Promise<Agendamento>;

   findAgenndamentosDoDia(
      dia: number,
      mes: number,
      provider_id: string
   ): Promise<Agendamento[]>;

   delete(id: string): Promise<void>;

   findTodosAgendamentos(): Promise<Agendamento[]>;

   findTodosAgendamentosUser(user_id: string): Promise<Agendamento[]>;

   findTodosAgendamentosPrestador(provider_id: string): Promise<Agendamento[]>;

   findTodosPrestadores(): Promise<Prestador[]>;
}
