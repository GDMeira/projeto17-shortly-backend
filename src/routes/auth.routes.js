import { Router } from "express";
import { signup } from "../controllers/auth.controllers.js";
import { signupSchema } from "../schemas/auth.schemas.js";
import { schemaValidation } from "../middlewares/schemaValidation.js";

const authRouter = Router();

authRouter.post('/signup', schemaValidation(signupSchema), signup);

export default authRouter