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

const getIcon = (variant: 'success' | 'info' | 'danger') => {
  switch (variant) {
    case 'danger':
      return <FaExclamationCircle color='red' size={48} />;
    case 'success':
      return <FaCheckCircle color='green' size={48} />;
    case 'info':
      return <FaInfoCircle color='blue' size={48} />;
    default:
      throw new Error(`Unhandled type: ${variant}`);
  }
};

export const Dialog: React.FC = () => {
  const {
    isOpen,
    variant,
    title,
    message,
    primaryButtonTitle,
    secondaryButtonTitle,
    isSubmitting,
  } = useSelector((state: RootState) => state.dialog);
  const dispatch = useDispatch();

  // Fungsi untuk menutup dialog
  const handleCloseDialog = useCallback(() => {
    dispatch(closeDialog());
  }, [dispatch]);

  // Fungsi untuk menangani klik pada tombol utama
  const handleOnClickSubmitButton = useCallback(() => {
    if (!primaryButtonTitle) return;
    dispatch(setSubmitting(true));

    // Aksi konfirmasi dan logika untuk API call atau lainnya
    setTimeout(() => {
      dispatch(
        showToast({
          variant: 'success',
          message: 'Action confirmed successfully!',
        })
      );
      dispatch(closeDialog());
    }, 2000); // Simulate an API request
  }, [dispatch, primaryButtonTitle]);

  if (!isOpen) return null;

  return createPortal(
    <div className={styles.dialogWrapper}>
      <div className={styles.dialog}>
        <div className={styles.body}>
          <div className={styles.variantIcon}>
            <div className={styles.icon}>{getIcon(variant)}</div>
          </div>
          <div className={styles.content}>
            <p className={styles.title}>{title}</p>
            <p className={styles.description}>{message}</p>
          </div>
        </div>
        <div className={styles.footer}>
          {variant !== 'success' && primaryButtonTitle && (
            <Button
              color={variant === 'danger' ? 'danger' : 'primary'}
              isLoading={isSubmitting}
              onClick={handleOnClickSubmitButton}
            >
              {primaryButtonTitle}
            </Button>
          )}
          <Button
            color='secondary'
            disabled={isSubmitting}
            onClick={handleCloseDialog}
          >
            {secondaryButtonTitle}
          </Button>
        </div>
      </div>
    </div>,
    document.getElementById('portal') as HTMLElement
  );
};

/*
Penjelasan Tambahan:
DialogProps mendefinisikan properti yang diperlukan oleh komponen Dialog, termasuk tipe dialog, judul, pesan, tombol, dan fungsi-fungsi untuk menangani klik pada tombol.

getIcon adalah fungsi pembantu yang mengembalikan ikon sesuai dengan tipe dialog (danger, success, atau info). Ikon ini akan digunakan untuk menggambarkan jenis pesan dalam dialog.

createPortal digunakan untuk merender dialog ke dalam elemen DOM yang terpisah, biasanya ke dalam elemen dengan id portal yang ditempatkan di luar root DOM aplikasi. Ini memastikan bahwa dialog bisa ditampilkan di atas elemen lainnya dan tidak terpengaruh oleh struktur DOM yang ada.

Button adalah komponen yang digunakan untuk tombol dalam dialog. Tombol utama dan sekunder memiliki aksi yang berbeda tergantung pada apakah pengguna memilih untuk mengonfirmasi atau membatalkan.

useCallback digunakan untuk membungkus fungsi yang menangani klik tombol utama agar fungsi tersebut tidak diciptakan ulang setiap kali komponen dirender ulang. Ini dapat meningkatkan kinerja aplikasi dengan mencegah render yang tidak perlu.
*/
