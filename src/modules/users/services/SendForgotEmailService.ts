import path from "path";
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import IMailProvider from "@shared/container/providers/MailProvider/models/IMailProvider";
import IUsersRepository from "../repositories/IUsersRepository";
import IUserTokenRepository from "../repositories/IUserTokenRepository";

interface IRequest {
   email: string;
}

@injectable()
class SendForgotPasswordEmailService {
   constructor(
      @inject("UserRepository")
      private userRepository: IUsersRepository,

      @inject("MailProvider")
      private mailProvider: IMailProvider,

      @inject("UserToken")
      private userTokenRepository: IUserTokenRepository
   ) {}

   public async execute({ email }: IRequest): Promise<void> {
      const user = await this.userRepository.findByEmail(email);

      if (!user) {
         throw new AppError("Usuario nao existe");
      }

      const { token } = await this.userTokenRepository.generate(user.id);

      const forgotPassword = path.resolve(
         __dirname,
         "..",
         "views",
         "forgot_password.hbs"
      );

      await this.mailProvider.sendMail({
         to: {
            name: user.nome,
            email: user.email,
         },
         subject: "[DaisyNails] Recuperaçao de senha",
         templateData: {
            file: forgotPassword,
            variables: {
               name: user.nome,
               token,
               link: `${process.env.APP_WEB_URL}/reset_password?token=${token}`,
            },
         },
      });
   }
}

export default SendForgotPasswordEmailService;
