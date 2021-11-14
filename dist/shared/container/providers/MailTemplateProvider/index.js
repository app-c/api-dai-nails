"use strict";

var _tsyringe = require("tsyringe");

var _HandleBaars = _interopRequireDefault(require("./implementations/HandleBaars"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const providers = {
  handlebars: _HandleBaars.default
};

_tsyringe.container.registerSingleton("MailTemplate", providers.handlebars);