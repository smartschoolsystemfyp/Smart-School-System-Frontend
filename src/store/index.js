import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import student from "../functions/student.reducer";
import fee from "../functions/fee.reducer";
import staff from "../functions/staff.reducer";
import marks from "../functions/result.reducer.js";
import subject from "../functions/subject.reducer";
import classes from "../functions/class.reducer.js";
import attendance from "../functions/attendance.reducer.js";
import authentication from "../functions/authentication.reducer";
import combine from "../functions/document&fund.reducre.js";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["authentication"],
};

const rootReducer = combineReducers({
  fee,
  marks,
  student,
  staff,
  subject,
  combine,
  classes,
  attendance,
  authentication,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: import.meta.env.VITE_ENV !== "production",
});

export const persistor = persistStore(store);

export default store;
