import { createSlice } from "@reduxjs/toolkit";
import {  getFeeStatus, markFeePaid } from "../services/fee.service";

const initialState = {
  fees: [],
  loading: false,
  error: null,
};

const feeSlice = createSlice({
  name: "fee",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handling the getFeeStatus action
      .addCase(getFeeStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFeeStatus.fulfilled, (state, action) => {
        state.fees = action.payload;
        state.loading = false;
      })
      .addCase(getFeeStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch fee status";
      })

      // Handling the markFeePaid action
      .addCase(markFeePaid.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(markFeePaid.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(markFeePaid.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to mark fee as paid";
      });
  },
});

export default feeSlice.reducer;
