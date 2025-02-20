import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/Redux/store';
import { removeFromCart } from '@/Redux/cartSlice';

import styles from './Styles/Cart.module.scss';

const Cart: React.FC = () => {
  // Mengambil data cartItems dari Redux store
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  // Mendapatkan fungsi dispatch langsung dari useDispatch
  const dispatch = useDispatch();

  // Fungsi untuk menangani penghapusan item dari cart
  const handleRemoveItem = (id: number) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className={styles.container}>
      {cartItems.length === 0 ? (
        <p className={styles.empty}>Cart is empty</p>
      ) : (
        <ul className={styles.list}>
          {cartItems.map((item) => (
            <li key={item.id} className={styles.item}>
              <img src={item.image} alt={item.title} className={styles.image} />
              <div className={styles.info}>
                <p className={styles.title}>
                  {item.title} -{' '}
                  <span className={styles.price}>${item.price}</span>
                </p>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className={styles.button}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
