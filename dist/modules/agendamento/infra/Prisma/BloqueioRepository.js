"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _client = require("@prisma/client");

class BloqueioRepository {
  constructor() {
    this.prisma = new _client.PrismaClient();
  }

  async create(provider_id, from, at, dia, mes) {
    const bloc = await this.prisma.bloqueio.create({
      data: {
        provider_id,
        at,
        from,
        dia,
        mes
      }
    });
    return bloc;
  }

  async findBloqueio(provider_id, dia, mes) {
    const find = await this.prisma.bloqueio.findMany({
      where: {
        provider_id,
        dia,
        mes
      }
    });
    return find;
  }

}

exports.default = BloqueioRepository;