import ICreateNotificationDTO from "@modules/notifications/dtos/ICreateNotificationDTO";
import INotificationRepository from "@modules/notifications/repositories/INotificationsReposiotry";
import { PrismaClient, notification } from "@prisma/client";

export default class NotificationsRepository
   implements INotificationRepository {
   private prisma = new PrismaClient();

   public async create({
      content,
      recipient_id,
   }: ICreateNotificationDTO): Promise<notification> {
      const notifica = await this.prisma.notification.create({
         data: {
            content,
            recipient_id,
         },
      });

      return notifica;
   }

   public async list(): Promise<notification[]> {
      const notifica = await this.prisma.notification.findMany();

      return notifica;
   }

   public async findByid(provider_id: string): Promise<notification[] | null> {
      const find = await this.prisma.notification.findMany({
         where: { recipient_id: provider_id },
      });

      return find;
   }
}
