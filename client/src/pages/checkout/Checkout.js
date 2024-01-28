import { useState } from "react";
import "./checkout.css";

function Checkout() {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [hotelName, setHotelName] = useState("Placeholder");
  const [roomDetails, setRoomDetails] = useState("Room Title : Room Number");
  const [totalPrice, setTotalPrice] = useState("$150");

  const handlePayment = () => {
    // Implement payment logic here
    console.log("Payment logic goes here");
  };

  return (
    <div className="checkout">
      <main className="container">
        <aside className="info">
          <label className="name">Full Name</label>
          <input
            className="input"
            type="text"
            name="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <label className="phone">Phone Number</label>
          <input
            className="input"
            type="text"
            name="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </aside>
        <aside className="description">
          <h2>{hotelName}</h2>
          <h3>{roomDetails}</h3>
          <h1>{totalPrice}</h1>
          <button className="editOrder" onClick={handlePayment}>
            Pay with MPesa
          </button>
        </aside>
      </main>
    </div>
  );
}

export default Checkout;
