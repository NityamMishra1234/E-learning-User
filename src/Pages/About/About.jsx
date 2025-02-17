import React from "react";
import Lottie from "lottie-react";
import aboutAnimation from "../../svg/About.json"; 
import techAnimation from "../../svg/Animation - 1739221671300 (1).json"; 
import Typewriter from "typewriter-effect";
import "./About.css";

const About = () => {
  return (
    <div className="about-container">
      
      <section className="about-section">
        <div className="about-text">
          <h1>
            Hi, I’m{" "}
            <span className="typing-text">
              <Typewriter
                options={{
                  strings: ["Nityam Kumar", "a Web Developer", "a Tech Enthusiast"],
                  autoStart: true,
                  loop: true,
                  pauseFor: 2000,
                }}
              />
            </span>{" "}
            👋
          </h1>
          <p>
            I'm passionate about building <span className="highlight">scalable</span>,{" "}
            <span className="highlight">user-friendly</span> applications that solve real-world
            problems.
          </p>
          <p>
            This <span className="highlight">E-Learning Platform</span> was crafted during my internship
            at <span className="highlight">iNeuron</span>, blending modern tech with educational needs.
          </p>
        </div>
        <div className="about-animation">
          <Lottie animationData={aboutAnimation} loop={true} />
        </div>
      </section>

      
      <section className="project-section">
        <div className="project-animation">
          <Lottie animationData={techAnimation} loop={true} />
        </div>
        <div className="project-text">
          <h2>Project Overview 🚀</h2>
          <p>
            This platform is designed to empower students and teachers with interactive tools,
            seamless video integration, and robust progress tracking.
          </p>

          <h3>Key Features:</h3>
          <ul>
            <li>📚 Dynamic Course Management for Teachers and Students.</li>
            <li>🎥 Integrated Video Lectures and Downloadable Materials.</li>
            <li>📝 Personalized To-Do Lists for task tracking.</li>
            <li>📊 Real-time Progress and Performance Insights.</li>
            <li>🔒 Secure Authentication & User Management with JWT.</li>
          </ul>

          <h3>Technology Stack:</h3>
          <ul className="tech-stack">
            <li><strong>Frontend:</strong> React (Vite), Redux Toolkit, Custom CSS & Animations</li>
            <li><strong>Backend:</strong> Node.js, Express.js, MongoDB, JWT Authentication</li>
            <li><strong>Cloud Storage:</strong> Cloudinary for media files (videos, PDFs, images)</li>
          </ul>

          <h3>Outcome:</h3>
          <p>
            The result is a sleek, responsive, and highly functional E-Learning platform that enhances
            both teaching and learning experiences.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
