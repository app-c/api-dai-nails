import { PrismaClient, Users } from "@prisma/client";
import IStorageProvider from "@shared/container/providers/StorageProvider/models/IStorageProviders";
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

import IUsersRepository from "../repositories/IUsersRepository";

interface IRequest {
   user_id: string;
   avatarFilename: string;
}

@injectable()
class UpdateUserAvatarService {
   private prisma = new PrismaClient();

   constructor(
      @inject("UserRepository")
      private userRepository: IUsersRepository,

      @inject("StorageProvider")
      private storageProvider: IStorageProvider
   ) {}

   public async execute({ user_id, avatarFilename }: IRequest): Promise<Users> {
      const user = await this.userRepository.findById(user_id);

      if (!user) {
         throw new AppError("usuario naos encontrado");
      }

      // if (user.avatar) {
      //    await this.storageProvider.deleteFile(user.avatar, "avatar");
      // }

      const filename = await this.storageProvider.saveFile(
         avatarFilename,
         "avatar"
      );

      user.avatar = filename;

      await this.prisma.users.update({
         where: { id: user_id },
         data: {
            avatar: filename,
         },
      });

      return user;
   }
}

export default UpdateUserAvatarService;
