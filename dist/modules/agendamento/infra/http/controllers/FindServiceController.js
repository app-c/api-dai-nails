"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _FindServiçoServce = _interopRequireDefault(require("../../../services/FindServi\xE7oServce"));

var _tsyringe = require("tsyringe");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ProviderController {
  async create(req, res) {
    const {
      provider_id
    } = req.params;

    const listService = _tsyringe.container.resolve(_FindServiçoServce.default);

    const services = await listService.execute({
      provider_id
    });
    return res.json(services);
  }

}

exports.default = ProviderController;