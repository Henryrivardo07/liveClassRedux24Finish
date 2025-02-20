import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Mendefinisikan tipe data untuk state dialog
interface DialogState {
  isOpen: boolean; // Menyimpan status apakah dialog sedang terbuka atau tidak
  variant: 'success' | 'info' | 'danger'; // Menentukan jenis dialog (sukses, informasi, atau bahaya)
  title: string; // Judul dialog
  message: string; // Pesan yang ditampilkan di dialog
  primaryButtonTitle: string; // Teks pada tombol utama
  secondaryButtonTitle: string; // Teks pada tombol sekunder
  isSubmitting: boolean; // Status apakah aksi dalam dialog sedang diproses
}

// State awal untuk dialog
const initialState: DialogState = {
  isOpen: false, // Secara default, dialog tidak terbuka
  variant: 'info', // Variasi dialog default adalah "info"
  title: '',
  message: '',
  primaryButtonTitle: '',
  secondaryButtonTitle: '',
  isSubmitting: false, // Secara default, tidak dalam proses submitting
};

// Membuat slice Redux untuk mengelola state dialog
const dialogSlice = createSlice({
  name: 'dialog', // Nama slice untuk Redux
  initialState, // Menggunakan initialState yang sudah didefinisikan
  reducers: {
    // **Reducer untuk membuka dialog**
    openDialog: (
      state,
      action: PayloadAction<Omit<DialogState, 'isOpen' | 'isSubmitting'>>
    ) => {
      return {
        ...state,
        ...action.payload,
        isOpen: true, // Mengubah status dialog menjadi terbuka
        isSubmitting: false, // Reset isSubmitting saat dialog dibuka
      };
    },

    // **Reducer untuk menutup dialog**
    closeDialog: (state) => {
      state.isOpen = false; // Menutup dialog
      state.isSubmitting = false; // Reset isSubmitting ketika dialog ditutup
    },

    // **Reducer untuk mengatur status submitting**
    setSubmitting: (state, action: PayloadAction<boolean>) => {
      state.isSubmitting = action.payload; // Mengubah status isSubmitting berdasarkan payload
    },
  },
});

// Mengekspor actions agar bisa digunakan di komponen lain
export const { openDialog, closeDialog, setSubmitting } = dialogSlice.actions;

// Mengekspor reducer agar bisa digunakan dalam store Redux
export default dialogSlice.reducer;

/*

Pendefinisian DialogState

Ini adalah struktur dari state dialog yang mencakup berbagai informasi seperti status terbuka (isOpen), jenis dialog (variant), dan tombol-tombol.
Ditambahkan isSubmitting untuk mengetahui apakah proses sedang berjalan dalam dialog.
Pendefinisian initialState

Menetapkan nilai awal untuk state dialog.
Reducer openDialog

Menggunakan Omit<DialogState, 'isOpen' | 'isSubmitting'>, artinya action hanya akan menerima data selain isOpen dan isSubmitting.
Mengatur isOpen: true agar dialog terbuka.
Mengatur isSubmitting: false untuk memastikan saat dialog baru dibuka, status submitting selalu dalam keadaan tidak aktif.
Reducer closeDialog

Menutup dialog (isOpen = false).
Mengatur isSubmitting = false agar ketika dialog ditutup, proses yang berjalan juga dihentikan.
Reducer setSubmitting

Mengubah isSubmitting berdasarkan action yang dikirimkan.
Ekspor openDialog, closeDialog, setSubmitting

Agar bisa digunakan di komponen React lain untuk mengontrol dialog.
Ekspor dialogSlice.reducer

Reducer ini akan digunakan dalam store.ts.
*/
