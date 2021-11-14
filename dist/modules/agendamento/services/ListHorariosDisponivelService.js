"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _IPrestadorRepository = _interopRequireDefault(require("../../prestador/repositories/IPrestadorRepository"));

var _IReservaRepository = _interopRequireDefault(require("../../prestador/repositories/IReservaRepository"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _dateFns = require("date-fns");

var _dateFnsTz = require("date-fns-tz");

var _tsyringe = require("tsyringe");

var _IAgendamentoRespository = require("../repositories/IAgendamentoRespository");

var _IBloqueioRepository = _interopRequireDefault(require("../repositories/IBloqueioRepository"));

var _IServiceRepository = _interopRequireDefault(require("../repositories/IServiceRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ListHorarioDiponilvelService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("AgendamentoRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("ServiceRepository")(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)("BloqueioRepostory")(target, undefined, 2);
}, _dec5 = function (target, key) {
  return (0, _tsyringe.inject)("PrestadorRepository")(target, undefined, 3);
}, _dec6 = function (target, key) {
  return (0, _tsyringe.inject)("ReservaRepository")(target, undefined, 4);
}, _dec7 = Reflect.metadata("design:type", Function), _dec8 = Reflect.metadata("design:paramtypes", [typeof _IAgendamentoRespository.IAgendamentoRepository === "undefined" ? Object : _IAgendamentoRespository.IAgendamentoRepository, typeof _IServiceRepository.default === "undefined" ? Object : _IServiceRepository.default, typeof _IBloqueioRepository.default === "undefined" ? Object : _IBloqueioRepository.default, typeof _IPrestadorRepository.default === "undefined" ? Object : _IPrestadorRepository.default, typeof _IReservaRepository.default === "undefined" ? Object : _IReservaRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = _dec7(_class = _dec8(_class = class ListHorarioDiponilvelService {
  constructor(agendamentoRepository, serviceRepository, bloquioRepository, prestadorRepository, reservaRepository) {
    this.agendamentoRepository = agendamentoRepository;
    this.serviceRepository = serviceRepository;
    this.bloquioRepository = bloquioRepository;
    this.prestadorRepository = prestadorRepository;
    this.reservaRepository = reservaRepository;
  }

  async exec({
    provider_id,
    service,
    dia,
    mes,
    ano
  }) {
    const horarios = [];

    function convertHours(time) {
      const [hour, minutes] = time.split(":").map(Number);
      const timeInMinutes = hour * 60 + minutes;
      return timeInMinutes;
    }

    const findSercies = await this.serviceRepository.findUniqService(provider_id, service);
    const findWork = await this.prestadorRepository.findById(provider_id);

    if (!findWork) {
      throw new _AppError.default("prestador nao encontrado");
    }

    if (!findSercies) {
      throw new _AppError.default("Esse serviço nao existe");
    }

    const tempoServico = convertHours(findSercies === null || findSercies === void 0 ? void 0 : findSercies.time);
    const time = (0, _dateFns.getMinutes)(new Date(2000, 2, 2, 10, tempoServico - 1, 0, 0));
    const appointments = await this.agendamentoRepository.findAgenndamentosDoDia(dia, mes, provider_id);
    const inicioDoHorarioMarcado = appointments.map(h => {
      return h.from;
    }).sort((a, b) => {
      return a - b;
    });
    const fimDoHorarioMarcado = appointments.map(h => {
      return h.at + 1;
    }).sort((a, b) => {
      return a - b;
    });

    function rangeHorario(start, stop) {
      stop = stop === undefined ? start : stop;
      start = stop === start ? tempoServico : start;
      const length = stop - start + 1;

      const mapFn = (h, i) => start + i;

      const hor = Array.from({
        length
      }, mapFn);
      return hor;
    }

    if (findSercies.service === service) {
      const hora = [];
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
      const fim = fimDoHorarioMarcado.slice(0, fimDoHorarioMarcado.length - 1);
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
      hora.filter(h => {
        const find = inicioDoHorarioMarcado.find(p => {
          return h === p;
        });

        if (h !== find) {
          horarios.push(h);
        }
      });

      if (inicioDoHorarioMarcado[0] > tempoInicialDaJornada) {
        let con = tempoInicialDaJornada - tempoServico;
        const or = [];
        const horaMI = inicioDoHorarioMarcado[0] - tempoServico;

        while (con < horaMI) {
          con += tempoServico;
          or.push(con);
        }

        or.filter(h => {
          if (h + time < inicioDoHorarioMarcado[0]) {
            horarios.push(h);
          }
        });
      }

      let hormin = fimDoHorarioMarcado[fimDoHorarioMarcado.length - 1] - tempoServico;

      for (hormin; hormin < tempoFinallDaJornada;) {
        hormin += tempoServico;

        if (hormin <= tempoFinallDaJornada) {
          horarios.push(hormin);
        }
      }
    }

    horarios.sort((a, b) => {
      return a - b;
    });
    const findBloqueio = await this.bloquioRepository.findBloqueio(provider_id, dia, mes);
    const findReservas = await this.reservaRepository.findById(mes);
    const findWeek = findReservas.map(h => {
      if (h.week === "domingo") {
        h.week = String(1);
      }

      if (h.week === "segunda") {
        h.week = String(2);
      }

      if (h.week === "terça") {
        h.week = String(3);
      }

      if (h.week === "quarta") {
        h.week = String(4);
      }

      if (h.week === "quinta") {
        h.week = String(5);
      }

      if (h.week === "sexta") {
        h.week = String(6);
      }

      if (h.week === "sábado") {
        h.week = String(7);
      }

      return h;
    });
    const startReserva = findReservas.map(h => convertHours(h.from)).sort((a, b) => a - b);
    const stopReserva = findReservas.map(h => convertHours(h.at)).sort((a, b) => a - b);
    const startBloqueio = findBloqueio.map(h => convertHours(h.from)).sort((a, b) => a - b);
    const stopBloqueio = findBloqueio.map(h => convertHours(h.at)).sort((a, b) => a - b);
    const bloqueio = []; // if (findBloqueio) {
    //    const lenght = findBloqueio.length - 1;
    //    let i = -1;
    //    while (i < lenght) {
    //       i += 1;
    //       const startB = startBloqueio[i];
    //       const stopB = stopBloqueio[i];
    //       rangeHorario(startB, stopB).map((h) => bloqueio.push(h));
    //    }
    // }

    const hourCorrent = (0, _dateFnsTz.zonedTimeToUtc)(new Date(Date.now()), "Brazil/Sao-Paulo");
    const event = (0, _dateFnsTz.zonedTimeToUtc)(new Date(ano, mes, dia, 0, 0), "Brazil/Sao-Paulo");
    const wekreservas = findWeek.filter(h => {
      const wek = (0, _dateFns.format)(event, "i");

      if (h.week === wek) {
        return h;
      }
    });
    const startReservaWeek = wekreservas.map(h => convertHours(h.from)).sort((a, b) => a - b);
    const stopReservaWeek = wekreservas.map(h => convertHours(h.at)).sort((a, b) => a - b);
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
          rangeHorario(start, stop).map(h => bloqueio.push(h));
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
          rangeHorario(startR, stopR).map(h => bloqueio.push(h));
        }
      }
    }

    const horariosBloqueados = horarios.filter(h => {
      const bk = bloqueio.find(d => {
        return h === d;
      });
      return h !== bk;
    });
    const hora = new Date(ano, mes, dia, 0, 480, 0);
    const ho = (0, _dateFnsTz.utcToZonedTime)(new Date(ano, mes, dia, 0, 480, 0), "Ameria/Sao_Paulo");
    const fo = (0, _dateFns.format)(hora, "HH:mm");
    const fu = (0, _dateFns.format)(ho, "HH:mm");
    console.log(ho, hora);
    console.log(fu, fo);
    const hor = horariosBloqueados.map(h => {
      const hour = new Date(ano, mes, dia, 0, h, 0);
      const formated = (0, _dateFns.format)(hour, "HH:mm");
      const weed = (0, _dateFns.format)(event, "i");
      return {
        hour: formated,
        avaliable: (0, _dateFns.isAfter)(hour, hourCorrent) && Number(weed) !== 1
      };
    });
    return hor;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class) || _class) || _class);
exports.default = ListHorarioDiponilvelService;