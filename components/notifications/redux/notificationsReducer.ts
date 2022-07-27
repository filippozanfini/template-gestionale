import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


export type NotificationType = "info" | "warning" | "error" | "success";
export interface NotificationItem {
    id: string,
    type: NotificationType,
    title: string,
    message: string,
    isAlert: boolean,
    read: boolean,
  }


export interface Notification {
   items: NotificationItem[]
}

const initialState: Notification = {
    items: [],
}

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    add: (state:Notification, action: PayloadAction<NotificationItem>) => {
      state.items.push(action.payload)
    },
    remove: (state:Notification, action: PayloadAction<NotificationItem>) => {
       state.items = [...state.items].filter( ({id}) => id !== action.payload.id );
    }
  },
})

export const { add, remove} = notificationsSlice.actions

export default notificationsSlice.reducer