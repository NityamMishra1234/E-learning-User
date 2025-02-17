import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "http://localhost:5001/api/exam";


export const fetchExamsByPlaylist = createAsyncThunk(
  "exam/fetchExamsByPlaylist",
  async (playlistId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${playlistId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching exams");
    }
  }
);


export const submitExam = createAsyncThunk(
  "exam/submitExam",
  async (examData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/submit`, examData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error submitting exam");
    }
  }
);


export const fetchExamResults = createAsyncThunk(
  "exam/fetchExamResults",
  async (studentId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/ExamResult/${studentId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching exam results");
    }
  }
);

const examSlice = createSlice({
  name: "exam",
  initialState: {
    exams: [],
    results: [],
    loading: false,
    error: null,
    submissionStatus: null,
  },
  reducers: {
    clearSubmissionStatus: (state) => {
      state.submissionStatus = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExamsByPlaylist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExamsByPlaylist.fulfilled, (state, action) => {
        state.loading = false;
        state.exams = action.payload;
      })
      .addCase(fetchExamsByPlaylist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(submitExam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitExam.fulfilled, (state, action) => {
        state.loading = false;
        state.submissionStatus = "success";
      })
      .addCase(submitExam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.submissionStatus = "error";
      })
      .addCase(fetchExamResults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExamResults.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
      })
      .addCase(fetchExamResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSubmissionStatus } = examSlice.actions;
export default examSlice.reducer;
