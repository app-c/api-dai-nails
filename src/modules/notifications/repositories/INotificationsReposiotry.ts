import { notification } from "@prisma/client";

import ICreateNotificationDTO from "../dtos/ICreateNotificationDTO";

export default interface INotification {
   create(data: ICreateNotificationDTO): Promise<notification>;
   list(): Promise<notification[]>;
   findByid(prestador_id: string): Promise<notification[] | null>;
}
