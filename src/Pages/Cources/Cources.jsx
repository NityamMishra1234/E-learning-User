import React from 'react';
import Playlists from '../../Components/Playlist/Playlists';
import './Courses.css';

function Courses() {
  return (
    <div className="courses-container">
      
      <section className="hero-section">
        <div className="hero-content">
          <h1>Discover Your Next Learning Adventure</h1>
          <p>
            Dive into a world of knowledge with expertly curated courses designed to
            boost your skills and broaden your horizons.
          </p>
          <a href="#playlists" className="explore-btn">Start Exploring</a>
        </div>
        <div className="hero-image">
          <img src="\loginPage.webp" alt="Courses" />
        </div>
      </section>

      
      <section id="playlists" className="playlists-section">
        <h2 className="section-title">Available Courses</h2>
        <Playlists />
      </section>

      
      <footer className="footer">
        <p>© 2025 E-Learn. Empowering Education, One Course at a Time.</p>
      </footer>
    </div>
  );
}

export default Courses;
