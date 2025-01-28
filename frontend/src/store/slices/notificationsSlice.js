/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: [],
  reducers: {
    addNotification: (state, action) => {
      state.push(action.payload);
    },
    resetNotifications: () => {
      return [];
    },
  },
});

export const { addNotification, resetNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;
