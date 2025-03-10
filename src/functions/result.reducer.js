import { createSlice } from "@reduxjs/toolkit";
import {
  updateMark,
  deleteMark,
  bulkUploadMarks,
  getMarks,
} from "../services/result.service";

const initialState = {
  marks: [],
  loading: false,
  error: null,
};

const resultSlice = createSlice({
  name: "marks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Handling the getMarks action
      .addCase(getMarks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMarks.fulfilled, (state, action) => {
        state.loading = false;
        state.marks = action.payload;
      })
      .addCase(getMarks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update mark";
      })
      // Handling the updateMark action
      .addCase(updateMark.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateMark.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateMark.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update mark";
      })

      // Handling the deleteMark action
      .addCase(deleteMark.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMark.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteMark.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete mark";
      })

      // Handling the bulkUploadMarks action
      .addCase(bulkUploadMarks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(bulkUploadMarks.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(bulkUploadMarks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to bulk upload marks";
      });
  },
});

export default resultSlice.reducer;
