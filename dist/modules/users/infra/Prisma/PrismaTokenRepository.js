"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _client = require("@prisma/client");

class UserTokenRepository {
  constructor() {
    this.prisma = new _client.PrismaClient();
  }

  async findByToken(token) {
    const userToken = await this.prisma.user_tokens.findFirst({
      where: {
        token
      }
    });
    return userToken;
  }

  async generate(user_id) {
    const userToken = this.prisma.user_tokens.create({
      data: {
        user_id
      }
    });
    return userToken;
  }

}

exports.default = UserTokenRepository;