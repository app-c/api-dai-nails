"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _client = require("@prisma/client");

class PrestadorRepository {
  constructor() {
    this.prisma = new _client.PrismaClient();
  }

  async create(data) {
    const prestador = await this.prisma.prestador.create({
      data: {
        nome: data.nome,
        email: data.email,
        telefone: data.telefone,
        senha: data.senha,
        funcao: data.funcao,
        work_init: data.work_init,
        work_and: data.work_and
      }
    });
    return prestador;
  }

  async findByMail(email) {
    const prestadorMail = await this.prisma.prestador.findUnique({
      where: {
        email
      },
      include: {
        services: true,
        agendamento: true
      }
    });
    return prestadorMail;
  }

  async findById(id) {
    const prestadorId = await this.prisma.prestador.findUnique({
      where: {
        id
      },
      include: {
        services: true,
        agendamento: true,
        posts: true,
        promocao: true
      }
    });
    return prestadorId;
  }

  async findTodosPrestador() {
    const prestador = await this.prisma.prestador.findMany();
    return prestador;
  }

}

exports.default = PrestadorRepository;