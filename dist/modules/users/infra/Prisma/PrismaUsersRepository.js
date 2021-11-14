"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _client = require("@prisma/client");

class PrismaUsersRepository {
  constructor() {
    this.prisma = new _client.PrismaClient();
  }

  async findTodosUsuarios() {
    const find = await this.prisma.users.findMany();
    return find;
  }

  async create(data) {
    const user = await this.prisma.users.create({
      data: {
        nome: data.nome,
        email: data.email,
        senha: data.senha,
        telefone: data.telefone
      }
    });
    return user;
  }

  async findByEmail(email) {
    const user = await this.prisma.users.findUnique({
      where: {
        email
      },
      include: {
        agendamento: true
      }
    });
    return user;
  }

  async findById(id) {
    const user = await this.prisma.users.findUnique({
      where: {
        id
      }
    });
    return user;
  }

  async findByNome(nome) {
    const user = await this.prisma.users.findMany({
      where: {
        nome: {
          contains: nome
        }
      }
    });
    return user;
  }

}

exports.default = PrismaUsersRepository;