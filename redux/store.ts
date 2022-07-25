import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit'
import notificationsReducer, {push, pop, remove, removeRead, markAsRead } from './notificationsReducer'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage,
}

// Create the middleware instance and methods
const listenerMiddleware = createListenerMiddleware()
const persistedReducer = persistReducer(persistConfig, notificationsReducer)


export const store = configureStore({
  reducer: {
    notifications: persistedReducer,
  },
  middleware: (getDefaultMiddleware) => [listenerMiddleware.middleware, ...getDefaultMiddleware({
    serializableCheck: false
  }), thunk],
  devTools: process.env.NODE_ENV !== 'production',
})

export const persistor = persistStore(store)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch