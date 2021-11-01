import IPrestadorDTO from "@modules/prestador/dtos/IPrestadorDTO";
import IPrestadorRepository from "@modules/prestador/repositories/IPrestadorRepository";
import { Prestador, PrismaClient } from "@prisma/client";

export default class PrestadorRepository implements IPrestadorRepository {
   private prisma = new PrismaClient();

   public async create(data: IPrestadorDTO): Promise<Prestador> {
      const prestador = await this.prisma.prestador.create({
         data: {
            nome: data.nome,
            email: data.email,
            telefone: data.telefone,
            senha: data.senha,
            funcao: data.funcao,
            work_init: data.work_init,
            work_and: data.work_and,
         },
      });

      return prestador;
   }

   public async findByMail(email?: string): Promise<Prestador | null> {
      const prestadorMail = await this.prisma.prestador.findUnique({
         where: { email },
         include: {
            services: true,
            agendamento: true,
         },
      });

      return prestadorMail;
   }

   public async findById(id: string): Promise<Prestador | null> {
      const prestadorId = await this.prisma.prestador.findUnique({
         where: { id },
         include: { services: true, agendamento: true },
      });

      return prestadorId;
   }

   public async findTodosPrestador(): Promise<Prestador[]> {
      const prestador = await this.prisma.prestador.findMany();

      return prestador;
   }
}
