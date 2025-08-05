import { userGet, userLogin, userRegister } from "../services/userData-controller.js";
import express from "express";

const routes = express.Router();

routes.post("/register",userRegister);
routes.post("/login",userLogin);
routes.post("/get",userGet);

export default routes;