import express from "express";
import {
  createRoom,
  deleteRoom,
  getAllRooms,
  getRoom,
  updateRoom,
  updateRoomAvailability,
} from "../controllers/roomController.js";
import { verifyHotelAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//CREATE
router.post("/:hotelid", createRoom);

//UPDATE
router.put("/:id", updateRoom);
router.put("/availability/:id", updateRoomAvailability);

//DELETE
router.delete("/:id", deleteRoom);

//GET
router.get("/:id", getRoom);

//GET ALL
router.get("/", getAllRooms);

export default router;
