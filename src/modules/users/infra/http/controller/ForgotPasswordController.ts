import { Request, Response } from "express";
import { container } from "tsyringe";
import SendForgotPasswordEmailService from "@modules/users/services/SendForgotEmailService";

export default class ForgotPasswordController {
   public async create(req: Request, res: Response): Promise<Response> {
      const { email } = req.body;

      const sendForgotPasswordEmail = container.resolve(
         SendForgotPasswordEmailService
      );

      const user = await sendForgotPasswordEmail.execute({
         email,
      });

      return res.json(user);
   }
}
