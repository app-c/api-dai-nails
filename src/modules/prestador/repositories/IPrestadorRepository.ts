import { Prestador } from "@prisma/client";

import IPrestadorDTO from "../dtos/IPrestadorDTO";

export default interface IPrestadorRepository {
   create(data: IPrestadorDTO): Promise<Prestador>;
   findByMail(email: string): Promise<Prestador | null>;
   findById(id: string): Promise<Prestador | null>;
   findTodosPrestador(): Promise<Prestador[]>;
}
