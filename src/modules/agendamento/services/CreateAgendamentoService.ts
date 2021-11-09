/* eslint-disable no-param-reassign */
/* eslint-disable array-callback-return */
import INotification from "@modules/notifications/repositories/INotificationsReposiotry";
import IPrestadorRepository from "@modules/prestador/repositories/IPrestadorRepository";
import { Agendamento } from "@prisma/client";
import ICacheProvider from "@shared/container/providers/CashProvider/models/ICachProvider";
import AppError from "@shared/errors/AppError";
import { format, isBefore } from "date-fns";
import { inject, injectable } from "tsyringe";

import { IAgendamentoRepository } from "../repositories/IAgendamentoRespository";
import IServiceRepository from "../repositories/IServiceRepository";

interface IRequest {
   provider_id: string;
   user_id: string;
   service: string;
   from: string;
   at: number;
   dia: number;
   mes: number;
   ano: number;
}

function convertHours(time: string) {
   const [hour, minutes] = time.split(":").map(Number);
   const timeInMinutes = hour * 60 + minutes;
   return timeInMinutes;
}

@injectable()
export default class CreateAgendamentoService {
   constructor(
      @inject("AgendamentoRepository")
      private agendamentoRepository: IAgendamentoRepository,

      @inject("ServiceRepository")
      private serviceRepository: IServiceRepository,

      @inject("PrestadorRepository")
      private UserRepository: IPrestadorRepository,

      @inject("NotificationRepository")
      private notificationRepository: INotification,

      @inject("CacheProvider")
      private cacheProvider: ICacheProvider
   ) {}

   public async execute({
      provider_id,
      user_id,
      service,
      from,
      dia,
      mes,
      ano,
   }: IRequest): Promise<Agendamento> {
      const agendaDodia = await this.agendamentoRepository.findAgenndamentosDoDia(
         dia,
         mes,
         provider_id
      );

      const findServices = await this.serviceRepository.findUniqService(
         provider_id,
         service
      );

      const findUsername = await this.UserRepository.findById(provider_id);

      if (!findUsername) {
         throw new AppError("Prestador nao encontrado");
      }

      if (!findServices) {
         throw new AppError("esse servico nao existe");
      }

      const tempo = findServices.time as string;

      const hour = convertHours(from);
      console.log(hour);
      const endHour = convertHours(tempo) + hour - 1;

      const horarioDoDia = agendaDodia.map((h) => {
         return h.from;
      });

      const horaFinal: number[] = [];
      agendaDodia.map((hou) => {
         horaFinal.push(hou.at);
      });

      if (findServices.service === service) {
         const inLeng = horarioDoDia.length - 1;
         let indice = -1;
         const horarioJaAgendados: number[] = [];

         while (indice < inLeng) {
            indice += 1;
            while (horarioDoDia[indice] < horaFinal[indice]) {
               horarioDoDia[indice] += 1;
               horarioJaAgendados.push(horarioDoDia[indice]);
            }
         }

         let h = hour;

         const horasFrom: number[] = [];
         while (h < endHour) {
            h += 1;
            horasFrom.push(h);
         }

         horarioJaAgendados.map((ho) => {
            horasFrom.map((p) => {
               if (ho === p) {
                  throw new AppError("Esse horário ja esta marcado");
               }
            });
         });
      }

      const date = new Date(ano, mes - 1, dia, 0, hour);
      const dateNow = new Date(Date.now()).setMinutes(-(3 * 60));

      if (isBefore(date, dateNow)) {
         throw new AppError(
            "Você não pode agendar um horario em horas ja passadas"
         );
      }

      if (user_id === provider_id) {
         throw new AppError("Você não pode agendar um horario para voce mesmo");
      }

      const appointment = this.agendamentoRepository.create({
         provider_id,
         user_id,
         from: hour,
         at: endHour,
         dia,
         mes,
         ano,
         service,
      });

      const dateFormatted = format(date, "dd/MMM/yyyy 'ás' HH:mm");

      await this.notificationRepository.create({
         recipient_id: provider_id,
         content: `Novo agendameto de ${service} para o dia ${dateFormatted}`,
      });

      await this.cacheProvider.invalidate(
         `provider-appointments:${provider_id}:${format(hour, "yyyy-M-d")}`
      );

      return appointment;
   }
}
