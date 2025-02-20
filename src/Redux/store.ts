import { configureStore } from '@reduxjs/toolkit';
import productReducer from './productSlice';
import cartReducer from './cartSlice';
import toastReducer from './toastSlice';
import dialogReducer from './dialogSlice';

const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    toast: toastReducer,
    dialog: dialogReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
