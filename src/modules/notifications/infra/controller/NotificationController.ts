/* eslint-disable import/prefer-default-export */
import { NotificationService } from "@modules/notifications/services/NotificationSerivece";
import { Response, Request } from "express";
import { container } from "tsyringe";

export class NotificationController {
   public async list(req: Request, res: Response): Promise<Response> {
      const notificationRepository = container.resolve(NotificationService);

      const provider_id = req.user.id;

      const notifica = await notificationRepository.execute({ provider_id });

      return res.json(notifica);
   }
}
