import path from "path";
import IMailProvider from "@shared/container/providers/MailProvider/models/IMailProvider";
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import IPrestadorRepository from "../repositories/IPrestadorRepository";
import IPrestadorToken from "../repositories/IPrestadorToken";

interface IRequest {
   email: string;
}
@injectable()
export default class SendEmailPrestadorService {
   constructor(
      @inject("PrestadorRepository")
      private prestadorRepository: IPrestadorRepository,

      @inject("MailProvider")
      private mailProvider: IMailProvider,

      @inject("PrestadorToken")
      private prestadorToken: IPrestadorToken
   ) {}

   public async execute({ email }: IRequest): Promise<void> {
      const provider = await this.prestadorRepository.findByMail(email);

      if (!provider) {
         throw new AppError("Usuário nao existe");
      }

      const { token } = await this.prestadorToken.generate(provider.id);
      const forgotSenha = path.resolve(
         __dirname,
         "..",
         "views",
         "forgot_password.hbs"
      );

      await this.mailProvider.sendMail({
         to: {
            name: provider.nome,
            email: provider.email,
         },
         subject: "[DaisyNails] Recuperaçao de senha",
         templateData: {
            file: forgotSenha,
            variables: {
               name: provider.nome,
               token,
               link: `${process.env.APP_WEB_URL}/reset_password?token=${token}`,
            },
         },
      });
   }
}
