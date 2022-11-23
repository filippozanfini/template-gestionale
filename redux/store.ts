import { configureStore } from "@reduxjs/toolkit";
import notificationsReducer from "../components/notifications/redux/notificationsReducer";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, notificationsReducer);

export const store = configureStore({
  reducer: {
    notifications: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).prepend(thunk),
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// @see https://redux-toolkit.js.org/usage/usage-with-typescript#getting-the-dispatch-type
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
