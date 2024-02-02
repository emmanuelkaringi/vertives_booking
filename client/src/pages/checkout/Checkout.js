import axios from "axios";
import "./checkout.css";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import useFetch from "../../hooks/useFetch";
import { useLocation } from "react-router-dom";

function Checkout() {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const { user } = useContext(AuthContext);
  const [fullName, setFullName] = useState(user.username);
  const [phoneNumber, setPhoneNumber] = useState(user.phone);
  const { data, loading, error } = useFetch(
    `http://localhost:8080/api/reserve/find/${id}`
  );

  console.log(data);

  const handlePayment = async () => {
    try {
      const paymentData = {
        amount: data.totalAmount,
        phone: phoneNumber,
        orderId: id,
      };
      const paymentResponse = await axios.post(
        "http://localhost:8080/api/checkout",
        paymentData
      );
      // Handle the payment response
      if (paymentResponse.status === 200) {
        // Payment was successful
        alert("Payment successful!");
        // Redirect to success page or perform other actions
      } else {
        // Payment failed
        alert("Payment failed. Please try again.");
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      alert("An error occurred during payment. Please try again.");
    }
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
            value={user.username}
            onChange={(e) => setFullName(e.target.value)}
          />

          <label className="phone">Phone Number</label>
          <input
            className="input"
            type="text"
            name="phoneNumber"
            value={user.phone}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </aside>
        <aside className="description">
          <h2>{data.hotelId && data.hotelId.name}</h2>
          <h3>{data.roomId && data.roomId[0] && data.roomId[0].title}</h3>
          <h1>KES. {data.totalAmount}</h1>
          <button className="editOrder" onClick={handlePayment}>
            Pay with MPesa
          </button>
        </aside>
      </main>
    </div>
  );
}

export default Checkout;
