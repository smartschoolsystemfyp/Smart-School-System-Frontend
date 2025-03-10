import axiosInstance from "../axios/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export const getMarks = createAsyncThunk(
  "marks/getMarks",
  async (marksFilter, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(
        `/marks?subjectId=${marksFilter.selectedSubject}&examType=${marksFilter.selectedExamType}`
      );
      return data.marks;
    } catch (error) {
      return rejectWithValue(error.response?.data.message || error.message);
    }
  }
);

export const updateMark = createAsyncThunk(
  "marks/updateMark",
  async (mark, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.patch(`/marks`, mark);
      toast.success(data.message);
      return data.mark;
    } catch (error) {
      return rejectWithValue(error.response?.data.message || error.message);
    }
  }
);

export const deleteMark = createAsyncThunk(
  "marks/deleteMark",
  async (_id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.delete(`/marks/${_id}`);
      toast.success(data.message);
      return data.mark;
    } catch (error) {
      return rejectWithValue(error.response?.data.message || error.message);
    }
  }
);

export const bulkUploadMarks = createAsyncThunk(
  "marks/bulkUploadMarks",
  async (marks, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(`/marks/bulk`, marks);
      console.log(data);
      toast.success(data.message);
      return data.marks;
    } catch (error) {
      return rejectWithValue(error.response?.data.message || error.message);
    }
  }
);
