import { Promocao } from ".prisma/client";

import { IPromocaoDtos } from "../Dtos/IPromocaoDtos";

export interface IPromocaoRepository {
   create(data: IPromocaoDtos): Promise<Promocao>;
   delete(id: string, prestador_id: string): Promise<void>;
   list(prestador_id: string): Promise<Promocao[]>;
}
