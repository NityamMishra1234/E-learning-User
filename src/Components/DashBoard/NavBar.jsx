import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'; 
import ProfileDropdown from './ProfileDropdown';
import { useSelector } from 'react-redux';
import './NavBar.css';

const NavBar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); 
  const { student } = useSelector((state) => state.student);
  
  const location = useLocation(); 

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleMenu = () => setMenuOpen(!menuOpen);

 
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="nav-center">
        <Link to="/" className="nav-logo">EduSphere</Link>
      </div>

      {/* Navigation Links */}
      <div className={`nav-left ${menuOpen ? 'open' : ''}`}>
        <Link to="/dashboard/todo" className="nav-link">Todo List</Link>
        <Link to="/dashboard/enroled/me" className="nav-link">Your Courses</Link>
        <Link to="/dashboard/Cources" className="nav-link">Explore Courses</Link>
        <Link to="/dashboard/About" className="nav-link">About</Link>
        <Link to="/dashboard/Exam" className="nav-link">Exam</Link>

        
        {menuOpen && (
          <div className="profile-section small-screen" onClick={toggleDropdown}>
            <img 
              src={student.profilePicture || '/js.png'} 
              alt="Profile" 
              className="profile-avatar"
            />
            <span className="profile-name">{student?.name}</span>
          </div>
        )}
      </div>

      
      <div className="nav-right">
        
        <div className="profile-section large-screen" onClick={toggleDropdown}>
          <img 
            src={student.profilePicture || '/js.png'} 
            alt="Profile" 
            className="profile-avatar"
          />
          <span className="profile-name">{student?.name}</span>
        </div>

        {dropdownOpen && <ProfileDropdown student={student} />}

        
        <div className="hamburger" onClick={toggleMenu}>
          <div className={`bar ${menuOpen ? 'open' : ''}`}></div>
          <div className={`bar ${menuOpen ? 'open' : ''}`}></div>
          <div className={`bar ${menuOpen ? 'open' : ''}`}></div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
