import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Input } from "../../Components/Input";
import { Button } from "../../Components/Button";
import { registerStudent } from "../../features/studentSlice";
import AnimationSVG from "../../svg/animation.svg";
import { FcGoogle } from "react-icons/fc"; 
import { FaGithub, FaLinkedin } from "react-icons/fa"; 
import "./Signup.css"; 

const Signup = () => {
  const [name, setName] = useState("");
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

  const handleSignup = (e) => {
    e.preventDefault();
    dispatch(registerStudent({ name, email, password }));
  };

  const handleGoogleSignup = () => {
    
    console.log("Sign up with Google");
  };

  const handleGithubSignup = () => {
  
    console.log("Sign up with GitHub");
  };

  const handleLinkedinSignup = () => {
   
    console.log("Sign up with LinkedIn");
  };

  return (
    <div className="signup-container">
      <motion.div
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="signup-form-container"
      >
        <div className="signup-form-card">
          <h2>Welcome to EduLearn</h2>
          <p className="signup-subtext">Create your account to get started!</p>

          <form onSubmit={handleSignup} className="signup-form">
            <Input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="signup-input"
              required
            />
            <Input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="signup-input"
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="signup-input"
              required
            />

            <Button type="submit" disabled={loading} className="signup-button">
              {loading ? "Registering..." : "Sign Up"}
            </Button>
          </form>

          {error && <p className="error-message">{error}</p>}

         
          <div className="signup-divider">
            <hr /> <span>or sign up with</span> <hr />
          </div>

         
          <div className="social-signup-buttons">
            <button onClick={handleGoogleSignup} className="social-button google-button">
              <FcGoogle className="social-icon" /> Sign up with Google
            </button>
            <button onClick={handleGithubSignup} className="social-button github-button">
              <FaGithub className="social-icon" /> Sign up with GitHub
            </button>
            <button onClick={handleLinkedinSignup} className="social-button linkedin-button">
              <FaLinkedin className="social-icon" /> Sign up with LinkedIn
            </button>
          </div>

          <p className="switch-link">
            Already have an account?{" "}
            <NavLink to="/login" className="nav-link">
              Login here
            </NavLink>
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ x: 400, opacity: -3 }}
        animate={{ x: -300, opacity: 10 }}
        transition={{ duration: 4 }}
        className="signup-animation"
      >
        <img src={AnimationSVG} alt="Signup Illustration" className="signup-svg" />
      </motion.div>
    </div>
  );
};

export default Signup;
