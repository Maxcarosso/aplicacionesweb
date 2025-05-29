import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CatalogScreen from './screens/catalogScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import store from './store';
import CartScreen from './screens/CartScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import CartPersistence from './CartPersistence';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';
import ProfileScreen from './screens/ProfileScreen';
import LocalUserScreen from './screens/LocalUserScreen';
import { TransitionPresets } from '@react-navigation/stack';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) return null;

  return (
    <NavigationContainer>
      <StatusBar style="light" backgroundColor="#ff8800" />
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      >
        {user ? (
          <>
            <Stack.Screen name="Catálogo" component={CatalogScreen} />
            <Stack.Screen name="Detalle" component={ProductDetailScreen} />
            <Stack.Screen name="Carrito" component={CartScreen} />
            <Stack.Screen name="Checkout" component={CheckoutScreen} />
            <Stack.Screen name="Perfil" component={ProfileScreen} />
            <Stack.Screen name="UsuariosLocales" component={LocalUserScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Registro" component={RegisterScreen} options={{ headerShown: false }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <CartPersistence />
      <AppNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
