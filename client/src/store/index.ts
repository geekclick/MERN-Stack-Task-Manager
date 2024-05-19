import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./rootState";

export type RootState = ReturnType<typeof rootReducer>;

const persistConfig = {
  key: "root",
  storage,
  // whitelist: ["auth"], // List of reducers to persist (optional)
  blacklist: ["sidebarSlice", "projectSlice", "taskSlice","authSlice"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);
export { store, persistor };
