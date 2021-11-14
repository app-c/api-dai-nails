"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PostController = void 0;

var _listPostsPrestadorService = require("../../service/listPostsPrestadorService");

var _tsyringe = require("tsyringe");

var _createPostsService = require("../../service/createPostsService");

var _listPostsService = require("../../service/listPostsService");

/* eslint-disable @typescript-eslint/no-non-null-assertion */

/* eslint-disable import/prefer-default-export */
class PostController {
  async create(req, res) {
    const service = _tsyringe.container.resolve(_createPostsService.CreatePostsService);

    const {
      descricao
    } = req.body;
    const prestador_id = req.user.id;
    const post = req.file.filename;
    const po = await service.execute({
      descricao,
      post,
      prestador_id
    });
    return res.json(po);
  }

  async listPresetadorPost(req, res) {
    const service = _tsyringe.container.resolve(_listPostsPrestadorService.listPostPrestadorService);

    const {
      prestador_id
    } = req.query;
    const po = await service.execute({
      prestador_id: String(prestador_id)
    });
    return res.json(po);
  }

  async list(req, res) {
    const service = _tsyringe.container.resolve(_listPostsService.listPostService);

    const po = await service.execute();
    return res.json(po);
  }

}

exports.PostController = PostController;