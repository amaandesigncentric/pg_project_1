import express from "express";
import { getAccessoryData, getAllBottles, getAllPlasticCap, getAlluminiumCap, getPumpData } from "../services/general-controller.js";

const routes = express.Router();

routes.get("/pumpdata",getPumpData);
routes.get("/plasticCapData",getAllPlasticCap);
routes.get("/alluminiumCapData",getAlluminiumCap);
routes.get("/bottledata",getAllBottles);
routes.get("/accessoriesData",getAccessoryData);

export default routes;