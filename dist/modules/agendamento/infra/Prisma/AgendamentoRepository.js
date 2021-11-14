"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _client = require("@prisma/client");

var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable camelcase */
class AgendamentoRepository {
  constructor() {
    this.prisma = new _client.PrismaClient();
  }

  async create(data) {
    const agendamento = await this.prisma.agendamento.create({
      data: {
        provider_id: data.provider_id,
        user_id: data.user_id,
        from: data.from,
        at: data.at,
        dia: data.dia,
        mes: data.mes,
        ano: data.ano,
        service: data.service
      }
    });
    return agendamento;
  }

  async findAgenndamentosDoDia(dia, mes, provider_id) {
    const agenda = await this.prisma.agendamento.findMany({
      where: {
        dia,
        mes,
        provider_id
      },
      include: {
        user: true,
        prestador: true
      }
    });
    return agenda;
  }

  async delete(id) {
    const del = await this.prisma.agendamento.findUnique({
      where: {
        id
      }
    });

    if (!del) {
      throw new _AppError.default("not exist");
    }

    await this.prisma.agendamento.delete({
      where: {
        id: del.id
      }
    });
  }

  async findTodosAgendamentos() {
    const agendo = await this.prisma.agendamento.findMany();
    return agendo;
  }

  async findTodosAgendamentosUser(user_id) {
    const agenda = await this.prisma.agendamento.findMany({
      where: {
        user_id
      },
      include: {
        user: true
      }
    });
    return agenda;
  }

  async findTodosAgendamentosPrestador(provider_id) {
    const agenda = await this.prisma.agendamento.findMany({
      where: {
        provider_id
      },
      include: {
        prestador: true,
        user: true
      }
    });
    return agenda;
  }

  async findTodosPrestadores() {
    const prestador = await this.prisma.prestador.findMany({
      include: {
        services: true
      }
    });
    return prestador;
  }

}

exports.default = AgendamentoRepository;