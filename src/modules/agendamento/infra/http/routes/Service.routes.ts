import midlewareAuth from "@shared/infra/http/midleWares/midlewareAuth";
import { Router } from "express";

import CreateServiçoController from "../controllers/CreateServiçoController";
import FindServicecontroller from "../controllers/FindServiceController";

const serviceRoute = Router();

const createServiceController = new CreateServiçoController();
const listController = new FindServicecontroller();

// Create Serviço
serviceRoute.post("/", midlewareAuth, createServiceController.create);

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
export default serviceRoute;
