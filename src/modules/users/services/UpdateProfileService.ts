import { Users, PrismaClient } from "@prisma/client";
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

import IHashProvider from "../providers/HashProvider/models/IHashProvider";
import IUsersRepository from "../repositories/IUsersRepository";

interface IRequest {
   user_id: string;
   nome: string;
   email: string;
   telefone: string;
   old_password?: string;
   senha?: string;
}

@injectable()
class UpdateProfileService {
   private prisma = new PrismaClient();

   constructor(
      @inject("UserRepository")
      private userRepository: IUsersRepository,

      @inject("HashProvider")
      private hashProvider: IHashProvider
   ) {}

   public async execute({
      user_id,
      nome,
      email,
      telefone,
      senha,
      old_password,
   }: IRequest): Promise<Users> {
      const user = await this.userRepository.findById(user_id);

      console.log(user);

      if (!user) {
         throw new AppError("Usuario nao existe");
      }

      const userEmail = await this.userRepository.findByEmail(email);

      if (userEmail && userEmail.id !== user_id) {
         throw new AppError("E-mail ja esta em uso");
      }

      user.nome = nome;
      user.email = email;
      user.telefone = telefone;

      if (senha && !old_password) {
         throw new AppError("voce precisa informar sua senha antiga");
      }

      if (senha && old_password) {
         const checkOld = await this.hashProvider.compareHah(
            old_password,
            user.senha
         );

         if (!checkOld) {
            throw new AppError("Senha antiga nao confere");
         }
         user.senha = await this.hashProvider.generateHah(senha);
      }

      await this.prisma.users.update({
         where: { id: user_id },
         data: {
            nome,
            email,
            telefone,
            senha,
         },
      });

      return user;
   }
}

export default UpdateProfileService;
