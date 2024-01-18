import express from "express";
import { deleteUser, getAllUsers, getUser, updateUser } from "../controllers/userController.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

//TEST
// router.get("/checkauth", verifyToken, (req, res, next)=>{
//     res.send("You are logged in!")
// })

// router.get("/checkuser/:id", verifyUser, (req, res, next)=>{
//     res.send("You are logged in and can delete account!")
// })

// router.get("/checkadmin/:id", verifyAdmin, (req, res, next)=>{
//     res.send("You are logged in as Admin!")
// })


//UPDATE
router.put("/:id", verifyUser, updateUser);

//DELETE
router.delete("/:id", deleteUser);

//GET
router.get("/:id", verifyUser, getUser);

//GET ALL
router.get("/", getAllUsers);

export default router