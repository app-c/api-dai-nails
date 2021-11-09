/* eslint-disable import/prefer-default-export */
import upload from "@config/upload";
import midlewareAuth from "@shared/infra/http/midleWares/midlewareAuth";
import { Router } from "express";
import multer from "multer";

import { PromocaoController } from "../controllers/PromocaoController";

const controller = new PromocaoController();
const up = multer(upload.multer);

const promocao = Router();
promocao.use(midlewareAuth);
promocao.patch("/", up.single("image"), controller.create);
promocao.get("/list", controller.list);

export { promocao };
