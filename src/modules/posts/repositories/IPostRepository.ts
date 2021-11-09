import { Posts } from ".prisma/client";

import { IPostsDtos } from "../Dtos/IPostsDtos";

export interface IPostsRepository {
   create(data: IPostsDtos): Promise<Posts>;
   delete(id: string, prestador_id: string): Promise<void>;
   list(): Promise<Posts[]>;
   listByPrestador(prestador_id: string): Promise<Posts[]>;
}
