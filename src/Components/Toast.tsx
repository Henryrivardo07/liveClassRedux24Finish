import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/Redux/store';
import { hideToast } from '@/Redux/toastSlice';
import styles from '../Components/Styles/Toast.module.scss';
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaInfoCircle,
} from 'react-icons/fa';

// Fungsi untuk mendapatkan ikon sesuai dengan jenis notifikasi (variant)
const getIcon = (variant: 'success' | 'error' | 'info') => {
  switch (variant) {
    case 'success':
      return <FaCheckCircle color='green' size={24} />; // Ikon untuk notifikasi sukses
    case 'error':
      return <FaExclamationCircle color='red' size={24} />; // Ikon untuk notifikasi error
    case 'info':
      return <FaInfoCircle color='blue' size={24} />; // Ikon untuk notifikasi info
    default:
      return null;
  }
};

// Komponen Toast untuk menampilkan notifikasi singkat di aplikasi
export const Toast: React.FC = () => {
  // Mengambil state toast dari Redux
  const { message, variant, isVisible } = useSelector(
    (state: RootState) => state.toast
  );
  const dispatch = useDispatch();

  // Mengatur waktu untuk menyembunyikan toast secara otomatis setelah 3 detik
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => dispatch(hideToast()), 3000);
      return () => clearTimeout(timer); // Membersihkan timeout jika komponen unmount atau state berubah
    }
  }, [isVisible, dispatch]);

  // Jika toast tidak terlihat, maka tidak menampilkan apapun (return null)
  if (!isVisible) return null;

  return (
    <div
      className={`${styles.toast} ${styles[variant]}`} // Menyesuaikan gaya toast berdasarkan variannya
      onClick={() => dispatch(hideToast())} // Toast bisa ditutup dengan klik
    >
      <div className={styles.icon}>{getIcon(variant)}</div>{' '}
      {/* Menampilkan ikon */}
      <div className={styles.message}>{message}</div> {/* Menampilkan pesan */}
    </div>
  );
};

/*
Penjelasan Kode:
getIcon(variant)

Fungsi ini menentukan ikon yang akan ditampilkan berdasarkan jenis notifikasi (success, error, atau info).
Menggunakan ikon dari pustaka react-icons/fa.
useSelector untuk mengambil state dari Redux

Mengambil message, variant, dan isVisible dari state.toast untuk menentukan apakah toast perlu ditampilkan dan bagaimana tampilannya.
useEffect untuk mengatur timeout

Jika isVisible bernilai true, maka setTimeout akan memanggil hideToast() setelah 3 detik.
Jika isVisible berubah atau komponen di-unmount, clearTimeout(timer) memastikan timer tidak berjalan terus-menerus.
Mengembalikan null jika toast tidak aktif

Ini memastikan toast tidak akan dirender saat isVisible === false.
Menggunakan class dinamis

styles[variant] menyesuaikan tampilan toast berdasarkan variannya (success, error, info).
Menutup toast dengan klik
Jika pengguna mengklik toast, maka hideToast() dipanggil untuk menyembunyikannya sebelum timeout otomatis berjalan.
*/
