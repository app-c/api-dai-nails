/* eslint-disable import/prefer-default-export */
import { Router } from "express";

import { notifica } from "./routes/notificaRoute.routes";

const routeNofica = Router();

routeNofica.use("/notification", notifica);

export { routeNofica };
