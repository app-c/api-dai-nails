import CrateUserService from "@modules/users/services/CreateUserService";
import FindUsuarioService from "@modules/users/services/FindUsuarioService";
import ShowProfileService from "@modules/users/services/ShowProfleleService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class UserController {
   public async create(req: Request, res: Response): Promise<Response> {
      const { nome, email, telefone, senha } = req.body;

      const create = container.resolve(CrateUserService);

      const user = await create.execute({
         nome,
         email,
         telefone,
         senha,
      });

      return res.json(user);
   }

   public async listUser(req: Request, res: Response): Promise<Response> {
      const { user_id } = req.params;

      const list = container.resolve(ShowProfileService);

      const listUser = list.execute({ user_id });
      return res.json(listUser);
   }

   public async findUser(req: Request, res: Response): Promise<Response> {
      try {
         const { provider_id } = req.params;
         const { nome } = req.query;

         const list = container.resolve(FindUsuarioService);

         const listUser = await list.execute({
            nome: String(nome),
            provider_id: String(provider_id),
         });
         return res.json(listUser);
      } catch (error) {
         return res.json(error).status(400);
      }
   }
}
