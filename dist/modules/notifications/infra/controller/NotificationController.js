"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NotificationController = void 0;

var _NotificationSerivece = require("../../services/NotificationSerivece");

var _tsyringe = require("tsyringe");

/* eslint-disable import/prefer-default-export */
class NotificationController {
  async list(req, res) {
    const notificationRepository = _tsyringe.container.resolve(_NotificationSerivece.NotificationService);

    const provider_id = req.user.id;
    const notifica = await notificationRepository.execute({
      provider_id
    });
    return res.json(notifica);
  }

}

exports.NotificationController = NotificationController;