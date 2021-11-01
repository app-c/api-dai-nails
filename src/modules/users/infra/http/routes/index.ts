import { Router } from "express";
import UserRoute from "./routesUser.routes";
import session from "./session.routes";

const Route = Router();

Route.use(UserRoute);

export default Route;
