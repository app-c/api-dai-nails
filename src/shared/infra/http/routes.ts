import RouteAgendamento from "@modules/agendamento/infra/http/routes/routes";
import { routeNofica } from "@modules/notifications/infra/index.routes";
import RoutePrestador from "@modules/prestador/infra/routes/index.routes";
import UserRoute from "@modules/users/infra/http/routes/routesUser.routes";
import { Router } from "express";

const Route = Router();

Route.use(RouteAgendamento);
Route.use(UserRoute);
Route.use(RoutePrestador);
Route.use(routeNofica);

export default Route;
