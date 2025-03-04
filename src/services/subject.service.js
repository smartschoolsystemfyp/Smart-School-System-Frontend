import axiosInstance from "../axios/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export const getAllSubjects = createAsyncThunk(
  "subject/getAllSubjects",
  async (classId, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/subject?classId=${classId}`);
      return data.subjects;
    } catch (error) {
      return rejectWithValue(error.response?.data.message || error.message);
    }
  }
);

export const getSubjectById = createAsyncThunk(
  "subject/getSubjectById",
  async (_id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/subject/${_id}`);
      return data.subject;
    } catch (error) {
      return rejectWithValue(error.response?.data.message || error.message);
    }
  }
);

export const createSubject = createAsyncThunk(
  "subject/createSubject",
  async (subject, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(`/subject`, subject);
      toast.success(data.message);
      return data.subject;
    } catch (error) {
      toast.error(error.responce.data.message);
      return rejectWithValue(error.response?.data.message || error.message);
    }
  }
);

export const updateSubject = createAsyncThunk(
  "subject/updateSubject",
  async ({ _id, subject }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.patch(`/subject/${_id}`, subject);
      toast.success(data.message);
      return data.subject;
    } catch (error) {
      toast.error(error.responce.data.message);
      return rejectWithValue(error.response?.data.message || error.message);
    }
  }
);

export const deleteSubject = createAsyncThunk(
  "subject/deleteSubject",
  async (_id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.delete(`/subject/${_id}`);
      toast.success(data.message);
      return _id;
    } catch (error) {
      toast.error(error.responce.data.message);
      return rejectWithValue(error.response?.data.message || error.message);
    }
  }
);
