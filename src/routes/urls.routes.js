import { Router } from "express";
import { schemaValidation } from "../middlewares/schemaValidation.js";
import { urlShortenSchema } from "../schemas/urls.schemas.js";
import { tokenValidation } from "../middlewares/tokenValidation.js";
import { shorten } from "../controllers/urls.controllers.js";

const urlsRouter = Router();

urlsRouter.post('/urls/shorten', tokenValidation, schemaValidation(urlShortenSchema), shorten);

export default urlsRouter