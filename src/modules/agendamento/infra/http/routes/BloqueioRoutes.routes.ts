import midlewareAuth from "@shared/infra/http/midleWares/midlewareAuth";
import { Router } from "express";
import Bloqueiocontroller from "../controllers/BloqueioConroller";

const bloqueioRoutes = Router();

const createServiceController = new Bloqueiocontroller();
bloqueioRoutes.post(
   "/service/bloqueio",
   midlewareAuth,
   createServiceController.create
);

export default bloqueioRoutes;
