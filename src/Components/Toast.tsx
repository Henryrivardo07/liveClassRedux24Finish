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

const getIcon = (variant: 'success' | 'error' | 'info') => {
  switch (variant) {
    case 'success':
      return <FaCheckCircle color='green' size={24} />;
    case 'error':
      return <FaExclamationCircle color='red' size={24} />;
    case 'info':
      return <FaInfoCircle color='blue' size={24} />;
    default:
      return null;
  }
};

export const Toast: React.FC = () => {
  const { message, variant, isVisible } = useSelector(
    (state: RootState) => state.toast
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => dispatch(hideToast()), 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, dispatch]);

  if (!isVisible) return null;

  return (
    <div
      className={`${styles.toast} ${styles[variant]}`}
      onClick={() => dispatch(hideToast())}
    >
      <div className={styles.icon}>{getIcon(variant)}</div>
      <div className={styles.message}>{message}</div>
    </div>
  );
};
