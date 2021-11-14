"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _UpdateAvatarPrestadorService = _interopRequireDefault(require("../../services/UpdateAvatarPrestadorService"));

var _tsyringe = require("tsyringe");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UpdateAvatercontrller {
  async update(req, res) {
    const updatePrestador = _tsyringe.container.resolve(_UpdateAvatarPrestadorService.default);

    const user = await updatePrestador.execute({
      provider_id: req.user.id,
      avatarName: req.file.filename
    });
    return res.json(user);
  }

}

exports.default = UpdateAvatercontrller;