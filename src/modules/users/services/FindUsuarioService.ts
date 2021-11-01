import { Users } from "@prisma/client";
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import IUsersRepository from "../repositories/IUsersRepository";

interface IRequest {
   nome: string;
   provider_id: string;
}

interface IResposta {
   id: string;
   nome: string;
   avatar: string;
}

@injectable()
export default class FindUsuarioService {
   constructor(
      @inject("UserRepository")
      private userRepository: IUsersRepository
   ) {}

   public async execute({ nome, provider_id }: IRequest): Promise<Users[]> {
      const user = await this.userRepository.findByNome(nome);

      console.log(user);
      if (!user) {
         throw new AppError("Usuario nao encontrado");
      }

      return user;
   }
}
