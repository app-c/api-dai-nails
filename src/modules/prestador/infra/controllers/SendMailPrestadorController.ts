import SendEmailPrestadorService from "@modules/prestador/services/SendEmailPrestadorService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class ForgotPasswordController {
   public async create(req: Request, res: Response): Promise<Response> {
      const { email } = req.body;

      const sendForgotPasswordEmail = container.resolve(
         SendEmailPrestadorService
      );

      const user = await sendForgotPasswordEmail.execute({
         email,
      });

      return res.json(user);
   }
}
