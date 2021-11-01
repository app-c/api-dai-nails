import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { isAfter, addHours } from "date-fns";
import { PrismaClient } from "@prisma/client";
import IUsersRepository from "../repositories/IUsersRepository";
import IUserTokenRepository from "../repositories/IUserTokenRepository";
import IHashProvider from "../providers/HashProvider/models/IHashProvider";

interface IRequest {
   token: string;
   senha: string;
}

@injectable()
class ResetPasswordService {
   private prisma = new PrismaClient();

   constructor(
      @inject("UserRepository")
      private userRepository: IUsersRepository,

      @inject("UserToken")
      private userTokenRepository: IUserTokenRepository,

      @inject("HashProvider")
      private hashProvider: IHashProvider
   ) {}

   public async execute({ token, senha }: IRequest): Promise<void> {
      const usertoken = await this.userTokenRepository.findByToken(token);

      if (!usertoken) {
         throw new AppError("token do usuario nao existe");
      }

      const user = await this.userRepository.findById(usertoken.user_id);

      if (!user) {
         throw new AppError("usuario nao existe");
      }

      const tokenCreateAt = usertoken.created_at;
      const compareDate = addHours(tokenCreateAt, 2);

      if (isAfter(Date.now(), compareDate)) {
         throw new AppError("Token expirado");
      }

      const hash = await this.hashProvider.generateHah(senha);

      await this.prisma.users.update({
         where: { id: user.id },
         data: {
            senha: hash,
         },
      });
   }
}

export default ResetPasswordService;
