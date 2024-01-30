import express from "express";
import { verifyUser } from "../utils/verifyToken.js";
import { cancelReservation, createReservation, getAllReservations, getReservation, updateReservation } from "../controllers/reserveController.js";

const router = express.Router();

//CREATE
router.post("/", createReservation);

//UPDATE
router.put("/:id", updateReservation);

//CANCEL RESERVATION
router.put("/cancel/:id", cancelReservation);

//GET
router.get("/find/:id", getReservation);

//GET ALL
router.get("/", getAllReservations);

export default router;
