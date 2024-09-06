// store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartReducer';
import { loadFromLocalStorage, saveToLocalStorage } from './helper';

const persistedCart = loadFromLocalStorage('cart');

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  preloadedState: {
    cart: persistedCart || { courses: [], cart: [] }, 
  },
});


store.subscribe(() => {
  saveToLocalStorage('cart', store.getState().cart);
});

export default store;
