import axiosInstance from "../axios/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export const login = createAsyncThunk(
  "authntication/login",
  async (credentials, { rejectWithValue }) => {
    try {
      let route;

      if (credentials.auth === "admin") route = "admin";
      else route = "staff";

      const { data } = await axiosInstance.post(`/${route}/login`, credentials);
      localStorage.setItem("token", data.token);
      toast.success(data.message);
      return { auth: route, data: data[route] };
    } catch (error) {
      toast.error(error.response?.data.message);
      return rejectWithValue(error.response?.data.message || error.message);
    }
  }
);

export const registerStaff = createAsyncThunk(
  "authntication/registerStaff",
  async (staff, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(`/staff/register`, staff);
      toast.success(data.message);
      return data.staff;
    } catch (error) {
      toast.error(error.response?.data.message);
      return rejectWithValue(error.response?.data.message || error.message);
    }
  }
);

export const registerAdmin = createAsyncThunk(
  "authntication/registerAdmin",
  async (admin, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(`/admin/register`, admin);
      toast.success(data.message);
      return data.admin;
    } catch (error) {
      toast.error(error.response?.data.message);
      return rejectWithValue(error.response?.data.message || error.message);
    }
  }
);

export const updateTeacherPassword = createAsyncThunk(
  "authntication/updateTeacherPassword",
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(
        `/staff/update-password`,
        credentials
      );
      toast.success(data.message);
      return data.success;
    } catch (error) {
      toast.error(error.response?.data.message);
      return rejectWithValue(error.response?.data.message || error.message);
    }
  }
);

export const updateAdminPassword = createAsyncThunk(
  "authntication/updateAdminPassword",
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(
        `/admin/update-password`,
        credentials
      );
      toast.success(data.message);
      return data.success;
    } catch (error) {
      toast.error(error.response?.data.message);
      return rejectWithValue(error.response?.data.message || error.message);
    }
  }
);

export const logoutTeacher = createAsyncThunk(
  "authntication/logoutTeacher",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/staff/logout`);
      toast.success(data.message);
      return data.success;
    } catch (error) {
      toast.error(error.response?.data.message);
      return rejectWithValue(error.response?.data.message || error.message);
    }
  }
);

export const logoutAdmin = createAsyncThunk(
  "authntication/logoutAdmin",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/admin/logout`);
      toast.success(data.message);
      return data.success;
    } catch (error) {
      toast.error(error.response?.data.message);
      return rejectWithValue(error.response?.data.message || error.message);
    }
  }
);
