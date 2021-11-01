import { compare, hash } from "bcryptjs";
import IHashProvider from "../models/IHashProvider";

class BCryptHasProvider implements IHashProvider {
   public async generateHah(payload: string): Promise<string> {
      return hash(payload, 6);
   }

   public async compareHah(payload: string, hashed: string): Promise<boolean> {
      return compare(payload, hashed);
   }
}

export default BCryptHasProvider;
