import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// **Mendefinisikan tipe data untuk setiap produk**
interface Product {
  id: number; // ID unik produk
  title: string; // Nama produk
  price: number; // Harga produk
  image: string; // URL gambar produk
}

// **Mendefinisikan tipe data untuk state produk dalam Redux**
interface ProductState {
  products: Product[]; // Array daftar produk
  loading: boolean; // Status loading saat mengambil data
  error: string | null; // Menyimpan pesan error jika terjadi kesalahan
}

// **State awal untuk produk**
const initialState: ProductState = {
  products: [], // Awalnya daftar produk kosong
  loading: false, // Tidak dalam keadaan loading
  error: null, // Tidak ada error awalnya
};

// **Thunk untuk mengambil daftar produk dari API**
export const fetchProducts = createAsyncThunk<Product[], void>(
  'products/fetchProducts', // Nama action yang digunakan dalam Redux
  async (_, { rejectWithValue }) => {
    try {
      // Mengambil data dari API
      const response = await fetch('https://fakestoreapi.com/products');

      // Jika respons tidak berhasil, lempar error
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status}`);
      }

      // Mengembalikan data produk dalam format JSON
      return await response.json();
    } catch (error: any) {
      // Jika terjadi error, kirim error ke Redux state
      return rejectWithValue(error.message || 'Unknown error');
    }
  }
);

// **Membuat slice Redux untuk mengelola state produk**
const productSlice = createSlice({
  name: 'products', // Nama slice
  initialState, // Menggunakan initialState yang telah didefinisikan
  reducers: {}, // Tidak ada reducers biasa, hanya menggunakan `extraReducers`

  extraReducers: (builder) => {
    builder
      // **Menangani status saat permintaan fetchProducts dimulai**
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true; // Mengatur loading menjadi true
        state.error = null; // Menghapus error sebelumnya jika ada
      })

      // **Menangani status saat permintaan fetchProducts berhasil**
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.products = action.payload; // Menyimpan produk ke dalam state
          state.loading = false; // Mengatur loading menjadi false
        }
      )

      // **Menangani status saat permintaan fetchProducts gagal**
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false; // Mengatur loading menjadi false
        state.error = action.error.message || 'Failed to fetch products'; // Menyimpan pesan error
      });
  },
});

// **Mengekspor reducer agar bisa digunakan dalam store Redux**
export default productSlice.reducer;

/*
Pendefinisian Interface Product dan ProductState

Product digunakan untuk mendefinisikan struktur data produk.
ProductState digunakan untuk mendefinisikan struktur state di Redux.
Pendefinisian initialState

Menyimpan daftar produk (products) sebagai array kosong.
loading: false artinya tidak sedang mengambil data.
error: null artinya tidak ada error saat aplikasi pertama kali berjalan.
fetchProducts (Thunk Asinkron)

Menggunakan createAsyncThunk untuk melakukan API call ke https://fakestoreapi.com/products.
Jika data berhasil diambil, hasilnya dikembalikan sebagai Product[].
Jika terjadi error, error akan dikirim ke Redux dengan rejectWithValue.
Menggunakan extraReducers untuk menangani status async thunk

pending: Redux state loading = true untuk menunjukkan sedang mengambil data.
fulfilled: Jika sukses, data dari API disimpan dalam state.products.
rejected: Jika gagal, menyimpan pesan error dalam state.error.
export default productSlice.reducer;

Reducer ini diekspor agar bisa digunakan dalam store.ts.

*/
