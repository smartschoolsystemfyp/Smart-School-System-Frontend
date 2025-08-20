import { createSlice } from "@reduxjs/toolkit";
import {
  getStaffAttendanceById,
  getStudentAttendanceById,
  markStaffAttendance,
  markStudentAttendance,
} from "../services/attendance.service";

const initialState = {
  loading: false,
  error: null,
  staffAttendance: [],
  studentAttendance: [],
};

const attendanceSlice = createSlice({
  name: "attendance",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handling the markStudentAttendance action
      .addCase(markStudentAttendance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(markStudentAttendance.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(markStudentAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handling the markStaffAttendance action
      .addCase(markStaffAttendance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(markStaffAttendance.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(markStaffAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handling the getStaffAttendance action
      .addCase(getStaffAttendanceById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStaffAttendanceById.fulfilled, (state, action) => {
        state.loading = false;
        state.staffAttendance = action.payload;
      })
      .addCase(getStaffAttendanceById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handling the getStudentAttendanceById action
      .addCase(getStudentAttendanceById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStudentAttendanceById.fulfilled, (state, action) => {
        state.loading = false;
        state.studentAttendance = action.payload;
      })
      .addCase(getStudentAttendanceById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default attendanceSlice.reducer;
