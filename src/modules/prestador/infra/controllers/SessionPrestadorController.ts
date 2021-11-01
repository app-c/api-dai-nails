import AuthenticatePrestadorService from "@modules/prestador/services/AuthenticatePrestadorService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class SessionController {
   public async create(req: Request, res: Response): Promise<Response> {
      try {
         const { email, senha } = req.body;

         const auth = container.resolve(AuthenticatePrestadorService);

         const { prestador, token } = await auth.execute({
            email,
            senha,
         });

         return res.json({ prestador, token });
      } catch (error) {
         return res.json(error);
      }
   }
}
