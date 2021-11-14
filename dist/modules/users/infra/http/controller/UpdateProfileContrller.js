"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ShowProfleleService = _interopRequireDefault(require("../../../services/ShowProfleleService"));

var _UpdateProfileService = _interopRequireDefault(require("../../../services/UpdateProfileService"));

var _classTransformer = require("class-transformer");

var _tsyringe = require("tsyringe");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UpdateProfileControll {
  async show(req, res) {
    const user_id = req.user.id;

    const showProfile = _tsyringe.container.resolve(_ShowProfleleService.default);

    const user = await showProfile.execute({
      user_id
    });
    return res.json((0, _classTransformer.classToClass)(user));
  }

  async update(req, res) {
    const user_id = req.user.id;
    const {
      nome,
      email,
      telefone,
      senha,
      old_password
    } = req.body;

    const createUser = _tsyringe.container.resolve(_UpdateProfileService.default);

    const user = await createUser.execute({
      user_id,
      nome,
      email,
      telefone,
      old_password,
      senha
    });
    return res.json((0, _classTransformer.classToClass)(user));
  }

}

exports.default = UpdateProfileControll;