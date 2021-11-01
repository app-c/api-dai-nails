import { Services } from "@prisma/client";
import { inject, injectable } from "tsyringe";
import IServiceRepository from "../repositories/IServiceRepository";

interface IRequest {
   provider_id: string;
}
@injectable()
export default class FindServiçoService {
   constructor(
      @inject("ServiceRepository")
      private serviceRepository: IServiceRepository
   ) {}

   public async execute({ provider_id }: IRequest): Promise<Services[]> {
      const find = await this.serviceRepository.listService(provider_id);

      return find;
   }
}
