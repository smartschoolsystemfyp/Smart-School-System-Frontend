import axiosInstance from "../axios/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export const getAllStudents = createAsyncThunk(
  "employee/getAllStudents",
  async (classId = "", { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/student?classId=${classId}`);
      return data.students;
    } catch (error) {
      return rejectWithValue(error.response?.data.message || error.message);
    }
  }
);

export const getStudentById = createAsyncThunk(
  "employee/getStudentById",
  async (_id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/student/${_id}`);
      return data.student;
    } catch (error) {
      return rejectWithValue(error.response?.data.message || error.message);
    }
  }
);

export const createStudent = createAsyncThunk(
  "employee/createStudent",
  async (student, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(`/student`, student);
      toast.success(data.message);
      return data.student;
    } catch (error) {
      toast.error(error.responce.data.message);
      return rejectWithValue(error.response?.data.message || error.message);
    }
  }
);

export const updateStudent = createAsyncThunk(
  "employee/updateStudent",
  async ({ _id, student }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.patch(`/student/${_id}`, student);
      toast.success(data.message);
      return data.student;
    } catch (error) {
      toast.error(error.responce.data.message);
      return rejectWithValue(error.response?.data.message || error.message);
    }
  }
);

export const deleteStudent = createAsyncThunk(
  "employee/deleteStudent",
  async (_id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.delete(`/student/${_id}`);
      toast.success(data.message);
      return _id;
    } catch (error) {
      toast.error(error.responce.data.message);
      return rejectWithValue(error.response?.data.message || error.message);
    }
  }
);
