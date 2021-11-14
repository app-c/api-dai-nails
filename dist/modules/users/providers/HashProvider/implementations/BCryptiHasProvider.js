"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bcryptjs = require("bcryptjs");

class BCryptHasProvider {
  async generateHah(payload) {
    return (0, _bcryptjs.hash)(payload, 6);
  }

  async compareHah(payload, hashed) {
    return (0, _bcryptjs.compare)(payload, hashed);
  }

}

var _default = BCryptHasProvider;
exports.default = _default;