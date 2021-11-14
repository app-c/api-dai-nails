"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PromocaoRespository = void 0;

var _client = require("@prisma/client");

/* eslint-disable import/prefer-default-export */
class PromocaoRespository {
  constructor() {
    this.prisma = new _client.PrismaClient();
  }

  async create(data) {
    const crate = await this.prisma.promocao.create({
      data: {
        descricao: data.descricao,
        image: data.image,
        prestador_id: data.prestador_id
      }
    });
    return crate;
  }

  async delete(id) {
    await this.prisma.promocao.delete({
      where: {
        id
      }
    });
  }

  async list(prestador_id) {
    const post = await this.prisma.promocao.findMany({
      where: {
        prestador_id
      }
    });
    return post;
  }

}

exports.PromocaoRespository = PromocaoRespository;