import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(
        "http://localhost:8080/api/auth/login",
        credentials
      );
      console.log("Server response:", res.data);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAIL", payload: err.response.data });
    }
  };

  return (
    <div className="container2">
      <div className="wrapper2">
        <h1 className="title2">Login</h1>
        <div className="form2">
        <label className="fLabel2">Full Name:</label>
          <input
            type="text"
            placeholder="John Doe"
            id="username"
            onChange={handleChange}
            className="fInput"
          />
          <label className="fLabel">Password:</label>
          <input
            type="password"
            placeholder="password"
            id="password"
            onChange={handleChange}
            className="fInput"
          />
        </div>
        <button disabled={loading} onClick={handleClick} className="authbtn">
          Login
        </button>
        {error && <span>{error.message}</span>}
        <div className="member">
          Don't have an account?{" "}
          <Link to="/register" className="link">
            Register Here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
