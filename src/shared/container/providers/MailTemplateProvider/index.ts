import { container } from "tsyringe";
import HandleBars from "./implementations/HandleBaars";
import IMailTemplateProvider from "./models/IMailTemplateProvider";

const providers = {
   handlebars: HandleBars,
};

container.registerSingleton<IMailTemplateProvider>(
   "MailTemplate",
   providers.handlebars
);
