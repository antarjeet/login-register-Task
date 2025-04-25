import express from "express";
import { loginuser, profileGet, usercreate } from "../controller/userController.js";
import { validateUser, validateUserLogin } from "../validation/userVadation.js";
import authenticate from "../middleware/authentication.js";

const router = express.Router();

router.post('/register', validateUser, usercreate)

router.post('/login', validateUserLogin, loginuser)

router.get('/profile', authenticate, profileGet)

export default router