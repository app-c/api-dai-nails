import CreatePrestadorService from "@modules/prestador/services/CreatePrestadorService";
import CreateTokenService from "@modules/prestador/services/CreateTokenService";
import ShowProfilePrestadorService from "@modules/prestador/services/ShowProfileService";
import UpdateProfilePrestadorService from "@modules/prestador/services/UpdateProfilePrestadorService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class PrestadorController {
   public async create(req: Request, res: Response): Promise<Response> {
      try {
         const {
            nome,
            email,
            telefone,
            senha,
            work_init,
            work_and,
            funcao,
         } = req.body;

         const create = container.resolve(CreatePrestadorService);

         const prestador = await create.execute({
            nome,
            email,
            telefone,
            senha,
            work_init,
            work_and,
            funcao,
         });

         return res.json(prestador);
      } catch (error) {
         return res.json(error).status(400);
      }
   }

   public async update(req: Request, res: Response): Promise<Response> {
      const {
         nome,
         email,
         telefone,
         senha,
         work_init,
         work_and,
         funcao,
         old_senha,
      } = req.body;

      const prestador_id = req.user.id;

      const create = container.resolve(UpdateProfilePrestadorService);

      const prestador = await create.execute({
         prestador_id,
         nome,
         email,
         telefone,
         senha,
         work_init,
         work_and,
         funcao,
         old_senha,
      });

      return res.status(200).json(prestador);
   }

   public async updateToken(req: Request, res: Response): Promise<Response> {
      const { token } = req.body;

      const provider_id = req.user.id;

      const create = container.resolve(CreateTokenService);

      const prestador = await create.execute({
         provider_id,
         token,
      });

      return res.status(200).json(prestador);
   }

   public async show(req: Request, res: Response): Promise<Response> {
      const { provider_id } = req.query;

      const create = container.resolve(ShowProfilePrestadorService);

      const prestador = await create.execute({
         provider_id: String(provider_id),
      });

      return res.json(prestador);
   }
}
