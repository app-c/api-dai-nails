/* eslint-disable camelcase */
import { Agendamento, PrismaClient, Prestador } from "@prisma/client";
import { ICreateAgendamentoDTO } from "@modules/agendamento/dtos/ICreateAgendamentoDTO";
import { IAgendamentoRepository } from "@modules/agendamento/repositories/IAgendamentoRespository";
import AppError from "@shared/errors/AppError";

export default class AgendamentoRepository implements IAgendamentoRepository {
   private prisma = new PrismaClient();

   public async create(data: ICreateAgendamentoDTO): Promise<Agendamento> {
      const agendamento = await this.prisma.agendamento.create({
         data: {
            provider_id: data.provider_id,
            user_id: data.user_id,
            from: data.from,
            at: data.at,
            dia: data.dia,
            mes: data.mes,
            ano: data.ano,
            service: data.service,
         },
      });

      return agendamento;
   }

   public async findAgenndamentosDoDia(
      dia: number,
      mes: number,
      provider_id: string
   ): Promise<Agendamento[]> {
      const agenda = await this.prisma.agendamento.findMany({
         where: {
            dia,
            mes,
            provider_id,
         },
         include: {
            user: true,
            prestador: true,
         },
      });

      return agenda;
   }

   public async delete(id: string): Promise<void> {
      const del = await this.prisma.agendamento.findUnique({ where: { id } });
      if (!del) {
         throw new AppError("not exist");
      }

      await this.prisma.agendamento.delete({ where: { id: del.id } });
   }

   public async findTodosAgendamentos(): Promise<Agendamento[]> {
      const agendo = await this.prisma.agendamento.findMany();

      return agendo;
   }

   public async findTodosAgendamentosUser(
      user_id: string
   ): Promise<Agendamento[]> {
      const agenda = await this.prisma.agendamento.findMany({
         where: { user_id },
         include: {
            user: true,
         },
      });

      return agenda;
   }

   public async findTodosAgendamentosPrestador(
      provider_id: string
   ): Promise<Agendamento[]> {
      const agenda = await this.prisma.agendamento.findMany({
         where: { provider_id },
         include: {
            prestador: true,
            user: true,
         },
      });

      return agenda;
   }

   public async findTodosPrestadores(): Promise<Prestador[]> {
      const prestador = await this.prisma.prestador.findMany({
         include: { services: true },
      });

      return prestador;
   }
}
