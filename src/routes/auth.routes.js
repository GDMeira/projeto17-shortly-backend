import { Router } from "express";
import { signin, signup } from "../controllers/auth.controllers.js";
import { signinSchema, signupSchema } from "../schemas/auth.schemas.js";
import { schemaValidation } from "../middlewares/schemaValidation.js";

const authRouter = Router();

authRouter.post('/signup', schemaValidation(signupSchema), signup);
authRouter.post('/signin', schemaValidation(signinSchema), signin);

export default authRouter