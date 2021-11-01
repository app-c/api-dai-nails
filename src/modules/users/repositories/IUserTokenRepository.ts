import { user_tokens } from "@prisma/client";

export default interface IUserTokenRepository {
   generate(user_id: string): Promise<user_tokens>;
   findByToken(token: string): Promise<user_tokens | null>;
}
