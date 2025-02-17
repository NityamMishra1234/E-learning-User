import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "../features/studentSlice";
import playlistReducer from "../features/playlistSlice";
import todoReducer from "../features/todoSlice"
import examReducer from "../features/examSlice"
const store = configureStore({
  reducer: {
    student: studentReducer,
    playlist:playlistReducer,
    todo: todoReducer,
    exam : examReducer,
  },
});

export default store;