import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

// Legacy reducers
import sessionReducer from "../redux/session";

// Modern RTK slices
import coursesReducer from "./slices/coursesSlice";

// Combine legacy and modern reducers
const rootReducer = combineReducers({
  // Legacy
  session: sessionReducer,

  // Modern RTK
  courses: coursesReducer,
});

// Configure store with RTK
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    const middleware = getDefaultMiddleware();

    // Add redux-logger in development
    if (import.meta.env.MODE !== "production") {
      import("redux-logger").then(({ createLogger }) => {
        middleware.concat(createLogger());
      });
    }

    return middleware;
  },
  devTools: import.meta.env.MODE !== "production",
});

export default store;
