import { configureStore } from '@reduxjs/toolkit'
import notificationsReducer from './notificationsReducer'

export const store = configureStore({
  reducer: {
    notifications: notificationsReducer,
    alerts: notificationsReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch