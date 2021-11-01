import { bloqueio } from "@prisma/client";

export default interface IBloqueioRepository {
   create(
      provider_id: string,
      from: string,
      at: string,
      dia: number,
      mes: number
   ): Promise<bloqueio>;

   findBloqueio(
      provider_id: string,
      dia: number,
      mes: number
   ): Promise<bloqueio[]>;
}
