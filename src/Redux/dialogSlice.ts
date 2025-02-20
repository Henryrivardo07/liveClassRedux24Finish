import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DialogState {
  isOpen: boolean;
  variant: 'success' | 'info' | 'danger';
  title: string;
  message: string;
  primaryButtonTitle: string;
  secondaryButtonTitle: string;
  isSubmitting: boolean; // Tambahkan ini
}

const initialState: DialogState = {
  isOpen: false,
  variant: 'info',
  title: '',
  message: '',
  primaryButtonTitle: '',
  secondaryButtonTitle: '',
  isSubmitting: false, // Tambahkan ini
};

const dialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    openDialog: (
      state,
      action: PayloadAction<Omit<DialogState, 'isOpen' | 'isSubmitting'>>
    ) => {
      return { ...state, ...action.payload, isOpen: true, isSubmitting: false };
    },
    closeDialog: (state) => {
      state.isOpen = false;
      state.isSubmitting = false; // Reset submitting saat ditutup
    },
    setSubmitting: (state, action: PayloadAction<boolean>) => {
      state.isSubmitting = action.payload;
    },
  },
});

export const { openDialog, closeDialog, setSubmitting } = dialogSlice.actions; // ✅ Pastikan setSubmitting diekspor
export default dialogSlice.reducer;
