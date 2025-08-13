import { createSlice } from "@reduxjs/toolkit";
import {
  forgetPassword,
  login,
  logoutAdmin,
  logoutTeacher,
  registerAdmin,
  registerStaff,
  resetPassword,
  updateAdminPassword,
  updateTeacherPassword,
} from "../services/authentication.service";

const initialState = {
  admin: null,
  teacher: null,
  loading: false,
  error: null,
};

const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handling the registerStaff action
      .addCase(registerStaff.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerStaff.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerStaff.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handling the registerAdmin action
      .addCase(registerAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerAdmin.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handling the login action
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        if (action.payload.auth === "admin") state.admin = action.payload.data;
        else if (action.payload.auth === "staff") {
          state.teacher = action.payload.data;
        }

        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handling the updateAdminPassword action
      .addCase(updateAdminPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAdminPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateAdminPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handling the updateTeacherPassword action
      .addCase(updateTeacherPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTeacherPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateTeacherPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handling the logoutTeacher action
      .addCase(logoutTeacher.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutTeacher.fulfilled, (state) => {
        state.loading = false;
        state.teacher = null;
        localStorage.removeItem("token");
      })
      .addCase(logoutTeacher.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handling the logoutAdmin action
      .addCase(logoutAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutAdmin.fulfilled, (state) => {
        state.loading = false;
        state.admin = null;
        localStorage.removeItem("token");
      })
      .addCase(logoutAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handling the forgetPassword action
      .addCase(forgetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgetPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(forgetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handling the resetPassword action
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authenticationSlice.reducer;
