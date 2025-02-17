
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPlaylists } from "../../features/playlistSlice";
import { enrollInCourse } from "../../features/studentSlice";
import "./EnroleCources.css"; 

const EnrollCourses = () => {
  const dispatch = useDispatch();

  const { playlists, isLoading } = useSelector((state) => state.playlist);
  const { student, success, loading: enrollLoading } = useSelector((state) => state.student);

  useEffect(() => {
    dispatch(fetchAllPlaylists());
  }, [dispatch]);

  const handleEnroll = (playlistId) => {
    dispatch(enrollInCourse({ playlistId }));
  };

  const isEnrolled = (playlistId) => {
    return Array.isArray(student?.enrolledCourses) && 
           student.enrolledCourses.some(course => course._id === playlistId);
  };
  

  return (
    <div className="enroll-container">
      <h1>Available Playlists</h1>
      {isLoading ? (
        <p>Loading playlists...</p>
      ) : (
        <div className="playlist-grid">
          {playlists.map((playlist) => (
            <div key={playlist._id} className="playlist-card">
              <img
                src={playlist.coverImage || "https://via.placeholder.com/300"}
                alt={playlist.title}
                className="cover-image"
              />
              <div className="playlist-content">
                <h2>{playlist.title}</h2>
                <p>{playlist.description}</p>
                <div className="teacher-info">
                  <img
                    src={playlist.teacher[0].profilePicture || "https://via.placeholder.com/50"}
                    alt={playlist.teacher[0].name}
                    className="teacher-pic"
                  />
                  <span>{playlist.teacher[0].name}</span>
                </div>
                <button
                  className={`enroll-btn ${isEnrolled(playlist._id) ? "enrolled" : ""}`}
                  onClick={() => handleEnroll(playlist._id)}
                  disabled={isEnrolled(playlist._id) || enrollLoading}
                >
                  {isEnrolled(playlist._id) ? "Enrolled" : enrollLoading ? "Enrolling..." : "Enroll Now"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EnrollCourses;
