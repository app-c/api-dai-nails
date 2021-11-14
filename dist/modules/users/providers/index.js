"use strict";

var _tsyringe = require("tsyringe");

var _BCryptiHasProvider = _interopRequireDefault(require("./HashProvider/implementations/BCryptiHasProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_tsyringe.container.registerSingleton("HashProvider", _BCryptiHasProvider.default);