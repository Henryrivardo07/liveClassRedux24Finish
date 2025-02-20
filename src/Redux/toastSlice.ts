import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// **Mendefinisikan tipe data untuk state toast**
interface ToastState {
  message: string; // Pesan yang akan ditampilkan di toast
  variant: 'success' | 'error' | 'info'; // Jenis toast (sukses, error, atau info)
  isVisible: boolean; // Status apakah toast sedang ditampilkan atau tidak
}

// **State awal untuk toast**
const initialState: ToastState = {
  message: '', // Awalnya tidak ada pesan
  variant: 'info', // Default varian adalah 'info'
  isVisible: false, // Awalnya toast tidak terlihat
};

// **Membuat slice Redux untuk mengelola state toast**
const toastSlice = createSlice({
  name: 'toast', // Nama slice Redux
  initialState, // Menggunakan state awal yang telah didefinisikan
  reducers: {
    // **Menampilkan toast dengan pesan tertentu**
    showToast: (
      state,
      action: PayloadAction<Omit<ToastState, 'isVisible'>> // Menggunakan Omit agar 'isVisible' tidak perlu dikirim dari action
    ) => {
      state.message = action.payload.message; // Menyimpan pesan toast
      state.variant = action.payload.variant; // Menyimpan jenis toast (success, error, info)
      state.isVisible = true; // Mengatur toast agar terlihat
    },

    // **Menyembunyikan toast**
    hideToast: (state) => {
      state.isVisible = false; // Mengatur toast agar tidak terlihat
    },
  },
});

// **Mengekspor action agar bisa digunakan di komponen lain**
export const { showToast, hideToast } = toastSlice.actions;

// **Mengekspor reducer agar bisa digunakan dalam store Redux**
export default toastSlice.reducer;

/*
Pendefinisian Interface ToastState

message: Menyimpan teks pesan yang akan ditampilkan.
variant: Jenis toast (success, error, atau info).
isVisible: Status apakah toast sedang ditampilkan (true) atau tidak (false).
Pendefinisian initialState

message: '' → Tidak ada pesan saat pertama kali aplikasi berjalan.
variant: 'info' → Default menggunakan tipe informasi.
isVisible: false → Tidak ditampilkan saat pertama kali aplikasi berjalan.
Reducer showToast

Action ini menerima message dan variant.
Mengatur state message, variant, dan membuat isVisible = true.
Reducer hideToast

Action ini hanya mengubah isVisible = false untuk menyembunyikan toast.
Mengekspor showToast & hideToast

Digunakan di komponen agar bisa memicu muncul atau hilangnya toast.
Mengekspor reducer

Agar bisa digunakan dalam store.ts.

*/
