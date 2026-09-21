import { Router } from "express";
import { signInController, signUpController } from "../controller/Auth.controller.js";

const router = Router();

router.post("/signup",signUpController)

router.post("/signin",signInController)


export default router;