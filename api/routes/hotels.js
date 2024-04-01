import express from "express";
import {
  countByCity,
  createHotel,
  deleteHotel,
  getAllHotels,
  getHotel,
  getHotelRooms,
  updateHotel,
  createReview,
  updateReview,
  deleteReview,
  getHotelReviews
} from "../controllers/hotelController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";
import { verifyAdmin, verifyHotelAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//CREATE
router.post("/", createHotel);

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

// Reviews
router.post("/:id/reviews", authenticateToken, createReview);
router.put("/:id/reviews/:reviewId", updateReview);
router.delete("/:id/reviews/:reviewId", deleteReview);
router.get("/:id/reviews", getHotelReviews);

export default router;
