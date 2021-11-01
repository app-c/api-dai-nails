import { Router } from "express";
import agendaRoute from "./Agendamento.routes";
import bloqueioRoutes from "./BloqueioRoutes.routes";
import serviceRoute from "./Service.routes";

const RouteAgendamento = Router();

RouteAgendamento.use("/agendamento", agendaRoute);
RouteAgendamento.use("/service", serviceRoute);
RouteAgendamento.use("/", bloqueioRoutes);

export default RouteAgendamento;
