import DeleteAgendamentoService from "@modules/agendamento/services/DeletAgendamentoService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class DeleteAgendamentoContrller {
   public async delet(re: Request, res: Response): Promise<Response> {
      const geteAgendamento = container.resolve(DeleteAgendamentoService);

      const { id } = re.params;

      re.io.emit("delet", id);

      await geteAgendamento.delete(id);

      return res.status(204).send();
   }
}
