"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _INotificationsReposiotry = _interopRequireDefault(require("../../notifications/repositories/INotificationsReposiotry"));

var _IPrestadorRepository = _interopRequireDefault(require("../../prestador/repositories/IPrestadorRepository"));

var _ICachProvider = _interopRequireDefault(require("../../../shared/container/providers/CashProvider/models/ICachProvider"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _dateFns = require("date-fns");

var _tsyringe = require("tsyringe");

var _IAgendamentoRespository = require("../repositories/IAgendamentoRespository");

var _IServiceRepository = _interopRequireDefault(require("../repositories/IServiceRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function convertHours(time) {
  const [hour, minutes] = time.split(":").map(Number);
  const timeInMinutes = hour * 60 + minutes;
  return timeInMinutes;
}

let CreateAgendamentoService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("AgendamentoRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("ServiceRepository")(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)("PrestadorRepository")(target, undefined, 2);
}, _dec5 = function (target, key) {
  return (0, _tsyringe.inject)("NotificationRepository")(target, undefined, 3);
}, _dec6 = function (target, key) {
  return (0, _tsyringe.inject)("CacheProvider")(target, undefined, 4);
}, _dec7 = Reflect.metadata("design:type", Function), _dec8 = Reflect.metadata("design:paramtypes", [typeof _IAgendamentoRespository.IAgendamentoRepository === "undefined" ? Object : _IAgendamentoRespository.IAgendamentoRepository, typeof _IServiceRepository.default === "undefined" ? Object : _IServiceRepository.default, typeof _IPrestadorRepository.default === "undefined" ? Object : _IPrestadorRepository.default, typeof _INotificationsReposiotry.default === "undefined" ? Object : _INotificationsReposiotry.default, typeof _ICachProvider.default === "undefined" ? Object : _ICachProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = _dec7(_class = _dec8(_class = class CreateAgendamentoService {
  constructor(agendamentoRepository, serviceRepository, UserRepository, notificationRepository, cacheProvider) {
    this.agendamentoRepository = agendamentoRepository;
    this.serviceRepository = serviceRepository;
    this.UserRepository = UserRepository;
    this.notificationRepository = notificationRepository;
    this.cacheProvider = cacheProvider;
  }

  async execute({
    provider_id,
    user_id,
    service,
    from,
    dia,
    mes,
    ano
  }) {
    const agendaDodia = await this.agendamentoRepository.findAgenndamentosDoDia(dia, mes, provider_id);
    const findServices = await this.serviceRepository.findUniqService(provider_id, service);
    const findUsername = await this.UserRepository.findById(provider_id);

    if (!findUsername) {
      throw new _AppError.default("Prestador nao encontrado");
    }

    if (!findServices) {
      throw new _AppError.default("esse servico nao existe");
    }

    const tempo = findServices.time;
    const hour = convertHours(from);
    console.log(hour);
    const endHour = convertHours(tempo) + hour - 1;
    const horarioDoDia = agendaDodia.map(h => {
      return h.from;
    });
    const horaFinal = [];
    agendaDodia.map(hou => {
      horaFinal.push(hou.at);
    });

    if (findServices.service === service) {
      const inLeng = horarioDoDia.length - 1;
      let indice = -1;
      const horarioJaAgendados = [];

      while (indice < inLeng) {
        indice += 1;

        while (horarioDoDia[indice] < horaFinal[indice]) {
          horarioDoDia[indice] += 1;
          horarioJaAgendados.push(horarioDoDia[indice]);
        }
      }

      let h = hour;
      const horasFrom = [];

      while (h < endHour) {
        h += 1;
        horasFrom.push(h);
      }

      horarioJaAgendados.map(ho => {
        horasFrom.map(p => {
          if (ho === p) {
            throw new _AppError.default("Esse horário ja esta marcado");
          }
        });
      });
    }

    const date = new Date(ano, mes - 1, dia, 0, hour);
    const dateNow = new Date(Date.now()).setMinutes(-(3 * 60));

    if ((0, _dateFns.isBefore)(date, dateNow)) {
      throw new _AppError.default("Você não pode agendar um horario em horas ja passadas");
    }

    if (user_id === provider_id) {
      throw new _AppError.default("Você não pode agendar um horario para voce mesmo");
    }

    const appointment = this.agendamentoRepository.create({
      provider_id,
      user_id,
      from: hour,
      at: endHour,
      dia,
      mes,
      ano,
      service
    });
    const dateFormatted = (0, _dateFns.format)(date, "dd/MMM/yyyy 'ás' HH:mm");
    await this.notificationRepository.create({
      recipient_id: provider_id,
      content: `Novo agendameto de ${service} para o dia ${dateFormatted}`
    });
    await this.cacheProvider.invalidate(`provider-appointments:${provider_id}:${(0, _dateFns.format)(hour, "yyyy-M-d")}`);
    return appointment;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class) || _class) || _class);
exports.default = CreateAgendamentoService;