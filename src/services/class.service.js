import axiosInstance from "../axios/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export const getAllClasses = createAsyncThunk(
  "class/getAllClasses",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/class`);
      return data.classes;
    } catch (error) {
      return rejectWithValue(error.response?.data.message || error.message);
    }
  }
);

export const getClassById = createAsyncThunk(
  "class/getClassById",
  async (_id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/class/${_id}`);
      return data.class;
    } catch (error) {
      return rejectWithValue(error.response?.data.message || error.message);
    }
  }
);

export const createClass = createAsyncThunk(
  "class/createClass",
  async (classData, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(`/class`, classData);
      toast.success(data.message);
      return data.class;
    } catch (error) {
      toast.error(error.responce.data.message);
      return rejectWithValue(error.response?.data.message || error.message);
    }
  }
);

export const updateClass = createAsyncThunk(
  "class/updateClass",
  async ({ _id, classData }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.patch(`/class/${_id}`, classData);
      toast.success(data.message);
      return data.class;
    } catch (error) {
      toast.error(error.responce.data.message);
      return rejectWithValue(error.response?.data.message || error.message);
    }
  }
);

export const deleteClass = createAsyncThunk(
  "class/deleteClass",
  async (_id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.delete(`/class/${_id}`);
      toast.success(data.message);
      return _id;
    } catch (error) {
      toast.error(error.responce.data.message);
      return rejectWithValue(error.response?.data.message || error.message);
    }
  }
);
