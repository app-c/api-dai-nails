import { Reservas } from "@prisma/client";
import IReservaDTO from "../dtos/IReservaDTO";

export default interface IReservarRepository {
   create(data: IReservaDTO): Promise<Reservas>;
   findById(mes: number): Promise<Reservas[]>;
}
