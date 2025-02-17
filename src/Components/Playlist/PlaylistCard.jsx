import React from 'react';
import './PlaylistCard.css';
import { Link } from 'react-router-dom';

const PlaylistCard = ({ playlist }) => {
  const defaultCover = '/js.png';  
  const coverImage = playlist.coverImage || defaultCover;
  const teacher = playlist.teacher[0]; 

  return (
    <div className="playlist-card">
      <div className="image-container">
        <img src={coverImage} alt={playlist.title} className="playlist-cover" />
      </div>
      <div className="playlist-info">
        <h3>{playlist.title}</h3>
        <p>{playlist.description || 'No description available.'}</p>
        
        {teacher && (
          <div className="teacher-info">
            <img 
              src={teacher.profilePicture || '/default-profile.png'} 
              alt={teacher.name} 
              className="teacher-pic" 
            />
            <span>By {teacher.name}</span>
          </div>
        )}
        
        <Link to={`/login`} className="view-btn">
          Enroll
        </Link>
      </div>
    </div>
  );
};

export default PlaylistCard;
