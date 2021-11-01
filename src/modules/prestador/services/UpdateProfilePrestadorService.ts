import AppError from "@shared/errors/AppError";
import { Prestador, PrismaClient } from "@prisma/client";
import { inject, injectable } from "tsyringe";
import IHashProvider from "@modules/users/providers/HashProvider/models/IHashProvider";
import IPrestadorRepository from "../repositories/IPrestadorRepository";

interface IRequest {
   prestador_id: string;
   nome: string;
   email: string;
   telefone: string;
   work_init: string;
   work_and: string;
   funcao: string;
   senha: string;
   old_senha?: string;
}
@injectable()
export default class UpdatePretadorService {
   private prisma = new PrismaClient();

   constructor(
      @inject("PrestadorRepository")
      private prestadorRepository: IPrestadorRepository,

      @inject("HashProvider")
      private hashProvider: IHashProvider
   ) {}

   public async execute({
      prestador_id,
      nome,
      email,
      telefone,
      senha,
      work_init,
      work_and,
      funcao,
      old_senha,
   }: IRequest): Promise<Prestador> {
      const prestador = await this.prestadorRepository.findById(prestador_id);

      if (!prestador) {
         throw new AppError("prestador nao encontrado");
      }

      const prestadorMail = await this.prestadorRepository.findByMail(email);

      if (prestadorMail && prestadorMail.id !== prestador.id) {
         throw new AppError("email ja cadastrado");
      }

      prestador.nome = nome;
      prestador.email = email;
      prestador.telefone = telefone;
      prestador.funcao = funcao;
      prestador.work_init = work_init;
      prestador.work_and = work_and;

      if (senha && !old_senha) {
         throw new AppError("você precisa informar a senha antiga");
      }

      if (senha && old_senha) {
         const checkOld = await this.hashProvider.compareHah(
            old_senha,
            prestador.senha
         );

         if (!checkOld) {
            throw new AppError("Senha antiga nao confere");
         }

         prestador.senha = await this.hashProvider.generateHah(senha);
      }

      await this.prisma.prestador.update({
         where: { id: prestador.id },
         data: {
            nome,
            email,
            telefone,
            funcao,
            work_init,
            work_and,
         },
      });

      return prestador;
   }
}
