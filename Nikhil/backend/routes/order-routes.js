import express from "express";
import { createOrder, generateOrderNumber } from "../services/order-controller.js";

const router = express.Router();

router.post("/generate-number",generateOrderNumber);
router.post("/create",createOrder);

export default router;