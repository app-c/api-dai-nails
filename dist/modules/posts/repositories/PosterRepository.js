"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PostRespository = void 0;

var _client = require("@prisma/client");

/* eslint-disable import/prefer-default-export */
class PostRespository {
  constructor() {
    this.prisma = new _client.PrismaClient();
  }

  async create(data) {
    const crate = await this.prisma.posts.create({
      data: {
        descricao: data.descricao,
        post: data.post,
        prestador_id: data.prestador_id
      }
    });
    return crate;
  }

  async delete(id) {
    await this.prisma.posts.delete({
      where: {
        id
      }
    });
  }

  async list() {
    const post = await this.prisma.posts.findMany();
    return post;
  }

  async listByPrestador(prestador_id) {
    const find = await this.prisma.posts.findMany({
      where: {
        prestador_id
      }
    });
    return find;
  }

}

exports.PostRespository = PostRespository;