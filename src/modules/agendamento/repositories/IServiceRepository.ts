import { Services } from "@prisma/client";
import { IServiceDTO } from "../dtos/IServiceDTO";

export default interface IServiceRepository {
   create(data: IServiceDTO): Promise<Services>;

   findUniqService(
      provider_id: string,
      service: string
   ): Promise<Services | null>;

   findById(id: string): Promise<Services | null>;

   listService(provider_id: string): Promise<Services[]>;

   delete(id: string): Promise<void>;
}
