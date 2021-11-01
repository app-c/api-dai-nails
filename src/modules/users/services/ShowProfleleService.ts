import { Users } from "@prisma/client";
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import IUsersRepository from "../repositories/IUsersRepository";

interface IRequest {
   user_id: string;
}

@injectable()
export default class ShowProfileService {
   constructor(
      @inject("UserRepository")
      private userRepository: IUsersRepository
   ) {}

   public async execute({ user_id }: IRequest): Promise<Users> {
      const user = await this.userRepository.findById(user_id);

      if (!user) {
         throw new AppError("Usuario nao existe");
      }

      return user;
   }
}
