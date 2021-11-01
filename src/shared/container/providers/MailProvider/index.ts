import { container } from "tsyringe";
import mailConfig from "@config/mail";
import EtherealMailProvider from "./implementations/EtherealMailProvider";
import IMailProvider from "./models/IMailProvider";
import SESMailProvider from "./implementations/SESMailProvider";

const providers = {
   ethereal: container.resolve(EtherealMailProvider),
};

container.registerInstance<IMailProvider>(
   "MailProvider",
   mailConfig.driver === "ethereal"
      ? container.resolve(EtherealMailProvider)
      : container.resolve(SESMailProvider)
);
