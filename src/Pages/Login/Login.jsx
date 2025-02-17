import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Input } from "../../Components/Input";
import { Button } from "../../Components/Button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { loginStudent } from "../../features/studentSlice";
import AnimationSVG from "../../svg/animation.svg";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { student, loading, error, success } = useSelector((state) => state.student);

  useEffect(() => {
    if (success && student) {
      navigate("/dashboard/todo"); 
    }
  }, [success, student, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginStudent({ email, password }));
  };

  return (
    <div className="login-container">
      
      <motion.div
        className="login-animation-section"
        initial={{ x: -200, opacity: -3 }}
        animate={{ x: 200, opacity: 10 }}
        transition={{ duration: 4 }}
      >
        <img
          src={AnimationSVG}
          alt="Man working on a laptop"
          className="login-animation-img"
        />
      </motion.div>

     
      <motion.div
        className="login-form-section"
        initial={{ x: 200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="login-form-container">
          <h2 className="login-title">Welcome Back Please login</h2>

          <form onSubmit={handleLogin} className="login-form">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
              required
            />
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
              required
            />

            <Button
              type="submit"
              className="login-button"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>

          {error && <p style={{ color: "red", textAlign: "center", marginTop: "10px" }}>{error}</p>}

          <div className="login-divider">
            <hr />
            <span>OR</span>
            <hr />
          </div>

          <div className="login-social-buttons">
            <Button onClick={() => console.log("Google login clicked")} className="social-button google-button">
              <FcGoogle className="social-icon" /> Continue with Google
            </Button>
            <Button onClick={() => console.log("GitHub login clicked")} className="social-button github-button">
              <FaGithub className="social-icon" /> Continue with GitHub
            </Button>
            <Button onClick={() => console.log("LinkedIn login clicked")} className="social-button linkedin-button">
              <FaLinkedin className="social-icon" /> Continue with LinkedIn
            </Button>
          </div>

          <p className="signup-prompt">
            Don't have an account?{" "}
            <NavLink to="/signup" className="signup-link">
              Sign up
            </NavLink>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
