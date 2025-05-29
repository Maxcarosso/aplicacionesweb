import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, selectedSize } = action.payload;
      const existing = state.items.find(
        item => item.id === id && item.selectedSize === selectedSize
      );
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        item => !(item.id === action.payload.id && item.selectedSize === action.payload.selectedSize)
      );
    },
    clearCart: (state) => {
      state.items = [];
    },
    increaseQuantity: (state, action) => {
      const { id, selectedSize } = action.payload;
      const item = state.items.find(
        item => item.id === id && item.selectedSize === selectedSize
      );
      if (item) item.quantity += 1;
    },
    decreaseQuantity: (state, action) => {
      const { id, selectedSize } = action.payload;
      const item = state.items.find(
        item => item.id === id && item.selectedSize === selectedSize
      );
      if (item && item.quantity > 1) item.quantity -= 1;
    },
    loadCart: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { addToCart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity, loadCart } = cartSlice.actions;
export default cartSlice.reducer; 