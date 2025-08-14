import { createSlice } from "@reduxjs/toolkit";
import {
  createDocumet,
  createFund,
  getAllDocuments,
  getAllFunds,
  getDocumentById,
  getFundById,
  updateDocument,
  updateFund,
} from "../services/document&fund.service";

const initialState = {
  funds: [],
  documents: [],
  fund: null,
  doxument: null,
  loading: false,
  error: null,
};

const documentAndFundSlice = createSlice({
  name: "documet&fund",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handling the getAllDocuments action
      .addCase(getAllDocuments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllDocuments.fulfilled, (state, action) => {
        state.documents = action.payload;
        state.loading = false;
      })
      .addCase(getAllDocuments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch documents";
      })

      // Handling the getDocumentById action
      .addCase(getDocumentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDocumentById.fulfilled, (state, action) => {
        state.document = action.payload;
        state.loading = false;
      })
      .addCase(getDocumentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch document";
      })

      // Handling the createDocumet action
      .addCase(createDocumet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDocumet.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createDocumet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create documents";
      })

      // Handling the updateDocument action
      .addCase(updateDocument.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDocument.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateDocument.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update documents";
      })

      // Handling the getAllFunds action
      .addCase(getAllFunds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllFunds.fulfilled, (state, action) => {
        state.funds = action.payload;
        state.loading = false;
      })
      .addCase(getAllFunds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch funds";
      })

      // Handling the getFundById action
      .addCase(getFundById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFundById.fulfilled, (state, action) => {
        state.fund = action.payload;
        state.loading = false;
      })
      .addCase(getFundById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch fund";
      })

      // Handling the createFund action
      .addCase(createFund.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createFund.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createFund.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create funds";
      })

      // Handling the updateFund action
      .addCase(updateFund.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateFund.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateFund.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update funds";
      });
  },
});

export default documentAndFundSlice.reducer;
