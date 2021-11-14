"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _client = require("@prisma/client");

class ServiceRepository {
  constructor() {
    this.prisma = new _client.PrismaClient();
  }

  async findUniqService(provider_id, service) {
    const find = await this.prisma.services.findFirst({
      where: {
        provider_id,
        service
      }
    });
    return find;
  }

  async findById(id) {
    const find = await this.prisma.services.findFirst({
      where: {
        id
      }
    });
    return find;
  }

  async listService(provider_id) {
    const find = await this.prisma.services.findMany({
      where: {
        provider_id
      }
    });
    return find;
  }

  async create(data) {
    const servico = await this.prisma.services.create({
      data: {
        provider_id: data.provider_id,
        description: data.description,
        value: data.value,
        time: data.time,
        service: data.service
      }
    });
    return servico;
  }

  async delete(id) {
    await this.prisma.services.delete({
      where: {
        id
      }
    });
  }

}

exports.default = ServiceRepository;