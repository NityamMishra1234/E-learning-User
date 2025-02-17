import React, { useEffect, useRef, useState } from "react";
import lottie from "lottie-web";
import Typewriter from "typewriter-effect";
import "./Home.css";
import Playlists from "../../Components/Playlist/Playlists";
import { useNavigate } from "react-router-dom";
import Footer from "../../Components/Footer/Footer"; 

const Home = () => {
  const animationContainer = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const slides = [
    "/image1.webp",
    "/image2.webp",
    "/image3.webp",
  ];

  useEffect(() => {
    lottie.loadAnimation({
      container: animationContainer.current,
      path: "/animation.json",
      renderer: "svg",
      loop: true,
      autoplay: true,
    });

    return () => lottie.destroy();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const explore = () => {
    navigate("/courses");
  };

  return (
    <div className="home-container"> 
      <div className="home">
        
        <div className="home-content">
          <div className="text-container">
            <h1>
              <Typewriter
                options={{
                  strings: [
                    "Welcome to the Future of Learning",
                    "Empower Your Learning Journey",
                    "Unlock Your Potential with Knowledge",
                  ],
                  autoStart: true,
                  loop: true,
                  delay: 70,
                  deleteSpeed: 40,
                }}
              />
            </h1>
            <p>
              Learn from the best educators, explore diverse courses, and elevate your skills. 
              Your journey to knowledge starts here!
            </p>
            <button onClick={explore} className="explore-btn">
              🚀 Explore Courses
            </button>
          </div>

          <div className="animation-container" ref={animationContainer}></div>
        </div>

       
        <div className="slideshow-container">
          <img src={slides[currentSlide]} alt="Course Poster" className="slide" />
        </div>

       
        <section className="featured-courses">
          <h2 className="featured-title">Featured Courses</h2>
          <Playlists />
        </section>
      </div>

      
      <Footer />
    </div>
  );
};

export default Home;
