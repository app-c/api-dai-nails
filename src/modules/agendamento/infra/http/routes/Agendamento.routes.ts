import midlewareAuth from "@shared/infra/http/midleWares/midlewareAuth";
import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";

import AgendamentoController from "../controllers/AgendamentoController";
import CreateServiçoController from "../controllers/CreateServiçoController";
import DeleteAgendamentoContrller from "../controllers/DeleteAgendamentoController";
import FindServicecontroller from "../controllers/FindServiceController";
import FindTodosAgendamentos from "../controllers/FindTodosAgendamenosController";
import FindTodosAgendamentosPrestadorController from "../controllers/FindTodosAgendamentoProviderController";
import FindTodosAgendamentosUserController from "../controllers/FindTodosAgendamentoUsersController";
import FindTodosPrestadoreController from "../controllers/FindTodosPrestadoresController";
import ListHorariosDisponivelController from "../controllers/ListHorariosDisponivelController";

const agendaRoute = Router();

const agendamentocontroller = new AgendamentoController();
const lisstHorariosControllr = new ListHorariosDisponivelController();
const listarAgentadamento = new FindTodosAgendamentos();
const listUsersController = new FindTodosAgendamentosUserController();
const listPrestadorController = new FindTodosAgendamentosPrestadorController();
const listTodosPrestadores = new FindTodosPrestadoreController();
const deleteAgendamentoControler = new DeleteAgendamentoContrller();

agendaRoute.use(midlewareAuth);

// Criar um agendamento
agendaRoute.post(
   "/",
   celebrate({
      [Segments.BODY]: {
         provider_id: Joi.string().required(),
         user_id: Joi.string().required(),
         service: Joi.string().required(),
         from: Joi.string().required(),
         dia: Joi.number().required(),
         mes: Joi.number().required(),
         ano: Joi.number().required(),
      },
   }),
   agendamentocontroller.create
);

// Listar todos agendamentos
agendaRoute.get("/", listarAgentadamento.list);

// Listar todos agendamentos do usuario
agendaRoute.get("/me", listUsersController.list);

// LIstar todos agendamentos do prestador
agendaRoute.get("/me/prestador", listPrestadorController.list);

agendaRoute.get("/me/prestador/list", listTodosPrestadores.list);

// Listar os horarios disponiveis
agendaRoute.get("/h/horarios", lisstHorariosControllr.list);

agendaRoute.delete("/:id/agendamento", deleteAgendamentoControler.delet);

const serviceRoute = Router();

const createServiceController = new CreateServiçoController();
const listController = new FindServicecontroller();

// Create Serviço
serviceRoute.post("/service", midlewareAuth, createServiceController.create);

serviceRoute.patch(
   "/service/update",
   midlewareAuth,
   createServiceController.update
);

serviceRoute.delete(
   "/service/:id/delet",
   midlewareAuth,
   createServiceController.delet
);

serviceRoute.get("/:provider_id/list", midlewareAuth, listController.create);

export default agendaRoute;
