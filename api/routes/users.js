import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
  countUsers
} from "../controllers/userController.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// COUNT
router.get("/count", countUsers);

//UPDATE
router.put("/:id", verifyUser, updateUser);

//DELETE
router.delete("/:id", deleteUser);

//GET
router.get("/:id", verifyUser, getUser);

//GET ALL
router.get("/", getAllUsers);

export default router;
