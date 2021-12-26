import upload from "@config/upload";
import midlewareAuth from "@shared/infra/http/midleWares/midlewareAuth";
import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import multer from "multer";

import ForgotPasswordController from "../controller/ForgotPasswordController";
import ResetPasswordController from "../controller/ResetPasswordController";
import SessionController from "../controller/SessionController";
import UpdateAvatercontrller from "../controller/UpdateAvatarController";
import UpdateProfileControll from "../controller/UpdateProfileContrller";
import UserController from "../controller/UserController";

const UserRoute = Router();
const userController = new UserController();
const sessionController = new SessionController();
const updateProfile = new UpdateProfileControll();
const updateAvatercontrller = new UpdateAvatercontrller();
const resetPassword = new ResetPasswordController();
const forgot = new ForgotPasswordController();

const img = multer(upload);

UserRoute.post(
   "/user",
   celebrate({
      [Segments.BODY]: {
         nome: Joi.string().required(),
         email: Joi.string().required(),
         telefone: Joi.string().required(),
         senha: Joi.string().required().min(6),
      },
   }),
   userController.create
);

UserRoute.get("/show", userController.listUser);
UserRoute.get("/find", userController.findUser);

UserRoute.post("/session", sessionController.create);
UserRoute.get("/profile", midlewareAuth, updateProfile.show);
UserRoute.put("/profile", midlewareAuth, updateProfile.update);

UserRoute.patch(
   "/avatar",
   midlewareAuth,
   img.single("avatar"),
   updateAvatercontrller.update
);

UserRoute.post("/forgot", forgot.create);
UserRoute.post("/reset", resetPassword.create);

export default UserRoute;
