import IParseMailTemplateDTO from "../fakes/dtos/IParseMailTemplateDTO";

export default interface IMailTemplateProvider {
   parse(data: IParseMailTemplateDTO): Promise<string>;
}
