import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { fetchProducts } from '@/Redux/productSlice';
import { addToCart } from '@/Redux/cartSlice';
import { RootState } from '@/Redux/store';
import { useAppDispatch } from '@/Redux/hooks';
import { openDialog, closeDialog } from '@/Redux/dialogSlice';
import { showToast } from '@/Redux/toastSlice';
import styles from './Styles/ProductList.module.scss';

const ProductList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { products, loading, error } = useSelector(
    (state: RootState) => state.products
  );
  const dialogState = useSelector((state: RootState) => state.dialog); // Debug Redux state

  // Gunakan useRef untuk menyimpan confirm action
  const confirmActionRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    dispatch(fetchProducts())
      .unwrap()
      .then((data) => console.log('Fetched products:', data))
      .catch((err) => console.error('Failed to fetch products:', err));
  }, [dispatch]);

  const handleAddToCart = (product: any) => {
    dispatch(addToCart(product));
    console.log("Handling 'Add to Cart' action");

    confirmActionRef.current = () => {
      console.log('Adding product to cart:', product);
      dispatch(addToCart(product));
      dispatch(
        showToast({
          message: `${product.title} added to cart!`,
          variant: 'success',
        })
      );
      dispatch(closeDialog());
    };

    console.log('Dispatching openDialog...'); // Debug
    dispatch(
      openDialog({
        variant: 'info',
        title: 'Add to Cart',
        message: `Are you sure you want to add ${product.title} to your cart?`,
        primaryButtonTitle: 'Yes, Add',
        secondaryButtonTitle: 'Cancel',
      })
    );
  };

  console.log('Dialog State:', dialogState); // Debug Redux dialog state

  if (loading) return <p className={styles.loading}>Loading...</p>;
  if (error) return <p className={styles.error}>Error: {error}</p>;

  return (
    <div className={styles.container}>
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
              onClick={() => handleAddToCart(product)}
              className={styles.button}
            >
              Add to Cart
            </button>
          </div>
        ))
      ) : (
        <p className={styles.empty}>No products available</p>
      )}

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
