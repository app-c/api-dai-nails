"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _client = require("@prisma/client");

class ReservasRepository {
  constructor() {
    this.prisma = new _client.PrismaClient();
  }

  async create(data) {
    const res = await this.prisma.reservas.create({
      data: {
        provider_id: data.provider_id,
        from: data.from,
        at: data.at,
        dia: data.dia,
        mes: data.mes,
        ano: data.ano,
        week: data.week
      }
    });
    return res;
  }

  async findById(mes) {
    const res = await this.prisma.reservas.findMany({
      where: {
        mes
      }
    });
    return res;
  }

  async findByWeekMonth(mes, week) {
    const res = await this.prisma.reservas.findFirst({
      where: {
        mes,
        week
      }
    });
    return res;
  }

  async findAll(id) {
    const find = await this.prisma.reservas.findMany({
      where: {
        provider_id: id
      }
    });
    return find;
  }

}

exports.default = ReservasRepository;