import UpdateAvatarPrestadorService from "@modules/prestador/services/UpdateAvatarPrestadorService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class UpdateAvatercontrller {
   public async update(req: Request, res: Response): Promise<Response> {
      const updatePrestador = container.resolve(UpdateAvatarPrestadorService);
      const user = await updatePrestador.execute({
         provider_id: req.user.id,
         avatarName: req.file.filename,
      });

      return res.json(user);
   }
}
