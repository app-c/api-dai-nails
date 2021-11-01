import auth from "@config/auth";
import IPrestadorRepository from "@modules/prestador/repositories/IPrestadorRepository";
import { Prestador } from "@prisma/client";
import AppError from "@shared/errors/AppError";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

interface IRequest {
   email: string;
   senha: string;
}

interface IResponse {
   prestador: Prestador;
   token: string;
}

@injectable()
export default class AuthenticatePrestadorService {
   constructor(
      @inject("PrestadorRepository")
      private prestadorRepository: IPrestadorRepository
   ) {}

   public async execute({ email, senha }: IRequest): Promise<IResponse> {
      const prestador = await this.prestadorRepository.findByMail(email);

      if (!prestador) {
         throw new AppError("email incorreto");
      }

      const compareHash = await compare(senha, prestador.senha);

      if (!compareHash) {
         throw new AppError("senha incorreta");
      }

      const token = sign({}, auth.jwt.secret, {
         subject: prestador.id,
         expiresIn: auth.jwt.expiresIn,
      });

      return { prestador, token };
   }
}
