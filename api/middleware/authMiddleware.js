import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";
import User from "../models/User.js";

export const authenticateToken = async (req, res, next) => {
  // Get the JWT token from the cookie
  const token = req.cookies.access_token;

  if (!token) {
    return next(createError(401, "Unauthorized: No token provided"));
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch the user from the database using the decoded user ID
    const user = await User.findById(decoded.id);

    if (!user) {
      return next(createError(404, "User not found"));
    }

    // Attach the user object to the request
    req.user = user;

    next();
  } catch (error) {
    next(createError(401, "Unauthorized: Invalid token"));
  }
};