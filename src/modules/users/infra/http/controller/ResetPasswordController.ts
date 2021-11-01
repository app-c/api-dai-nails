import { Request, Response } from "express";
import { container } from "tsyringe";
import ResetPasswordService from "@modules/users/services/ResetPasswordService";

export default class ResetPasswordController {
   public async create(req: Request, res: Response): Promise<Response> {
      try {
         const { token, senha } = req.body;

         const sendForgotPasswordEmail = container.resolve(
            ResetPasswordService
         );

         const user = await sendForgotPasswordEmail.execute({
            token,
            senha,
         });

         return res.json(user);
      } catch (err) {
         return res.json(err);
      }
   }
}
