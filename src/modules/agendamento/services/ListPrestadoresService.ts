import { Prestador } from "@prisma/client";
import IPrestadorRepository from "@modules/prestador/repositories/IPrestadorRepository";
import ICacheProvider from "@shared/container/providers/CashProvider/models/ICachProvider";
import { inject, injectable } from "tsyringe";

interface IRequest {
   user_id: string;
}
@injectable()
export default class ListPrestadoresService {
   constructor(
      @inject("PrestadorRepository")
      private prestadorRepository: IPrestadorRepository,

      @inject("CacheProvider")
      private cacheProvider: ICacheProvider
   ) {}

   public async execute(): Promise<Prestador[]> {
      // let users = await this.cacheProvider.recover<Prestador[]>(
      //    `providers-list:${user_id}`
      // );

      // if (!users) {
      //    users = await this.prestadorRepository.findTodosPrestador();

      //    await this.cacheProvider.save(`providers-list:${user_id},`, users);
      // }

      const users = await this.prestadorRepository.findTodosPrestador();

      return users;
   }
}
