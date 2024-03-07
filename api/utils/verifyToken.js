import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(createError(401, "You are not authenticated!"));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(createError(403, "Token is not valid!"));
    req.user = user;
    next();
  });
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin || req.user.isSuperAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin || req.user.isSuperAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};

export const verifyHotelAdmin = (req, res, next) => {
  verifyToken(req, res, () =>{
    // Check if the user is an admin and if the hotel ID matches the one in the request
    if(req.user.isAdmin && req.user.hotelId.toString()== req.params.hotelId){
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  })
}
