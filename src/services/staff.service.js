import axiosInstance from "../axios/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export const getAllStaff = createAsyncThunk(
  "staff/getAllStaff",
  async (role, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/staff?role=${role}`);
      return data.staff;
    } catch (error) {
      return rejectWithValue(error.response?.data.message || error.message);
    }
  }
);

export const getStaffById = createAsyncThunk(
  "staff/getStaffById",
  async (_id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/staff/${_id}`);
      return data.staff;
    } catch (error) {
      return rejectWithValue(error.response?.data.message || error.message);
    }
  }
);

export const createStaff = createAsyncThunk(
  "staff/createStaff",
  async (staffData, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(`/staff/register`, staffData);
      toast.success(data.message);
      return data.staff;
    } catch (error) {
      toast.error(error.response?.data.message || error.message);
      return rejectWithValue(error.response?.data.message || error.message);
    }
  }
);

export const updateStaff = createAsyncThunk(
  "staff/updateStaff",
  async ({ _id, staffData }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.patch(`/staff/${_id}`, staffData);
      toast.success(data.message);
      return data.staff;
    } catch (error) {
      toast.error(error.response?.data.message || error.message);
      return rejectWithValue(error.response?.data.message || error.message);
    }
  }
);

export const deleteStaff = createAsyncThunk(
  "staff/deleteStaff",
  async (_id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.delete(`/staff/${_id}`);
      toast.success(data.message);
      return _id;
    } catch (error) {
      toast.error(error.response?.data.message || error.message);
      return rejectWithValue(error.response?.data.message || error.message);
    }
  }
);
