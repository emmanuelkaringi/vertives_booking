import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

function Success() {
 const [reservation, setReservation] = useState(null);
 const location = useLocation();
 const id = location.pathname.split("/")[2]; // Assuming the reservation ID is part of the URL

 useEffect(() => {
    const fetchReservation = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/reserve/find/${id}`);
        setReservation(response.data);
      } catch (error) {
        console.error("Error fetching reservation details:", error);
      }
    };

    fetchReservation();
 }, [id]);

 return (
    <div>
      <div className="card">
        <h1 className="sTitle">Success</h1>
        <p className="sPara">
          Payment successful! Booking confirmed;
          <br /> Check your email for confirmation!
        </p>
        {reservation && (
          <div className="receipt">
            <h2>Reservation Details</h2>
            <p>Hotel: {reservation.hotelId.name}</p>
            <p>Room: {reservation.roomId.title}</p>
            <p>Check-in Date: {new Date(reservation.checkInDate).toLocaleDateString()}</p>
            <p>Check-out Date: {new Date(reservation.checkOutDate).toLocaleDateString()}</p>
            <p>Total Amount: KES. {reservation.totalAmount}</p>
            <p>Payment Status: {reservation.paymentStatus}</p>
            <p>Confirmation Number: {reservation.confirmationNumber}</p>
          </div>
        )}
        <Link to="/">
          <button className="authbtn">Go to Home</button>
        </Link>
      </div>
    </div>
 );
};

export default Success;
