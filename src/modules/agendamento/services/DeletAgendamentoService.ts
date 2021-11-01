import { inject, injectable } from "tsyringe";
import { IAgendamentoRepository } from "../repositories/IAgendamentoRespository";

@injectable()
export default class DeleteAgendamentoService {
   constructor(
      @inject("AgendamentoRepository")
      private agendamentoRepository: IAgendamentoRepository
   ) {}

   public async delete(id: string): Promise<void> {
      const find = await this.agendamentoRepository.delete(id);

      return find;
   }
}
