import React, { useLayoutEffect, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PRODUCTS } from '../data/products';
import { useSelector } from 'react-redux';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function CatalogScreen({ navigation }) {
  const cart = useSelector(state => state.cart.items);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const [userEmail, setUserEmail] = React.useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUserEmail(firebaseUser?.email || '');
    });
    return unsubscribe;
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Perfil')} accessibilityLabel="Ir a perfil" accessibilityRole="button">
          <Text style={{ color: '#ff8800', fontWeight: 'bold', fontSize: 16 }}>{userEmail}</Text>
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => navigation.navigate('Carrito')} style={{ marginRight: 16 }} accessibilityLabel="Ir al carrito" accessibilityRole="button">
            <View>
              <MaterialIcons name="shopping-cart" size={28} color="#ff8800" />
              {totalItems > 0 && (
                <View style={{
                  position: 'absolute',
                  right: -6,
                  top: -6,
                  backgroundColor: '#ff8800',
                  borderRadius: 10,
                  minWidth: 20,
                  height: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingHorizontal: 5,
                }}>
                  <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 12 }}>{totalItems}</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => signOut(auth)} style={{ marginRight: 8 }} accessibilityLabel="Cerrar sesión" accessibilityRole="button">
            <MaterialIcons name="logout" size={24} color="#ff8800" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, totalItems, userEmail]);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={item.image}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.brand}>{item.brand}</Text>
      <Text style={styles.price}>${item.price}</Text>
      <TouchableOpacity
        style={styles.detailButton}
        onPress={() => navigation.navigate('Detalle', { product: item })}
        accessibilityLabel={`Ver detalle de ${item.name}`}
        accessibilityRole="button"
      >
        <MaterialIcons name="info-outline" size={20} color="#fff" style={{ marginRight: 6 }} />
        <Text style={styles.detailButtonText}>Ver Detalle</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Catálogo</Text>
        <FlatList
          data={PRODUCTS}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          scrollEnabled={false}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f5f5f5' },
  container: { flexGrow: 1, padding: width * 0.05, alignItems: 'center', backgroundColor: '#f5f5f5' },
  title: { fontSize: width * 0.07, fontWeight: 'bold', color: '#ff8800', marginBottom: 16, textAlign: 'center' },
  list: { paddingBottom: 16, width: '100%' },
  card: {
    backgroundColor: '#ffe066',
    borderRadius: 12,
    padding: width * 0.04,
    marginBottom: 18,
    alignItems: 'center',
    elevation: 2,
    borderWidth: 1,
    borderColor: '#ffa94d',
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  image: { width: width * 0.4, height: width * 0.4, marginBottom: 8, backgroundColor: '#eee', borderRadius: 8 },
  name: { fontSize: width * 0.05, fontWeight: 'bold', color: '#ff8800' },
  brand: { fontSize: width * 0.04, color: '#888' },
  price: { fontSize: width * 0.045, color: '#ff8800', marginTop: 4 },
  detailButton: { flexDirection: 'row', backgroundColor: '#ff8800', borderRadius: 6, paddingVertical: 8, paddingHorizontal: 18, marginTop: 10, alignItems: 'center', justifyContent: 'center' },
  detailButtonText: { color: '#fff', fontWeight: 'bold', fontSize: width * 0.04 },
});
