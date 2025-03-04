import axiosInstance from "../axios/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export const getFeeStatus = createAsyncThunk(
  "fee/getFeeStatus",
  async (_id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/fee`);
      return data.fees;
    } catch (error) {
      return rejectWithValue(error.response?.data.message || error.message);
    }
  }
);

export const markFeePaid = createAsyncThunk(
  "fee/markFeePaid",
  async (fee, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(`/fee`, fee);
      toast.success(data.message);
      return data.fee;
    } catch (error) {
      return rejectWithValue(error.response?.data.message || error.message);
    }
  }
);
