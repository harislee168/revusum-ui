import { configureStore } from "@reduxjs/toolkit";
import reviewSummariesReducer from "../features/reviewSummariesSlice";

const store = configureStore({
  reducer: {
    reviewSummaries: reviewSummariesReducer
  }
})

export default store
