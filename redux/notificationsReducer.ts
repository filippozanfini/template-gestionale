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
    push: (state:Notification, action: PayloadAction<NotificationItem>) => {
      state.items.push(action.payload)
    },
    pop: (state:Notification) => {
      state.items.pop();
    },
    remove: (state:Notification, action: PayloadAction<NotificationItem>) => {
       state.items = state.items.filter( ({id}) => id !== action.payload.id );
    },
    removeRead: (state:Notification) => {
        state.items = state.items.filter( ({read}) => read===false );
     },
    markAsRead: (state:Notification, action: PayloadAction<NotificationItem>) => {
        state.items = state.items.map( (item) => {
             return {...item, read: item.id === action.payload.id }
        } )
     }
  },
})

export const { push, pop, remove, removeRead, markAsRead } = notificationsSlice.actions

export default notificationsSlice.reducer