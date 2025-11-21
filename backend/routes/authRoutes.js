import express from 'express';
import {login, logOut,  registration, googleLogin , adminLogin} from '../controller/authController.js';

const authRoutes = express.Router();

authRoutes.post("/registration", registration);
authRoutes.post("/login", login);
authRoutes.get("/logout", logOut);
authRoutes.post("/googleLogin", googleLogin);
authRoutes.post("/adminlogin", adminLogin);


export default authRoutes;
