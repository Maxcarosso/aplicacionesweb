import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart, increaseQuantity, decreaseQuantity } from '../store/cartSlice';
import Toast from 'react-native-root-toast';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

export default function CartScreen() {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.name}>{item.name}</Text>
      {item.selectedSize && (
        <Text style={styles.sizeLabel}>Talle: {item.selectedSize}</Text>
      )}
      <View style={styles.quantityRow}>
        <TouchableOpacity
          style={[styles.qtyButton, item.quantity === 1 && styles.qtyButtonDisabled]}
          onPress={() => { if (item.quantity > 1) { dispatch(decreaseQuantity({ id: item.id, selectedSize: item.selectedSize })); Toast.show('Cantidad disminuida', { duration: Toast.durations.SHORT, backgroundColor: '#ffa94d', textColor: '#fff' }); } }}
          disabled={item.quantity === 1}
        >
          <Text style={[styles.qtyButtonText, item.quantity === 1 && styles.qtyButtonTextDisabled]}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantity}>{item.quantity}</Text>
        <TouchableOpacity style={styles.qtyButton} onPress={() => { dispatch(increaseQuantity({ id: item.id, selectedSize: item.selectedSize })); Toast.show('Cantidad aumentada', { duration: Toast.durations.SHORT, backgroundColor: '#ffa94d', textColor: '#fff' }); }}>
          <Text style={styles.qtyButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.price}>Precio: ${item.price}</Text>
      <Text style={styles.total}>Subtotal: ${item.price * item.quantity}</Text>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => { dispatch(removeFromCart({ id: item.id, selectedSize: item.selectedSize })); Toast.show('Producto eliminado', { duration: Toast.durations.SHORT, backgroundColor: '#ff8800', textColor: '#fff' }); }}
      >
        <Text style={styles.removeButtonText}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  );

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Carrito de compras</Text>
        {cart.length === 0 ? (
          <Text style={styles.empty}>El carrito está vacío.</Text>
        ) : (
          <>
            <TouchableOpacity style={styles.clearButton} onPress={() => {
              Alert.alert(
                'Vaciar carrito',
                '¿Estás seguro de que quieres vaciar el carrito?',
                [
                  { text: 'Cancelar', style: 'cancel' },
                  { text: 'Sí, vaciar', style: 'destructive', onPress: () => { dispatch(clearCart()); Toast.show('Carrito vaciado', { duration: Toast.durations.SHORT, backgroundColor: '#ff8800', textColor: '#fff' }); } },
                ]
              );
            }}>
              <Text style={styles.clearButtonText}>Vaciar carrito</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.checkoutButton} onPress={() => navigation.navigate('Checkout')}>
              <Text style={styles.checkoutButtonText}>Ir a checkout</Text>
            </TouchableOpacity>
            <View style={styles.listWrapper}>
              <FlatList
                data={cart}
                keyExtractor={item => item.id.toString() + (item.selectedSize || '')}
                renderItem={renderItem}
                contentContainerStyle={styles.list}
                scrollEnabled={false}
              />
            </View>
          </>
        )}
        <Text style={styles.totalLabel}>Total: ${total}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f5f5f5' },
  container: { flexGrow: 1, padding: width * 0.05, alignItems: 'center', backgroundColor: '#f5f5f5' },
  title: { fontSize: width * 0.07, fontWeight: 'bold', color: '#ff8800', marginBottom: 16, textAlign: 'center' },
  empty: { fontSize: width * 0.045, color: '#888', textAlign: 'center', marginTop: 32 },
  listWrapper: { width: '100%' },
  list: { paddingBottom: 16 },
  item: { backgroundColor: '#ffe066', borderRadius: 12, padding: width * 0.04, marginBottom: 14, borderWidth: 1, borderColor: '#ffa94d', width: '100%', shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 6, shadowOffset: { width: 0, height: 2 }, elevation: 2 },
  name: { fontSize: width * 0.05, fontWeight: 'bold', color: '#ff8800' },
  sizeLabel: { fontSize: width * 0.04, color: '#ff8800', marginBottom: 4, fontWeight: 'bold' },
  quantityRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 8 },
  qtyButton: { backgroundColor: '#ffa94d', borderRadius: 4, paddingHorizontal: 12, paddingVertical: 4, marginHorizontal: 8 },
  qtyButtonDisabled: { backgroundColor: '#ddd' },
  qtyButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
  qtyButtonTextDisabled: { color: '#aaa' },
  quantity: { fontSize: width * 0.04, color: '#888' },
  price: { fontSize: width * 0.04, color: '#ff8800' },
  total: { fontSize: width * 0.04, color: '#ffa94d', fontWeight: 'bold' },
  totalLabel: { fontSize: width * 0.055, fontWeight: 'bold', color: '#ff8800', marginTop: 24, textAlign: 'center' },
  removeButton: { backgroundColor: '#ff8800', paddingVertical: 6, paddingHorizontal: 16, borderRadius: 4, marginTop: 8, alignSelf: 'flex-end' },
  removeButtonText: { color: '#fff', fontWeight: 'bold' },
  clearButton: { backgroundColor: '#ffa94d', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 6, alignSelf: 'center', marginBottom: 16 },
  clearButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  checkoutButton: { backgroundColor: '#ff8800', paddingVertical: 12, borderRadius: 8, marginBottom: 16, alignItems: 'center', width: '100%' },
  checkoutButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
}); 