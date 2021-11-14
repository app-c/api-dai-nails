"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _midlewareAuth = _interopRequireDefault(require("../../../../../shared/infra/http/midleWares/midlewareAuth"));

var _celebrate = require("celebrate");

var _express = require("express");

var _AgendamentoController = _interopRequireDefault(require("../controllers/AgendamentoController"));

var _CreateServiçoController = _interopRequireDefault(require("../controllers/CreateServi\xE7oController"));

var _DeleteAgendamentoController = _interopRequireDefault(require("../controllers/DeleteAgendamentoController"));

var _FindServiceController = _interopRequireDefault(require("../controllers/FindServiceController"));

var _FindTodosAgendamenosController = _interopRequireDefault(require("../controllers/FindTodosAgendamenosController"));

var _FindTodosAgendamentoProviderController = _interopRequireDefault(require("../controllers/FindTodosAgendamentoProviderController"));

var _FindTodosAgendamentoUsersController = _interopRequireDefault(require("../controllers/FindTodosAgendamentoUsersController"));

var _FindTodosPrestadoresController = _interopRequireDefault(require("../controllers/FindTodosPrestadoresController"));

var _ListHorariosDisponivelController = _interopRequireDefault(require("../controllers/ListHorariosDisponivelController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const agendaRoute = (0, _express.Router)();
const agendamentocontroller = new _AgendamentoController.default();
const lisstHorariosControllr = new _ListHorariosDisponivelController.default();
const listarAgentadamento = new _FindTodosAgendamenosController.default();
const listUsersController = new _FindTodosAgendamentoUsersController.default();
const listPrestadorController = new _FindTodosAgendamentoProviderController.default();
const listTodosPrestadores = new _FindTodosPrestadoresController.default();
const deleteAgendamentoControler = new _DeleteAgendamentoController.default();
agendaRoute.use(_midlewareAuth.default); // Criar um agendamento

agendaRoute.post("/", (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    provider_id: _celebrate.Joi.string().required(),
    // user_id: Joi.string().required(),
    service: _celebrate.Joi.string().required(),
    from: _celebrate.Joi.string().required(),
    dia: _celebrate.Joi.number().required(),
    mes: _celebrate.Joi.number().required(),
    ano: _celebrate.Joi.number().required()
  }
}), agendamentocontroller.create); // Listar todos agendamentos

agendaRoute.get("/", listarAgentadamento.list); // Listar todos agendamentos do usuario

agendaRoute.get("/me", listUsersController.list); // LIstar todos agendamentos do prestador

agendaRoute.get("/me/prestador", listPrestadorController.list);
agendaRoute.get("/me/prestador/list", listTodosPrestadores.list); // Listar os horarios disponiveis

agendaRoute.get("/h/horarios", lisstHorariosControllr.list);
agendaRoute.delete("/:id/agendamento", deleteAgendamentoControler.delet);
const serviceRoute = (0, _express.Router)();
const createServiceController = new _CreateServiçoController.default();
const listController = new _FindServiceController.default(); // Create Serviço

serviceRoute.post("/service", _midlewareAuth.default, createServiceController.create);
serviceRoute.patch("/service/update", _midlewareAuth.default, createServiceController.update);
serviceRoute.delete("/service/:id/delet", _midlewareAuth.default, createServiceController.delet);
serviceRoute.get("/:provider_id/list", _midlewareAuth.default, listController.create);
var _default = agendaRoute;
exports.default = _default;