import axiosInstance from "../axios/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export const markStudentAttendance = createAsyncThunk(
  "attendance/markStudentAttendance",
  async (attendanceRecords, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(`/attendance/student/mark`, {
        attendanceRecords,
      });
      toast.success(data.message);
      return data.success;
    } catch (error) {
      toast.error(error.response?.data.message);
      return rejectWithValue(error.response?.data.message || error.message);
    }
  }
);

export const markStaffAttendance = createAsyncThunk(
  "attendance/markStaffAttendance",
  async (attendanceRecords, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(`/attendance/staff/mark`, {
        attendanceRecords,
      });
      toast.success(data.message);
      return data.success;
    } catch (error) {
      toast.error(error.response?.data.message);
      return rejectWithValue(error.response?.data.message || error.message);
    }
  }
);

export const getStaffAttendanceById = createAsyncThunk(
  "attendance/getStaffAttendanceById",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/attendance/staff/${id}`);
      toast.success(data.message);
      return data.attendanceRecords;
    } catch (error) {
      toast.error(error.response?.data.message);
      return rejectWithValue(error.response?.data.message || error.message);
    }
  }
);

export const getStudentAttendanceById = createAsyncThunk(
  "attendance/getStudentAttendanceById",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/attendance/student/${id}`);
      toast.success(data.message);
      return data.attendanceRecords;
    } catch (error) {
      toast.error(error.response?.data.message);
      return rejectWithValue(error.response?.data.message || error.message);
    }
  }
);