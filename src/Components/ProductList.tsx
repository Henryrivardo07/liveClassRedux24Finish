import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { fetchProducts } from '@/Redux/productSlice';
import { addToCart } from '@/Redux/cartSlice';
import { RootState } from '@/Redux/store';
import { useAppDispatch } from '@/Redux/hooks';
import { openDialog, closeDialog } from '@/Redux/dialogSlice';
import { showToast } from '@/Redux/toastSlice';
import styles from './Styles/ProductList.module.scss';

// Komponen ProductList untuk menampilkan daftar produk
const ProductList: React.FC = () => {
  const dispatch = useAppDispatch(); // Menggunakan dispatch dari Redux
  const { products, loading, error } = useSelector(
    (state: RootState) => state.products // Mengambil state produk dari Redux
  );
  const dialogState = useSelector((state: RootState) => state.dialog); // Mengambil state dialog dari Redux

  // Gunakan useRef untuk menyimpan fungsi konfirmasi sebelum eksekusi
  const confirmActionRef = useRef<(() => void) | null>(null);

  // Mengambil data produk dari Redux saat komponen pertama kali dimount
  useEffect(() => {
    dispatch(fetchProducts()) // Memanggil action fetchProducts dari Redux
      .unwrap()
      .then((data) => console.log('Fetched products:', data)) // Debug data produk
      .catch((err) => console.error('Failed to fetch products:', err)); // Debug error jika gagal
  }, [dispatch]);

  // Fungsi untuk menangani klik tombol "Add to Cart"
  const handleAddToCart = (product: any) => {
    dispatch(addToCart(product)); // Menambahkan produk ke keranjang
    console.log("Handling 'Add to Cart' action");

    // Menyimpan fungsi konfirmasi dalam ref untuk dijalankan nanti
    confirmActionRef.current = () => {
      console.log('Adding product to cart:', product);
      dispatch(addToCart(product)); // Menambahkan produk ke keranjang

      // Menampilkan notifikasi (toast) bahwa produk telah ditambahkan
      dispatch(
        showToast({
          message: `${product.title} has been added to your cart!`,
          variant: 'success',
        })
      );
      dispatch(closeDialog()); // Menutup dialog setelah aksi dikonfirmasi
    };

    console.log('Dispatching openDialog...'); // Debug

    // Membuka dialog konfirmasi
    dispatch(
      openDialog({
        variant: 'info', // Menampilkan ikon informasi
        title: 'Add to Cart', // Judul dialog
        message: `Are you sure you want to add ${product.title} to your cart?`, // Pesan konfirmasi
        primaryButtonTitle: 'Yes, Add', // Tombol utama untuk menambahkan
        secondaryButtonTitle: 'Cancel', // Tombol untuk membatalkan
      })
    );
  };

  console.log('Dialog State:', dialogState); // Debug state dialog dari Redux

  // Jika sedang memuat, tampilkan pesan loading
  if (loading) return <p className={styles.loading}>Loading...</p>;
  // Jika terjadi error saat memuat produk, tampilkan pesan error
  if (error) return <p className={styles.error}>Error: {error}</p>;

  return (
    <div className={styles.container}>
      {/* Jika ada produk, tampilkan daftar produk */}
      {products.length > 0 ? (
        products.map((product) => (
          <div key={product.id} className={styles.card}>
            <img
              src={product.image}
              alt={product.title}
              className={styles.image}
            />
            <p className={styles.title}>
              {product.title} -{' '}
              <span className={styles.price}>${product.price}</span>
            </p>
            <button
              onClick={() => handleAddToCart(product)} // Panggil handleAddToCart saat tombol diklik
              className={styles.button}
            >
              Add to Cart
            </button>
          </div>
        ))
      ) : (
        <p className={styles.empty}>No products available</p> // Jika tidak ada produk, tampilkan pesan kosong
      )}

      {/* Jika dialog terbuka dan ada aksi konfirmasi, tampilkan dialog */}
      {dialogState.isOpen && confirmActionRef.current && (
        <div className={styles.dialog}>
          <div className={styles.dialogContent}>
            <h2>{dialogState.title}</h2>
            <p>{dialogState.message}</p>
            <button onClick={confirmActionRef.current}>
              {dialogState.primaryButtonTitle}
            </button>
            <button onClick={() => dispatch(closeDialog())}>
              {dialogState.secondaryButtonTitle}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;

/*
Penjelasan Kode:
useEffect

Saat pertama kali komponen dimuat, useEffect akan memanggil fetchProducts untuk mengambil daftar produk dari server.
Menggunakan .unwrap() agar bisa menangkap error jika request gagal.
handleAddToCart

Saat tombol "Add to Cart" ditekan, fungsi ini akan:
Menyimpan fungsi konfirmasi ke useRef.
Menampilkan dialog konfirmasi menggunakan openDialog.
confirmActionRef

confirmActionRef.current menyimpan fungsi yang akan dijalankan setelah pengguna menekan tombol konfirmasi di dialog.
Jika tombol "Yes, Add" diklik, produk akan ditambahkan ke keranjang, notifikasi ditampilkan, dan dialog ditutup.
Dialog

Jika dialogState.isOpen === true dan confirmActionRef.current memiliki nilai, maka dialog akan muncul di UI.
Dua tombol disediakan: satu untuk mengonfirmasi (memanggil confirmActionRef.current), satu untuk membatalkan (memanggil closeDialog).
*/
