import upload from "@config/upload";
import aws, { S3 } from "aws-sdk";
import fs from "fs";
import mime from "mime";
import path from "path";

import IStorageProvider from "../models/IStorageProviders";

class S3StoreageProvider implements IStorageProvider {
   private client: S3;

   constructor() {
      this.client = new aws.S3({
         region: "us-east-2",
      });
   }

   public async saveFile(file: string): Promise<string> {
      const originalPah = path.resolve(upload.tmpFolder, file);

      const ContentType = mime.getType(originalPah);

      if (!ContentType) {
         throw new Error("erro");
      }

      const fileContent = await fs.promises.readFile(originalPah);

      this.client
         .putObject({
            Bucket: "dai-nails",
            Key: file,
            ACL: "public-read",
            Body: fileContent,
            ContentType,
         })
         .promise();

      return file;
   }

   public async deleteFile(file: string): Promise<void> {
      await this.client
         .deleteObject({
            Bucket: upload.config.aws.bucket,
            Key: file,
         })
         .promise();
   }
}

export default S3StoreageProvider;
