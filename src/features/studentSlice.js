
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "http://localhost:5001/api/students";


export const registerStudent = createAsyncThunk(
  "students/register",
  async (studentData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/register`, studentData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginStudent = createAsyncThunk(
  "students/login",
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, loginData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getStudentProfile = createAsyncThunk(
  "students/profile",
  async (_, { getState, rejectWithValue }) => {
    const { token } = getState().student;
    try {
      const response = await axios.get(`${API_BASE_URL}/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateStudentProfile = createAsyncThunk(
  "students/update",
  async (profileData, { getState, rejectWithValue }) => {
    const { token } = getState().student;
    try {
      const response = await axios.put(`${API_BASE_URL}/me`, profileData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const enrollInCourse = createAsyncThunk(
  "students/enroll",
  async (courseData, { getState, rejectWithValue }) => {
    const { token } = getState().student;
    try {
      const response = await axios.post(`${API_BASE_URL}/enroll`, courseData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


const studentSlice = createSlice({
  name: "student",
  initialState: {
    student: null,
    token: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    logoutStudent: (state) => {
      state.student = null;
      state.token = null;
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
     
      .addCase(registerStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.student = action.payload.student;
        state.token = action.payload.token;
      })
      .addCase(registerStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

     
      .addCase(loginStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.student = action.payload.student;
        state.token = action.payload.token;
      })
      .addCase(loginStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

     
      .addCase(getStudentProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStudentProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.student = action.payload.student;
      })
      .addCase(getStudentProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

      
      .addCase(updateStudentProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStudentProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.student = action.payload.student;
      })
      .addCase(updateStudentProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

     
      .addCase(enrollInCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(enrollInCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.student.enrolledCourses = action.payload.playlist;
      })
      .addCase(enrollInCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export const { logoutStudent } = studentSlice.actions;
export default studentSlice.reducer;
