import IUsersDTO from "@modules/users/dtos/UsersDTO";
import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import { Users, PrismaClient } from "@prisma/client";

export default class PrismaUsersRepository implements IUsersRepository {
   private prisma = new PrismaClient();

   public async findTodosUsuarios(): Promise<Users[]> {
      const find = await this.prisma.users.findMany();
      return find;
   }

   public async create(data: IUsersDTO): Promise<Users> {
      const user = await this.prisma.users.create({
         data: {
            nome: data.nome,
            email: data.email,
            senha: data.senha,
            telefone: data.telefone,
         },
      });

      return user;
   }

   public async findByEmail(email: string): Promise<Users | null> {
      const user = await this.prisma.users.findUnique({
         where: { email },
         include: { agendamento: true },
      });

      return user;
   }

   public async findById(id: string): Promise<Users | null> {
      const user = await this.prisma.users.findUnique({ where: { id } });

      return user;
   }

   public async findByNome(nome: string): Promise<Users[]> {
      const user = await this.prisma.users.findMany({
         where: {
            nome: {
               contains: nome,
            },
         },
      });

      return user;
   }
}
