import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { loadCart } from './store/cartSlice';

export default function CartPersistence() {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.items);

  useEffect(() => {
    AsyncStorage.getItem('cart').then(data => {
      if (data) dispatch(loadCart(JSON.parse(data)));
    });
  }, [dispatch]);

  useEffect(() => {
    AsyncStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return null;
} 