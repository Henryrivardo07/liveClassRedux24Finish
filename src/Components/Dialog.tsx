import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/Redux/store';
import { closeDialog, setSubmitting } from '@/Redux/dialogSlice';
import { showToast } from '@/Redux/toastSlice';
import { createPortal } from 'react-dom';
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaInfoCircle,
} from 'react-icons/fa';
import styles from '../Components/Styles/Dialog.module.scss';
import Button from '@/Components/ui/Button';

// Fungsi untuk mendapatkan ikon berdasarkan jenis dialog (variant)
const getIcon = (variant: 'success' | 'info' | 'danger') => {
  switch (variant) {
    case 'danger':
      return <FaExclamationCircle color='red' size={48} />; // Ikon peringatan merah
    case 'success':
      return <FaCheckCircle color='green' size={48} />; // Ikon sukses hijau
    case 'info':
      return <FaInfoCircle color='blue' size={48} />; // Ikon informasi biru
    default:
      throw new Error(`Unhandled type: ${variant}`); // Jika ada tipe yang tidak dikenal, lempar error
  }
};

// Komponen utama Dialog
export const Dialog: React.FC = () => {
  // Mengambil state dialog dari Redux
  const {
    isOpen, // Apakah dialog terbuka atau tidak
    variant, // Jenis dialog (success, info, danger)
    title, // Judul dialog
    message, // Pesan dalam dialog
    primaryButtonTitle, // Teks tombol utama
    secondaryButtonTitle, // Teks tombol sekunder
    isSubmitting, // Status loading saat tombol utama ditekan
  } = useSelector((state: RootState) => state.dialog);

  const dispatch = useDispatch(); // Untuk mengirim aksi ke Redux Store

  // Fungsi untuk menutup dialog
  const handleCloseDialog = useCallback(() => {
    dispatch(closeDialog()); // Dispatch aksi untuk menutup dialog
  }, [dispatch]);

  // Fungsi untuk menangani klik tombol utama
  const handleOnClickSubmitButton = useCallback(() => {
    if (!primaryButtonTitle) return; // Jika tombol utama tidak ada, tidak melakukan apa-apa

    dispatch(setSubmitting(true)); // Set state isSubmitting menjadi true (loading)

    // Simulasi API call atau proses lainnya
    setTimeout(() => {
      dispatch(
        showToast({
          variant: 'success', // Tampilkan toast sukses
          message: 'Action confirmed successfully!', // Pesan toast
        })
      );
      dispatch(closeDialog()); // Tutup dialog setelah aksi selesai
    }, 2000); // Simulasi delay 2 detik
  }, [dispatch, primaryButtonTitle]);

  // Jika dialog tidak terbuka, return null agar tidak dirender
  if (!isOpen) return null;

  return createPortal(
    <div className={styles.dialogWrapper}>
      <div className={styles.dialog}>
        <div className={styles.body}>
          {/* Bagian ikon sesuai dengan variant */}
          <div className={styles.variantIcon}>
            <div className={styles.icon}>{getIcon(variant)}</div>
          </div>

          {/* Bagian konten dialog */}
          <div className={styles.content}>
            <p className={styles.title}>{title}</p> {/* Judul dialog */}
            <p className={styles.description}>{message}</p> {/* Pesan dialog */}
          </div>
        </div>

        {/* Footer dialog dengan tombol aksi */}
        <div className={styles.footer}>
          {/* Tombol utama, hanya ditampilkan jika variant bukan 'success' */}
          {variant !== 'success' && primaryButtonTitle && (
            <Button
              color={variant === 'danger' ? 'danger' : 'primary'}
              isLoading={isSubmitting} // Tampilkan loading jika isSubmitting true
              onClick={handleOnClickSubmitButton} // Aksi ketika tombol utama ditekan
            >
              {primaryButtonTitle}
            </Button>
          )}
          {/* Tombol sekunder untuk menutup dialog */}
          <Button
            color='secondary'
            disabled={isSubmitting} // Nonaktifkan jika sedang loading
            onClick={handleCloseDialog} // Aksi ketika tombol sekunder ditekan
          >
            {secondaryButtonTitle}
          </Button>
        </div>
      </div>
    </div>,
    document.getElementById('portal') as HTMLElement // Menggunakan portal agar dialog ditampilkan di luar root utama
  );
};
