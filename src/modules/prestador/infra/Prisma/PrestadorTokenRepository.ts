import IPrestadorToken from "@modules/prestador/repositories/IPrestadorToken";
import { provider_tokens, PrismaClient } from "@prisma/client";

export default class UserTokenRepository implements IPrestadorToken {
   private prisma = new PrismaClient();

   public async findByToken(token: string): Promise<provider_tokens | null> {
      const userToken = await this.prisma.provider_tokens.findFirst({
         where: {
            token,
         },
      });

      return userToken;
   }

   public async generate(provider_id: string): Promise<provider_tokens> {
      const userToken = this.prisma.provider_tokens.create({
         data: {
            provider_id,
         },
      });

      return userToken;
   }
}
