import express from "express";
import { createToken, stkPush} from "../controllers/checkoutController.js";

const router = express.Router();

router.post("/", createToken, stkPush);

export default router;