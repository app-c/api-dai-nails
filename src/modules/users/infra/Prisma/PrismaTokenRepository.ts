import IUserTokenRepository from "@modules/users/repositories/IUserTokenRepository";
import { user_tokens, PrismaClient } from "@prisma/client";

export default class UserTokenRepository implements IUserTokenRepository {
   private prisma = new PrismaClient();

   public async findByToken(token: string): Promise<user_tokens | null> {
      const userToken = await this.prisma.user_tokens.findFirst({
         where: {
            token,
         },
      });

      return userToken;
   }

   public async generate(user_id: string): Promise<user_tokens> {
      const userToken = this.prisma.user_tokens.create({
         data: {
            user_id,
         },
      });

      return userToken;
   }
}
