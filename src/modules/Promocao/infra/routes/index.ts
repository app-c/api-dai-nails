/* eslint-disable import/prefer-default-export */
import { Router } from "express";

import { promocao } from "./promocao";

const PromocaoRoute = Router();
PromocaoRoute.use("/promocao", promocao);

export { PromocaoRoute };
