/* eslint-disable import/prefer-default-export */
import midlewareAuth from "@shared/infra/http/midleWares/midlewareAuth";
import { Router } from "express";

import { NotificationController } from "../controller/NotificationController";

const notifica = Router();
const notificaController = new NotificationController();

notifica.get("/find", midlewareAuth, notificaController.list);

export { notifica };
