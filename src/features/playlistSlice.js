import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/api/playList';


export const fetchAllPlaylists = createAsyncThunk(
  'playlists/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(API_BASE_URL);
      return response.data.playlists;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


export const fetchPlaylistById = createAsyncThunk(
  'playlists/fetchById',
  async (playlistId, thunkAPI) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${playlistId}`);
      return response.data.playlist;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const playlistSlice = createSlice({
  name: 'playlists',
  initialState: {
    playlists: [],
    currentPlaylist: null,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      
      .addCase(fetchAllPlaylists.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllPlaylists.fulfilled, (state, action) => {
        state.isLoading = false;
        state.playlists = action.payload;
      })
      .addCase(fetchAllPlaylists.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })

     
      .addCase(fetchPlaylistById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPlaylistById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentPlaylist = action.payload;
      })
      .addCase(fetchPlaylistById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      });
  },
});

export default playlistSlice.reducer;
