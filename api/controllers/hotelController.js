import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
import Review from "../models/Review.js";

export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);

  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (err) {
    next(err);
  }
};

export const updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (err) {
    next(err);
  }
};

export const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel deleted sucessfully");
  } catch (err) {
    next(err);
  }
};

export const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};

export const getAllHotels = async (req, res, next) => {
  const { min, max, limit, ...others } = req.query;

  try {
    const hotels = await Hotel.find({
      ...others,
      cheapestPrice: { $gt: min | 1, $lte: max || 999999 },
    }).limit(limit ? parseInt(limit, 10) : 0);

    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};

export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

export const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

export const createReview = async (req, res, next) => {
  try {
    // Extract user ID from JWT token
    const userId = req.user.id;
    // Assuming content and rating are passed in the request body
    const { content, rating } = req.body;

    // Create a new review with the dynamically captured user ID
    const newReview = new Review({
      user: userId,
      hotel: req.params.id, // Assuming hotel ID is passed in URL params
      content,
      rating,
    });
    // Save the new review
    const savedReview = await newReview.save();
    // Push the new review's ID to the hotel's reviews array
    await Hotel.findByIdAndUpdate(req.params.id, {
      $push: { reviews: savedReview._id },
    });
    // Send the saved review as the response
    res.status(201).json(savedReview);
  } catch (err) {
    next(err);
  }
};

export const updateReview = async (req, res, next) => {
  try {
    const updatedReview = await Review.findByIdAndUpdate(
      req.params.reviewId,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedReview);
  } catch (err) {
    next(err);
  }
};

export const deleteReview = async (req, res, next) => {
  try {
    // Remove the review from the hotel's reviews array first
    await Hotel.findByIdAndUpdate(req.params.id, {
      $pull: { reviews: req.params.reviewId },
    });
    await Review.findByIdAndDelete(req.params.reviewId);
    res.status(200).json("Review deleted successfully");
  } catch (err) {
    next(err);
  }
};

export const getHotelReviews = async (req, res, next) => {
  try {
    const hotelId = req.params.id; // Assuming hotel ID is passed in URL params
    const reviews = await Review.find({ hotel: hotelId }).populate(
      "user",
      "username img"
    ); // Populate user details
    res.status(200).json(reviews);
  } catch (err) {
    next(err);
  }
};
