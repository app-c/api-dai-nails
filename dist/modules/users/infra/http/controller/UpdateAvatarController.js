"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _UpdateUserAvatarServices = _interopRequireDefault(require("../../../services/UpdateUserAvatarServices"));

var _tsyringe = require("tsyringe");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UpdateAvatercontrller {
  async update(req, res) {
    const updateUserAvatar = _tsyringe.container.resolve(_UpdateUserAvatarServices.default);

    const user = await updateUserAvatar.execute({
      user_id: req.user.id,
      avatarFilename: req.file.filename
    });
    return res.json(user);
  }

}

exports.default = UpdateAvatercontrller;