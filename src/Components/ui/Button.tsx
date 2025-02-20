import React from 'react';
import styles from '../../Components/Styles/Button.module.scss';

type ButtonProps = {
  color: 'primary' | 'secondary' | 'danger';
  onClick: () => void;
  isLoading?: boolean;
  children: React.ReactNode;
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  color,
  onClick,
  isLoading,
  children,
}) => {
  return (
    <button
      className={`${styles.btn} ${styles[color]} ${
        isLoading ? styles.loading : ''
      }`}
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  );
};

export default Button;
