import { loginService, registerService } from "../service/Auth.service.js";

export async function signInController (req,res) {
    return loginService(req,res);
}

export async function signUpController (req,res) {
    return registerService(req,res);
}