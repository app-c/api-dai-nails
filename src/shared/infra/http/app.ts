/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-var-requires */
import "reflect-metadata";
import "express-async-errors";
// import "@shared/infra/typeorm";
import "@shared/container";

import upload from "@config/upload";
import AppError from "@shared/errors/AppError";
import { errors } from "celebrate";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import http from "http";
import socketio from "socket.io";

import rateLimiter from "./midleWares/rateLimit";
import Route from "./routes";

const app = express();
const server = http.createServer(app);
const io = socketio(server);

export const clients: Array<any> = [];

io.on("connection", (client: any) => {
   console.log(`conectado ${client.id}`);
});

app.use((req, res, nex) => {
   req.io = io;
   nex();
});

app.use(rateLimiter);
app.use(cors());
app.use(express.json());
app.use("/file", express.static(upload.UploadFolder));

app.use(Route);
app.use(errors());

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
   if (err instanceof AppError) {
      return response.status(err.statusCode).json({
         status: "error",
         message: err.message,
      });
   }

   console.log(err);

   return response.status(500).json({
      status: "error",
      message: "Interal server error",
   });
});

server.listen(3333, () => console.log("Server is Ok"));

export default app;
