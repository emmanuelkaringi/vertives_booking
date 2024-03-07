import express from "express";
import {
  countByCity,
  createHotel,
  deleteHotel,
  getAllHotels,
  getHotel,
  getHotelRooms,
  updateHotel,
} from "../controllers/hotelController.js";
import { verifyAdmin, verifyHotelAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//CREATE
router.post("/", verifyAdmin, createHotel);

//UPDATE
router.put("/:id", updateHotel);

//DELETE
router.delete("/:id", deleteHotel);

//GET
router.get("/find/:id", getHotel);

//GET ALL
router.get("/", getAllHotels);
router.get("/countByCity", countByCity);

// ROOMS
router.get("/room/:id", getHotelRooms);

export default router;
