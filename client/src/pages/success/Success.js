import "./success.css";
import { Link } from "react-router-dom";

const Success = () => {
  return (
    <div >
      <div className="card">
        <div className="checkmark">
          <i className="checkmark1">✓</i>
        </div>
        <h1 className="sTitle">Success</h1>
        <p className="sPara">
          Payment successful! Booking confirmed;
          <br /> Check your email for a confirmation!
        </p>
        <Link to="/">
          <button className="authbtn">Go to Home</button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
