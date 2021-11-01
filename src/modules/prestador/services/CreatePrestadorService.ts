import IPrestadorRepository from "@modules/prestador/repositories/IPrestadorRepository";
import { Prestador } from "@prisma/client";
import AppError from "@shared/errors/AppError";
import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import IPrestadorDTO from "../dtos/IPrestadorDTO";

@injectable()
class CreatePrestadorService {
   constructor(
      @inject("PrestadorRepository")
      private prestadorRepository: IPrestadorRepository
   ) {}

   public async execute({
      nome,
      email,
      telefone,
      senha,
      work_init,
      work_and,
      funcao,
   }: IPrestadorDTO): Promise<Prestador> {
      const findPrestador = await this.prestadorRepository.findByMail(email);

      if (findPrestador) {
         throw new AppError("prestador ja cadastrodo");
      }

      const senhaHash = await hash(senha, 8);

      const prestador = await this.prestadorRepository.create({
         nome,
         email,
         telefone,
         senha: senhaHash,
         work_init,
         work_and,
         funcao,
      });

      return prestador;
   }
}

export default CreatePrestadorService;
