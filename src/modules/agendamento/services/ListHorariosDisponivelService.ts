/* eslint-disable array-callback-return */
import IPrestadorRepository from "@modules/prestador/repositories/IPrestadorRepository";
import IReservarRepository from "@modules/prestador/repositories/IReservaRepository";
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/ban-types */
import AppError from "@shared/errors/AppError";
import { isAfter, getMinutes, format, toDate } from "date-fns";
import ptBR from "date-fns/esm/locale/pt-BR/index.js";
import { inject, injectable } from "tsyringe";

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
            // const horaReduzida = convertHours(h.at);

            return h.at + 1;
         })
         .sort((a, b) => {
            return a - b;
         });

      const inicioLeng = inicioDoHorarioMarcado.length - 1;

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
               hora.push(f);
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

         // let indice = -1;
         // while (indice < inicioLeng) {
         //    indice += 1;
         //    const inicio = inicioDoHorarioMarcado[indice + 1] + 1;
         //    let fim = fimDoHorarioMarcado[indice];
         //    while (fim < inicio) {
         //       fim += 1;
         //       if (fim + tempoServico < inicio) {
         //          hora.push(fim);
         //       }
         //    }
         // }

         // const tempoWorkStart = convertHours(findWork.work_init);
         // const tempoWorkStop = convertHours(findWork.work_and);

         // let indCont = -tempoServico;
         // while (indCont < hora[hora.length - 1]) {
         //    indCont += tempoServico;
         //    if (hora[indCont] !== undefined) {
         //       horarios.push(hora[indCont]);
         //    }
         // }

         // if (inicioDoHorarioMarcado[0] === undefined) {
         //    let conte = tempoWorkStart - tempoServico;
         //    while (conte < tempoWorkStop) {
         //       conte += tempoServico;
         //       horarios.push(conte);
         //    }
         // }

         if (inicioDoHorarioMarcado[0] > tempoInicialDaJornada) {
            let con = tempoInicialDaJornada - tempoServico;
            console.log(time);
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

         // console.log(time, tempoServico);
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
      if (findBloqueio) {
         const lenght = findBloqueio.length - 1;
         let i = -1;

         while (i < lenght) {
            i += 1;

            const startB = startBloqueio[i];
            const stopB = stopBloqueio[i];

            rangeHorario(startB, stopB).map((h) => bloqueio.push(h));
         }
      }

      if (findReservas) {
         const lenght = findReservas.length - 1;
         let i = -1;

         while (i < lenght) {
            i += 1;

            const startR = startReserva[i];
            const stopR = stopReserva[i];

            rangeHorario(startR, stopR).map((h) => bloqueio.push(h));
         }
      }

      const horariosBloqueados = horarios.filter((h) => {
         const bk = bloqueio.find((d) => {
            return h === d;
         });
         return h !== bk;
      });

      const hor = horariosBloqueados.map((h) => {
         const hourCorrent = new Date(Date.now());
         hourCorrent.setMinutes(-(3 * 60));

         const event = new Date(ano, mes - 1, dia, 0, h, 0);

         const formated = format(event, "HH:mm");
         let week = format(event, "i");
         if (week === "7") {
            week = false;
         } else {
            week = true;
         }

         return {
            hour: formated,
            avaliable: isAfter(event, hourCorrent) && week,
         };
      });

      return hor;
   }
}
