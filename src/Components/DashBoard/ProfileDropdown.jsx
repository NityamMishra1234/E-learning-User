import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutStudent } from '../../features/studentSlice';
import './ProfileDropdown.css';
import { useNavigate } from 'react-router-dom';

const ProfileDropdown = ({ student }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logoutStudent());
    window.location.reload();  
  };
  const handelNavigate =()=>{
    navigate("/dashboard/Update")
  }

  return (
    <div className="dropdown-container">
      <div className="dropdown-header">
        <img 
          src={student?.profilePicture || 'https://via.placeholder.com/60'} 
          alt="Profile" 
          className="dropdown-avatar"
        />
        <div>
          <h4>{student?.name}</h4>
          <p>{student?.email}</p>
        </div>
      </div>

      <div className="dropdown-options">
        <button onClick={handelNavigate} className="dropdown-btn">Update Profile</button>
        <button className="dropdown-btn logout" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default ProfileDropdown;
