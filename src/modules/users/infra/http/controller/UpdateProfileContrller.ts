import ShowProfileService from "@modules/users/services/ShowProfleleService";
import UpdateProfileService from "@modules/users/services/UpdateProfileService";
import { classToClass } from "class-transformer";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class UpdateProfileControll {
   public async show(req: Request, res: Response): Promise<Response> {
      const user_id = req.user.id;

      const showProfile = container.resolve(ShowProfileService);

      const user = await showProfile.execute({ user_id });

      return res.json(classToClass(user));
   }

   public async update(req: Request, res: Response): Promise<Response> {
      const user_id = req.user.id;
      const { nome, email, telefone, senha, old_password } = req.body;

      const createUser = container.resolve(UpdateProfileService);

      const user = await createUser.execute({
         user_id,
         nome,
         email,
         telefone,
         old_password,
         senha,
      });

      return res.json(classToClass(user));
   }
}
