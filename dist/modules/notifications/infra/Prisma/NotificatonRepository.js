"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _client = require("@prisma/client");

class NotificationsRepository {
  constructor() {
    this.prisma = new _client.PrismaClient();
  }

  async create({
    content,
    recipient_id
  }) {
    const notifica = await this.prisma.notification.create({
      data: {
        content,
        recipient_id
      }
    });
    return notifica;
  }

  async list() {
    const notifica = await this.prisma.notification.findMany();
    return notifica;
  }

  async findByid(provider_id) {
    const find = await this.prisma.notification.findMany({
      where: {
        recipient_id: provider_id
      }
    });
    return find;
  }

}

exports.default = NotificationsRepository;