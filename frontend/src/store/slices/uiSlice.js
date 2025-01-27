import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    modal: {
      isOpened: false,
      action: null,
      activeChannelId: null,
    },
  },
  reducers: {
    closeModal: (state) => {
      state.modal.isOpened = false;
    },
    showModal: (state, action) => {
      const { action: modalAction, id } = action.payload;
      state.modal.isOpened = true;
      state.modal.action = modalAction;
      state.modal.activeChannelId = id;
    },
  },
});

export const { closeModal, showModal } = uiSlice.actions;
export default uiSlice.reducer;
