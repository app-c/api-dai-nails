"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listPostService = void 0;

var _tsyringe = require("tsyringe");

var _IPostRepository = require("../repositories/IPostRepository");

var _dec, _dec2, _dec3, _dec4, _class;

let listPostService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("PrismaPosts")(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IPostRepository.IPostsRepository === "undefined" ? Object : _IPostRepository.IPostsRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class listPostService {
  constructor(postRespository) {
    this.postRespository = postRespository;
  }

  async execute() {
    const post = await this.postRespository.list();
    const po = post.map(h => {
      return {
        post: h.post,
        postUrl: `${process.env.AWS_URL}posts/${h.post}`,
        descricao: h.descricao
      };
    });
    return po;
  }

}) || _class) || _class) || _class) || _class);
exports.listPostService = listPostService;