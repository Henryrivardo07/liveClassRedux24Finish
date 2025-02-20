// Mengimpor useDispatch dari react-redux untuk mengirim aksi ke Redux store
import { useDispatch } from 'react-redux';

// Mengimpor tipe AppDispatch dari store untuk memberikan tipe yang benar
import { AppDispatch } from './store';

// Membuat custom hook useAppDispatch yang akan mengembalikan fungsi dispatch dengan tipe AppDispatch
export const useAppDispatch: () => AppDispatch = useDispatch;

/*
Penjelasan Singkat:

useDispatch adalah hook bawaan dari react-redux yang digunakan untuk mengirim aksi (dispatch) ke Redux store.
AppDispatch adalah tipe khusus dari dispatch yang didefinisikan dalam store.ts agar Redux Toolkit dapat memberikan tipe yang lebih aman saat memanggil aksi async atau thunk.
useAppDispatch adalah custom hook yang dibuat agar setiap kali kita memanggil dispatch, kita bisa langsung mendapatkan tipe yang benar tanpa harus mengetik ulang.

*/
