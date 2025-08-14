import axiosInstance from "../axios/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export const getAllFunds = createAsyncThunk(
  "fund/getAllFunds",
  async (type, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/fund?type=${type}`);
      return data.fundRecords;
    } catch (error) {
      return rejectWithValue(error.response?.data.message || error.message);
    }
  }
);

export const getFundById = createAsyncThunk(
  "fund/getFundById",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/fund/${id}`);
      return data.fundRecord;
    } catch (error) {
      return rejectWithValue(error.response?.data.message || error.message);
    }
  }
);

export const createFund = createAsyncThunk(
  "fund/createFund",
  async (fund, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(`/fund`, fund);
      toast.success(data.message);
      return data.fundRecord;
    } catch (error) {
      return rejectWithValue(error.response?.data.message || error.message);
    }
  }
);

export const updateFund = createAsyncThunk(
  "fund/updateFund",
  async ({ id, fund }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.patch(`/fund/${id}`, fund);
      toast.success(data.message);
      return data.updatedFund;
    } catch (error) {
      return rejectWithValue(error.response?.data.message || error.message);
    }
  }
);

export const getAllDocuments = createAsyncThunk(
  "document/getAllDocuments",
  async (status, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/document?status=${status}`);
      return data.documentRecords;
    } catch (error) {
      return rejectWithValue(error.response?.data.message || error.message);
    }
  }
);

export const getDocumentById = createAsyncThunk(
  "document/getDocumentById",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/document/${id}`);
      return data.documentRecord;
    } catch (error) {
      return rejectWithValue(error.response?.data.message || error.message);
    }
  }
);

export const createDocumet = createAsyncThunk(
  "document/createFund",
  async (document, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(`/document`, document);
      toast.success(data.message);
      return data.documentRecord;
    } catch (error) {
      return rejectWithValue(error.response?.data.message || error.message);
    }
  }
);

export const updateDocument = createAsyncThunk(
  "document/updateDocument",
  async ({ id, document }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.patch(`/document/${id}`, document);
      toast.success(data.message);
      return data.updatedDocument;
    } catch (error) {
      return rejectWithValue(error.response?.data.message || error.message);
    }
  }
);
