import { Router } from "express";
import { signin, signup, userInfo } from "../controllers/auth.controllers.js";
import { signinSchema, signupSchema } from "../schemas/auth.schemas.js";
import { schemaValidation } from "../middlewares/schemaValidation.js";
import { tokenValidation } from "../middlewares/tokenValidation.js";

const authRouter = Router();

authRouter.post('/signup', schemaValidation(signupSchema), signup);
authRouter.post('/signin', schemaValidation(signinSchema), signin);
authRouter.get('/users/me', userInfo);

export default authRouter