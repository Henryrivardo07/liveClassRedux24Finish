import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ToastState {
  message: string;
  variant: 'success' | 'error' | 'info';
  isVisible: boolean;
}

const initialState: ToastState = {
  message: '',
  variant: 'info',
  isVisible: false,
};

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    showToast: (
      state,
      action: PayloadAction<Omit<ToastState, 'isVisible'>>
    ) => {
      return { ...action.payload, isVisible: true };
    },
    hideToast: (state) => {
      return { ...state, isVisible: false };
    },
  },
});

export const { showToast, hideToast } = toastSlice.actions;
export default toastSlice.reducer;
