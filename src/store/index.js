import { configureStore, combineReducers } from "@reduxjs/toolkit";

import UserSlice from "./userSlice";

// Combine all your slices
const appReducer = combineReducers({
  user: UserSlice.reducer,
});

// Root reducer to reset all state on logout
const rootReducer = (state, action) => {
  if (action.type === "RESET") {
    state = undefined; // this clears the state for all slices
  }
  return appReducer(state, action);
};

// Configure store with rootReducer
const store = configureStore({
  reducer: rootReducer,
});

export default store;
