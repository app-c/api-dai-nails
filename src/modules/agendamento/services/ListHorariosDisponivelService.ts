/* eslint-disable yoda */
/* eslint-disable import/no-duplicates */
/* eslint-disable array-callback-return */
import IPrestadorRepository from "@modules/prestador/repositories/IPrestadorRepository";
import IReservarRepository from "@modules/prestador/repositories/IReservaRepository";
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/ban-types */
import AppError from "@shared/errors/AppError";
import {
   isAfter,
   getMinutes,
   format,
   toDate,
   isWeekend,
   getWeek,
   isSunday,
   getHours,
   addHours,
} from "date-fns";
import { utcToZonedTime, zonedTimeToUtc } from "date-fns-tz";
import ptBR from "date-fns/esm/locale/pt-BR";
import { inject, injectable } from "tsyringe";

import { converData } from "../../../../utils/convert";
import { IAgendamentoRepository } from "../repositories/IAgendamentoRespository";
import IBloqueioRepository from "../repositories/IBloqueioRepository";
import IServiceRepository from "../repositories/IServiceRepository";

interface IRequest {
   provider_id: string;
   service: string;
   dia: number;
   mes: number;
   ano: number;
}

interface Ihorarios {
   hour: string;
   avaliable: boolean | string;
}

@injectable()
export default class ListHorarioDiponilvelService {
   constructor(
      @inject("AgendamentoRepository")
      private agendamentoRepository: IAgendamentoRepository,

      @inject("ServiceRepository")
      private serviceRepository: IServiceRepository,

      @inject("BloqueioRepostory")
      private bloquioRepository: IBloqueioRepository,

      @inject("PrestadorRepository")
      private prestadorRepository: IPrestadorRepository,

      @inject("ReservaRepository")
      private reservaRepository: IReservarRepository
   ) {}

