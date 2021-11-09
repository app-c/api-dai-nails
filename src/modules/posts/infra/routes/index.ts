/* eslint-disable import/prefer-default-export */
import { Router } from "express";

import { post } from "./post";

const PostRoute = Router();
PostRoute.use("/post", post);

export { PostRoute };
