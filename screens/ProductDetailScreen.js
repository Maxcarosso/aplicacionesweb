// screens/ProductDetailScreen.js
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Button, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import Toast from 'react-native-root-toast';

const { width } = Dimensions.get('window');

export default function ProductDetailScreen({ route }) {
  const { product } = route.params;
  const dispatch = useDispatch();
  const [selectedSize, setSelectedSize] = useState(null);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Image source={product.image} style={styles.image} resizeMode="contain" />
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.brand}>{product.brand}</Text>
        <Text style={styles.price}>${product.price}</Text>
        <Text style={styles.title}>Talles disponibles:</Text>
        <View style={styles.sizesContainer}>
          {product.sizes.map((s) => (
            <TouchableOpacity
              key={s.size}
              style={[styles.sizeButton, selectedSize === s.size && styles.sizeButtonSelected]}
              onPress={() => setSelectedSize(s.size)}
            >
              <Text style={[styles.size, selectedSize === s.size && styles.sizeSelected]}>
                {s.size} ({s.stock} pares)
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.buttonWrapper}>
          <Button
            title="Agregar al carrito"
            onPress={() => {
              if (!selectedSize) {
                Toast.show('Selecciona una talla antes de agregar al carrito', { duration: Toast.durations.SHORT, backgroundColor: '#ffa94d', textColor: '#fff' });
                return;
              }
              dispatch(addToCart({ ...product, selectedSize }));
              Toast.show('Producto agregado al carrito', { duration: Toast.durations.SHORT, backgroundColor: '#ff8800', textColor: '#fff' });
            }}
            color="#ff8800"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f5f5f5' },
  container: { flexGrow: 1, alignItems: 'center', padding: width * 0.06, backgroundColor: '#f5f5f5' },
  image: { width: width * 0.6, height: width * 0.6, marginBottom: 16, backgroundColor: '#ffe066', borderRadius: 16, borderWidth: 2, borderColor: '#ffa94d' },
  name: { fontSize: width * 0.07, fontWeight: 'bold', color: '#ff8800', marginBottom: 4 },
  brand: { fontSize: width * 0.045, color: '#888' },
  price: { fontSize: width * 0.055, color: '#ff8800', marginVertical: 8 },
  title: { fontSize: width * 0.045, marginTop: 16, fontWeight: 'bold', color: '#ffa94d' },
  sizesContainer: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 8, justifyContent: 'center' },
  sizeButton: { borderWidth: 1, borderColor: '#ffa94d', borderRadius: 8, paddingHorizontal: 14, paddingVertical: 8, marginRight: 8, marginBottom: 8, backgroundColor: '#fff' },
  sizeButtonSelected: { backgroundColor: '#ffe066', borderColor: '#ff8800' },
  size: { fontSize: width * 0.04, color: '#888' },
  sizeSelected: { color: '#ff8800', fontWeight: 'bold' },
  buttonWrapper: { width: '100%', marginTop: 24 },
});