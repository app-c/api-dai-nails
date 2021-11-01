import { Prestador, Users } from "@prisma/client";
import IUsersDTO from "../dtos/UsersDTO";

export default interface IUsersRepository {
   create(data: IUsersDTO): Promise<Users>;
   findByEmail(email: string): Promise<Users | null>;
   findById(id: string): Promise<Users | null>;
   findByNome(nome: string): Promise<Users[]>;
   findTodosUsuarios(): Promise<Users[]>;
}