   public async exec({
      provider_id,
      service,
      dia,
      mes,
      ano,
   }: IRequest): Promise<Ihorarios[]> {
      const horarios: number[] = [];

      function convertHours(time: string) {
         const [hour, minutes] = time.split(":").map(Number);
         const timeInMinutes = hour * 60 + minutes;
         return timeInMinutes;
      }

      const findSercies = await this.serviceRepository.findUniqService(
         provider_id,
         service
      );

      const findWork = await this.prestadorRepository.findById(provider_id);

      if (!findWork) {
         throw new AppError("prestador nao encontrado");
      }

      if (!findSercies) {
         throw new AppError("Esse serviço nao existe");
      }

      const tempoServico = convertHours(findSercies?.time);
      const time = getMinutes(new Date(2000, 2, 2, 10, tempoServico - 1, 0, 0));

      const appointments = await this.agendamentoRepository.findAgenndamentosDoDia(
         dia,
         mes,
         provider_id
      );

      const inicioDoHorarioMarcado = appointments
         .map((h) => {
            return h.from;
         })
         .sort((a, b) => {
            return a - b;
         });

      const fimDoHorarioMarcado = appointments
         .map((h) => {
            return h.at + 1;
         })
         .sort((a, b) => {
            return a - b;
         });

      function rangeHorario(start: number, stop: number) {
         stop = stop === undefined ? start : stop;
         start = stop === start ? tempoServico : start;

         const length = stop - start + 1;

         const mapFn = (h: number, i: number) => start + i;

         const hor = Array.from({ length }, mapFn);
         return hor;
      }

      if (findSercies.service === service) {
         const hora: number[] = [];

         const tempoInicialDaJornada = convertHours(findWork.work_init);
         const tempoFinallDaJornada = convertHours(findWork.work_and);

         if (!inicioDoHorarioMarcado[0]) {
            let i = tempoInicialDaJornada - tempoServico;
            while (i < tempoFinallDaJornada) {
               i += tempoServico;
               horarios.push(i);
            }
         }

         const inicio = inicioDoHorarioMarcado.slice(1);
         const fim = fimDoHorarioMarcado.slice(
            0,
            fimDoHorarioMarcado.length - 1
         );

         inicio.map((h, i) => {
            let f = fim[i] - tempoServico;
            while (f < h) {
               f += tempoServico;
               const soma = f + tempoServico - 1;
               if (soma < h) {
                  hora.push(f);
               }
            }
         });

         hora.filter((h) => {
            const find = inicioDoHorarioMarcado.find((p) => {
               return h === p;
            });

            if (h !== find) {
               horarios.push(h);
            }
         });

         if (inicioDoHorarioMarcado[0] > tempoInicialDaJornada) {
            let con = tempoInicialDaJornada - tempoServico;
            const or: number[] = [];
            const horaMI = inicioDoHorarioMarcado[0] - tempoServico;
            while (con < horaMI) {
               con += tempoServico;
               or.push(con);
            }
            or.filter((h) => {
               if (h + time < inicioDoHorarioMarcado[0]) {
                  horarios.push(h);
               }
            });
         }

         let hormin =
            fimDoHorarioMarcado[fimDoHorarioMarcado.length - 1] - tempoServico;
         for (hormin; hormin < tempoFinallDaJornada; ) {
            hormin += tempoServico;
            if (hormin <= tempoFinallDaJornada) {
               horarios.push(hormin);
            }
         }
      }

      horarios.sort((a, b) => {
         return a - b;
      });

      const findBloqueio = await this.bloquioRepository.findBloqueio(
         provider_id,
         dia,
         mes
      );

      const findReservas = await this.reservaRepository.findById(mes);
      const findWeek = findReservas.map((h) => {
         if (h.week === "domingo") {
            h.week = String(7);
         }

         if (h.week === "segunda") {
            h.week = String(1);
         }

         if (h.week === "terça") {
            h.week = String(2);
         }

         if (h.week === "quarta") {
            h.week = String(3);
         }
         if (h.week === "quinta") {
            h.week = String(4);
         }
         if (h.week === "sexta") {
            h.week = String(5);
         }

         if (h.week === "sábado") {
            h.week = String(6);
         }

         return h;
      });

      const startReserva = findReservas
         .map((h) => convertHours(h.from))
         .sort((a, b) => a - b);

      const stopReserva = findReservas
         .map((h) => convertHours(h.at))
         .sort((a, b) => a - b);

      const startBloqueio = findBloqueio
         .map((h) => convertHours(h.from))
         .sort((a, b) => a - b);

      const stopBloqueio = findBloqueio
         .map((h) => convertHours(h.at))
         .sort((a, b) => a - b);

      const bloqueio: number[] = [];
      // if (findBloqueio) {
      //    const lenght = findBloqueio.length - 1;
      //    let i = -1;

      //    while (i < lenght) {
      //       i += 1;

      //       const startB = startBloqueio[i];
      //       const stopB = stopBloqueio[i];

      //       rangeHorario(startB, stopB).map((h) => bloqueio.push(h));
      //    }
      // }

      const hourCorrent = new Date(Date.now());
      const HC = addHours(hourCorrent, -3);

      const event = new Date(ano, mes - 1, dia, 0, 0);

      const wekreservas = findWeek.filter((h) => {
         const wek = format(event, "i");
         console.log(wek, event);

         if (h.week === wek) {
            return h;
         }
      });

      const startReservaWeek = wekreservas
         .map((h) => convertHours(h.from))
         .sort((a, b) => a - b);

      const stopReservaWeek = wekreservas
         .map((h) => convertHours(h.at))
         .sort((a, b) => a - b);

      let index = -1;
      const wekLeng = wekreservas.length - 1;

      while (index < wekLeng) {
         index += 1;

         if (!wekreservas[index].dia) {
            const leng = findWeek.length - 1;
            let x = -1;

            while (x < leng) {
               x += 1;

               const start = startReservaWeek[x];
               const stop = stopReservaWeek[x];

               rangeHorario(start, stop).map((h) => bloqueio.push(h));
            }
         }
      }

      let indexRe = -1;
      const reserva = findReservas.length - 1;

      while (indexRe < reserva) {
         indexRe += 1;

         if (findReservas[indexRe].dia === dia) {
            const lenght = findReservas.length - 1;
            let i = -1;

            while (i < lenght) {
               i += 1;

               const startR = startReserva[i];
               const stopR = stopReserva[i];

               rangeHorario(startR, stopR).map((h) => bloqueio.push(h));
            }
         }
      }

      const horariosBloqueados = horarios.filter((h) => {
         const bk = bloqueio.find((d) => {
            return h === d;
         });
         return h !== bk;
      });

      const ho = new Date(Date.now());

      const hor = horariosBloqueados.map((h) => {
         const hour = new Date(ano, mes - 1, dia, 0, h, 0);
         const formated = format(hour, "HH:mm");
         const weed = format(hour, "i");
         return {
            hour: formated,
            avaliable: isAfter(hour, ho) && Number(weed) !== 7,
         };
      });

      return hor;
   }
}
