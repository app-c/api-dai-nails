import IServiceRepository from "@modules/agendamento/repositories/IServiceRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export default class DeleteAgendamentoService {
   constructor(
      @inject("ServiceRepository")
      private serviceRepository: IServiceRepository
   ) {}

   public async delete(id: string): Promise<void> {
      const find = await this.serviceRepository.delete(id);

      return find;
   }
}
