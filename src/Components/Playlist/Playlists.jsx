import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllPlaylists } from '../../features/playlistSlice';
import PlaylistCard from './PlaylistCard';
import './Playlists.css';

const Playlists = () => {
  const dispatch = useDispatch();
  const { playlists, isLoading, error } = useSelector((state) => state.playlist);

  useEffect(() => {
    dispatch(fetchAllPlaylists());
  }, [dispatch]);

  if (isLoading) {
    return <p className="loading">Loading playlists...</p>;
  }

  if (error) {
    return <p className="error">Error: {error}</p>;
  }

  return (
    <div className="playlists-container">
      {playlists.length === 0 ? (
        <p className="no-playlists">No playlists available.</p>
      ) : (
        playlists.map((playlist) => (
          <PlaylistCard key={playlist._id} playlist={playlist} />
        ))
      )}
    </div>
  );
};

export default Playlists;
