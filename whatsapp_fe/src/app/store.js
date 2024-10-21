import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userSlice } from "../features/userSlice.js";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import createFilter from "redux-persist-transform-filter";
// saveUserOnlyFilter
const saveUserOnlyFilter = createFilter("user", ["user"]);

// persist config
const persistConfig = {
  key: "user",
  storage, // check diff types
  whitelist: ["user"],
  transforms: [saveUserOnlyFilter],
};

const rootReducer = combineReducers({
  user: userSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: true,
});

export const persistor = persistStore(store);
