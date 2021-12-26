/* eslint-disable import/prefer-default-export */
import upload from "@config/upload";
import midlewareAuth from "@shared/infra/http/midleWares/midlewareAuth";
import { Router } from "express";
import multer from "multer";

import { PostController } from "../controllers/PostController";

const controller = new PostController();
const up = multer(upload);

const post = Router();
post.get("/list", controller.list);
post.use(midlewareAuth);
post.patch("/", up.single("post"), controller.create);
post.get("/list/prestador", controller.listPresetadorPost);

export { post };
