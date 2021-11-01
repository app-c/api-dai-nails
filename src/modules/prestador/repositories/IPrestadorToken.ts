import { provider_tokens } from "@prisma/client";

export default interface IPrestadorToken {
   generate(provider_id: string): Promise<provider_tokens>;
   findByToken(token: string): Promise<provider_tokens | null>;
}
