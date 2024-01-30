import express from "express";
import { checkTransactionStatus, createToken, stkPush } from "../controllers/checkoutController.js";

const router = express.Router();

router.post("/", createToken, stkPush, checkTransactionStatus);

export default router;
