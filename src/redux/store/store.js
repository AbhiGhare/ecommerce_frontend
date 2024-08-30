import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../slice/productSlice.js';
import userReducer from '../slice/userSlice.js'
import cartReducer from '../slice/cartSlice'
import favoritesReducer from '../slice/favoritesSlice.js'
export const store = configureStore({
  reducer: {
    products: productReducer,
    user: userReducer,
    cart: cartReducer,
    favorites: favoritesReducer,
  },
});
