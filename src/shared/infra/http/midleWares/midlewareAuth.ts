import auth from "@config/auth";
import AppError from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface ITokenPayload {
   iat: number;
   exp: number;
   sub: string;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function midlewareAuth(
   req: Request,
   res: Response,
   next: NextFunction
) {
   const authHeader = req.headers.authorization;

   if (!authHeader) {
      throw new AppError("falta o token");
   }

   const [, token] = authHeader.split(" ");

   try {
      const decode = verify(token, auth.jwt.secret);

      const { sub } = decode as ITokenPayload;

      req.user = {
         id: sub,
      };
      return next();
   } catch (err) {
      throw new AppError("token expirou");
   }
}
