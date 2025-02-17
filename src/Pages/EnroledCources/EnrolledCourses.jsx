import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPlaylistById } from '../../features/playlistSlice';
import './EnrolledCourses.css';

const EnrolledCourses = () => {
  const dispatch = useDispatch();
  const { student } = useSelector((state) => state.student);
  const { currentPlaylist, isLoading } = useSelector((state) => state.playlist);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);
  const [fetchedPlaylists, setFetchedPlaylists] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (student?.enrolledCourses.length > 0) {
      Promise.all(
        student.enrolledCourses.map((courseId) =>
          dispatch(fetchPlaylistById(courseId)).then((response) => response.payload)
        )
      ).then((playlists) => {
        
        const uniquePlaylists = [];
        const seen = new Set();
        playlists.forEach((playlist) => {
          if (playlist && !seen.has(playlist._id)) {
            seen.add(playlist._id);
            uniquePlaylists.push(playlist);
          }
        });
        setFetchedPlaylists(uniquePlaylists);
      });
    }
  }, [dispatch, student]);
  
  

  const handlePlaylistClick = (playlistId) => {
    dispatch(fetchPlaylistById(playlistId));
    setSelectedPlaylistId(playlistId);
    setIsSidebarOpen(false); 
  };

  if (isLoading) return <div className="loading">Loading...</div>;

  return (
    <div className="enrolled-courses-container">
      <button
        className="toggle-sidebar-btn"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? 'Close Courses' : 'Open Courses'}
      </button>

      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <h2>Your Enrolled Courses</h2>
        <div className="courses-grid">
          {fetchedPlaylists.map((playlist) => (
            <div
              key={playlist._id}
              className={`course-card ${selectedPlaylistId === playlist._id ? 'active' : ''}`}
              onClick={() => handlePlaylistClick(playlist._id)}
            >
              <img src={playlist.coverImage} alt={playlist.title} className="course-cover" />
              <div className="course-info">
                <h3>{playlist.title}</h3>
                <p>{playlist.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {currentPlaylist && (
        <div className="playlist-content">
          <h2>{currentPlaylist.title}</h2>
          <p>{currentPlaylist.description}</p>

          <div className="video-section">
            <video controls src={currentPlaylist.videos[0].videoUrl} className="main-video" />
            <h3>{currentPlaylist.videos[0].title}</h3>
            <p>{currentPlaylist.videos[0].description}</p>
          </div>

          <div className="video-list">
            {currentPlaylist.videos.map((video, index) => (
              <div key={video._id} className="video-item">
                <img src={video.thumbnailUrl} alt={video.title} />
                <h4>{video.title}</h4>
                <p>{video.description}</p>
              </div>
            ))}
          </div>

          <div className="materials-section">
            <h3>Materials</h3>
            {currentPlaylist.videos[0].materials.length > 0 ? (
              currentPlaylist.videos[0].materials.map((material, idx) => (
                <a key={idx} href={material} target="_blank" rel="noopener noreferrer" className="material-link">
                  Material {idx + 1}
                </a>
              ))
            ) : (
              <p>No materials available.</p>
            )}
          </div>
        </div>
      )}
      
    </div>
  );
};

export default EnrolledCourses;
