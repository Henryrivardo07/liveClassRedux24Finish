import { combineReducers } from 'redux'; // Import fungsi untuk menggabungkan beberapa reducer
import cartReducer from './cartSlice'; // Import reducer untuk cart
import productReducer from './productSlice'; // Import reducer untuk produk

// Menggabungkan semua reducer dalam satu rootReducer
const rootReducer = combineReducers({
  cart: cartReducer, // State cart dikelola oleh cartReducer
  products: productReducer, // State products dikelola oleh productReducer
});

export default rootReducer; // Export rootReducer agar bisa digunakan di store

/*
Penjelasan Singkat
combineReducers:
Redux hanya bisa memiliki satu reducer utama, jadi kita perlu menggabungkan beberapa reducer (misalnya cartReducer dan productReducer) menjadi satu dengan fungsi combineReducers.

cartReducer:
Mengelola state keranjang belanja (cartItems).

productReducer:
Mengelola state produk (products, loading, error).
*/
