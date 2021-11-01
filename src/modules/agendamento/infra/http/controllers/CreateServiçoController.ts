import CreateServiçoService from "@modules/agendamento/services/CreateSerivçoSerice";
import UpdateServices from "@modules/agendamento/services/UpdateService";
import DeleteServicoService from "@modules/prestador/services/DeleteServicoService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class CreateServiçoController {
   public async create(req: Request, res: Response): Promise<Response> {
      try {
         const createService = container.resolve(CreateServiçoService);
         const { service, description, time, value } = req.body;
         const provider_id = req.user.id;
         const services = await createService.execute({
            provider_id,
            service,
            description,
            time,
            value,
         });

         return res.json(services);
      } catch (error) {
         return res.json(error).status(400);
      }
   }

   public async update(req: Request, res: Response): Promise<Response> {
      const updateService = container.resolve(UpdateServices);
      const { id, service, description, time, value } = req.body;
      const provider_id = req.user.id;
      const services = await updateService.execute({
         id,
         provider_id,
         service,
         description,
         time,
         value,
      });

      return res.json(services);
   }

   public async delet(re: Request, res: Response): Promise<Response> {
      try {
         const geteAgendamento = container.resolve(DeleteServicoService);

         const { id } = re.params;

         await geteAgendamento.delete(id);

         return res.status(204).send();
      } catch (error) {
         return res.json(error).status(400);
      }
   }
}
