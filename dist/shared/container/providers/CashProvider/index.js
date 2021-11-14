"use strict";

var _tsyringe = require("tsyringe");

var _RedisCachProvider = _interopRequireDefault(require("./implementations/RedisCachProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const providers = {
  redis: _RedisCachProvider.default
};

_tsyringe.container.registerSingleton("CacheProvider", providers.redis);