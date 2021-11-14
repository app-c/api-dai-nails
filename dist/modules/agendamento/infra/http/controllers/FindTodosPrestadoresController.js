"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ListPrestadoresService = _interopRequireDefault(require("../../../services/ListPrestadoresService"));

var _tsyringe = require("tsyringe");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FindTodosPrestadoresController {
  async list(req, res) {
    try {
      const listHorarios = _tsyringe.container.resolve(_ListPrestadoresService.default);

      const list = await listHorarios.execute();
      return res.json(list);
    } catch (err) {
      return res.json(err.message).status(400);
    }
  }

}

exports.default = FindTodosPrestadoresController;