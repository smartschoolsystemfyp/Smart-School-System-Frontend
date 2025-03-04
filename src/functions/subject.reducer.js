import { createSlice } from "@reduxjs/toolkit";
import {
  getAllSubjects,
  createSubject,
  updateSubject,
  deleteSubject,
  getSubjectById,
} from "../services/subject.service";

const initialState = {
  subjects: [],
  subject : null,
  loading: false,
  error: null,
};

const subjectSlice = createSlice({
  name: "subject",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handling the getAllSubjects action
      .addCase(getAllSubjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllSubjects.fulfilled, (state, action) => {
        state.subjects = action.payload;
        state.loading = false;
      })
      .addCase(getAllSubjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch subjects";
      })

      // Handling the getSubjectById action
      .addCase(getSubjectById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSubjectById.fulfilled, (state, action) => {
        state.subject = action.payload;
        state.loading = false;
      })
      .addCase(getSubjectById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch subjects";
      })

      // Handling the createSubject action
      .addCase(createSubject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSubject.fulfilled, (state, action) => {
        state.subjects.push(action.payload);
        state.loading = false;
      })
      .addCase(createSubject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create subject";
      })

      // Handling the updateSubject action
      .addCase(updateSubject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSubject.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateSubject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update subject";
      })

      // Handling the deleteSubject action
      .addCase(deleteSubject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSubject.fulfilled, (state, action) => {
        state.subjects = state.subjects.filter(
          (subject) => subject._id !== action.payload
        );
        state.loading = false;
      })
      .addCase(deleteSubject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete subject";
      });
  },
});

export default subjectSlice.reducer;
