import { Link, useNavigate } from "react-router-dom";
import "./register.css";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    email: undefined,
    country: undefined,
    city: undefined,
    phone: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "REGISTER_START" });
    try {
      const res = await axios.post(
        "http://localhost:8080/api/auth/register",
        credentials
      );
      console.log("Server response:", res.data);
      dispatch({ type: "REGISTER_SUCCESS", payload: res.data.details });
      navigate("/login");
    } catch (err) {
      dispatch({ type: "REGISTER_FAIL", payload: err.response.data });
    }
  };

  return (
    <div className="wrapper">
      <h1 className="title">Sign Up</h1>
      <div className="form">
        <input
          type="text"
          placeholder="Username"
          id="username"
          onChange={handleChange}
          className="fInput"
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          onChange={handleChange}
          className="fInput"
        />
        <input
          type="text"
          placeholder="Country"
          id="country"
          onChange={handleChange}
          className="fInput"
        />
        <input
          type="text"
          placeholder="City"
          id="city"
          onChange={handleChange}
          className="fInput"
        />
        <input
          type="text"
          placeholder="Phone"
          id="phone"
          onChange={handleChange}
          className="fInput"
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          onChange={handleChange}
          className="fInput"
        />
      </div>
      <button disabled={loading} onClick={handleClick} className="authbtn">
        Sign Up
      </button>
      {error && <span>{error.message}</span>}
      <div className="member">
        Arleady have an account?{" "}
        <Link to="/login" className="link">
          Login Here
        </Link>
      </div>
    </div>
  );
};

export default Register;
