import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello, this is tables endpoint");
});

export default router;
