import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../store/cartSlice';
import Toast from 'react-native-root-toast';

const { width } = Dimensions.get('window');

export default function CheckoutScreen({ navigation }) {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    Toast.show('¡Compra finalizada con éxito!', { duration: Toast.durations.LONG, backgroundColor: '#ff8800', textColor: '#fff' });
    dispatch(clearCart());
    navigation.navigate('Catálogo');
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.name}>{item.name}</Text>
      {item.selectedSize && <Text style={styles.sizeLabel}>Talla: {item.selectedSize}</Text>}
      <Text style={styles.quantity}>Cantidad: {item.quantity}</Text>
      <Text style={styles.price}>Precio: ${item.price}</Text>
      <Text style={styles.total}>Subtotal: ${item.price * item.quantity}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Resumen de compra</Text>
        {cart.length === 0 ? (
          <Text style={styles.empty}>No hay productos en el carrito.</Text>
        ) : (
          <>
            <View style={styles.listWrapper}>
              <FlatList
                data={cart}
                keyExtractor={item => item.id.toString() + (item.selectedSize || '')}
                renderItem={renderItem}
                contentContainerStyle={styles.list}
                scrollEnabled={false}
              />
            </View>
            <Text style={styles.totalLabel}>Total: ${total}</Text>
            <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
              <Text style={styles.checkoutButtonText}>Finalizar compra</Text>
            </TouchableOpacity>
          </>
        )}
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
  quantity: { fontSize: width * 0.04, color: '#888' },
  price: { fontSize: width * 0.04, color: '#ff8800' },
  total: { fontSize: width * 0.04, color: '#ffa94d', fontWeight: 'bold' },
  totalLabel: { fontSize: width * 0.055, fontWeight: 'bold', color: '#ff8800', marginTop: 24, textAlign: 'center' },
  checkoutButton: { backgroundColor: '#ff8800', paddingVertical: 16, borderRadius: 10, marginTop: 24, alignItems: 'center', width: '100%', shadowColor: '#000', shadowOpacity: 0.12, shadowRadius: 8, shadowOffset: { width: 0, height: 2 }, elevation: 3 },
  checkoutButtonText: { color: '#fff', fontWeight: 'bold', fontSize: width * 0.05 },
}); 