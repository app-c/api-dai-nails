import { Router } from "express";
import prestadorRoute from "./prestador.routes";

const RoutePrestador = Router();

RoutePrestador.use("/prestador", prestadorRoute);

export default RoutePrestador;
