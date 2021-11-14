"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class FakeHashProvider {
  async generateHah(payload) {
    return payload;
  }

  async compareHah(payload, hashed) {
    return payload === hashed;
  }

}

var _default = FakeHashProvider;
exports.default = _default;