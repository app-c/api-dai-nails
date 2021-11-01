import { Router } from "express";
import SessionController from "../controller/SessionController";

const session = Router();
const sessionController = new SessionController();

session.post("/session", sessionController.create);

export default session;
