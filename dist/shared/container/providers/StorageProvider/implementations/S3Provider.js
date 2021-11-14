"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _upload = _interopRequireDefault(require("../../../../../config/upload"));

var _awsSdk = _interopRequireDefault(require("aws-sdk"));

var _fs = _interopRequireDefault(require("fs"));

var _mime = _interopRequireDefault(require("mime"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class S3StoreageProvider {
  constructor() {
    this.client = void 0;
    this.client = new _awsSdk.default.S3({
      region: "us-east-2"
    });
  }

  async saveFile(file, folder) {
    const originalPah = _path.default.resolve(_upload.default.tmpFolder, file);

    const fileContent = await _fs.default.promises.readFile(originalPah);

    const ContentType = _mime.default.getType(originalPah);

    if (!ContentType) {
      throw new Error("erro");
    }

    this.client.putObject({
      Bucket: `${process.env.AWS_BUCKET}/${folder}`,
      Key: file,
      ACL: "public-read",
      Body: fileContent,
      ContentType
    }).promise();
    await _fs.default.promises.unlink(originalPah);
    return file;
  }

  async deleteFile(file, folder) {
    await this.client.deleteObject({
      Bucket: `${process.env.AWS_BUCKET}/${folder}`,
      Key: file
    }).promise();
  }

}

var _default = S3StoreageProvider;
exports.default = _default;