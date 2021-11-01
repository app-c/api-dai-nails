export default interface IHashProvider {
   generateHah(payload: string): Promise<string>;
   compareHah(payload: string, hashed: string): Promise<boolean>;
}
