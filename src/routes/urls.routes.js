import { Router } from "express";
import { schemaValidation } from "../middlewares/schemaValidation.js";
import { urlShortenSchema } from "../schemas/urls.schemas.js";
import { tokenValidation } from "../middlewares/tokenValidation.js";
import { deleteUrl, getShorturlById, redirect, shorten } from "../controllers/urls.controllers.js";

const urlsRouter = Router();

urlsRouter.post('/urls/shorten', tokenValidation, schemaValidation(urlShortenSchema), shorten);
urlsRouter.get('/urls/:id', getShorturlById);
urlsRouter.get('/urls/open/:shortUrl', redirect);
urlsRouter.delete('/urls/:id', tokenValidation, deleteUrl);

export default urlsRouter