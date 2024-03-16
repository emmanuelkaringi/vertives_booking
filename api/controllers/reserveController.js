import Reservation from "../models/Reserve.js";
import {
  updateRoomAvailability,
  deleteRoomAvailability,
} from "./roomController.js";

export const createReservation = async (req, res, next) => {
  const newReservation = new Reservation(req.body);

  try {
    const savedReservation = await newReservation.save();
    const roomId = req.body.roomId;
    const reservationDates = [req.body.checkInDate, req.body.checkOutDate];

    await updateRoomAvailability(roomId, reservationDates);
    res.status(200).json(savedReservation);
  } catch (err) {
    next(err);
  }
};

export const updateReservation = async (req, res, next) => {
  try {
    const updatedReservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedReservation);
  } catch (err) {
    next(err);
  }
};

export const cancelReservation = async (req, res, next) => {
  try {
    const canceledReservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      { status: "canceled" },
      { new: true }
    );

    const roomId = canceledReservation.roomId;
    const canceledDates = [
      canceledReservation.checkInDate,
      canceledReservation.checkOutDate,
    ];

    await deleteRoomAvailability(roomId, canceledDates);
    res.status(200).json({
      message: "Reservation canceled sucessfully",
      reservation: canceledReservation,
    });
  } catch (err) {
    next(err);
  }
};

export const getReservation = async (req, res, next) => {
  try {
    const reservation = await Reservation.findById(req.params.id)
      .populate("userId", "username") // Populate user and specify fields to include
      .populate("hotelId", "name") // Populate hotel and specify fields to include
      .populate("roomId", "title"); // Populate room and specify fields to include

    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    const populatedReservation = {
      _id: reservation._id,
      userId: reservation.userId,
      hotelId: reservation.hotelId,
      roomId: reservation.roomId,
      checkInDate: reservation.checkInDate,
      checkOutDate: reservation.checkOutDate,
      paymentStatus: reservation.paymentStatus,
      totalAmount: reservation.totalAmount,
      mpesaPaymentId: reservation.mpesaPaymentId,
      confirmationNumber: reservation.confirmationNumber,
      status: reservation.status,
      createdAt: reservation.createdAt,
      updatedAt: reservation.updatedAt,
    };

    res.status(200).json(populatedReservation);
  } catch (err) {
    next(err);
  }
};


export const getAllReservations = async (req, res, next) => {
  try {
    const reservations = await Reservation.find()
      .populate('userId', 'username')
      .populate('hotelId', 'name')
      .populate('roomId', 'title');

    const formattedReservations = reservations.map(reservation => ({
      _id: reservation._id,
      userId: reservation.userId,
      hotelId: reservation.hotelId,
      roomId: reservation.roomId,
      checkInDate: reservation.checkInDate,
      checkOutDate: reservation.checkOutDate,
      totalAmount: reservation.totalAmount,
      status: reservation.status
    }));

    res.status(200).json(formattedReservations);
  } catch (err) {
    next(err);
  }
};

export const countReservations = async (req, res, next) => {
  try {
    const reservationCount = await Reservation.countDocuments();
    res.status(200).json({ success: true, count: reservationCount });
  } catch (error) {
    next(error);
  }
};

export const calculateTotalAmount = async (req, res, next) => {
  try {
    const totalAmount = await Reservation.aggregate([
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$totalAmount" }
        }
      }
    ]);

    // totalAmount will be an array with one object containing the sum
    res.status(200).json({ success: true, totalAmount: totalAmount[0].totalAmount });
  } catch (error) {
    next(error);
  }
};