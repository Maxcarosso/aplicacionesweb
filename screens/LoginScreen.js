import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import Toast from 'react-native-root-toast';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!email) return 'El email es obligatorio';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return 'El email no es válido';
    if (!password) return 'La contraseña es obligatoria';
    return '';
  };

  const handleLogin = async () => {
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError('');
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Toast.show('¡Bienvenido!', { duration: Toast.durations.SHORT, backgroundColor: '#ff8800', textColor: '#fff' });
      // El usuario será redirigido automáticamente si usas un listener en App.js
    } catch (e) {
      setError('Email o contraseña incorrectos');
      Toast.show('Email o contraseña incorrectos', { duration: Toast.durations.SHORT, backgroundColor: 'red', textColor: '#fff' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Entrar</Text>}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Registro')}>
        <Text style={styles.link}>¿No tienes cuenta? Regístrate</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5', padding: 24 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#ff8800', marginBottom: 32 },
  input: { width: '100%', maxWidth: 340, backgroundColor: '#fff', borderRadius: 8, padding: 14, marginBottom: 16, borderWidth: 1, borderColor: '#ffa94d', fontSize: 16 },
  button: { backgroundColor: '#ff8800', paddingVertical: 14, borderRadius: 8, alignItems: 'center', width: '100%', maxWidth: 340, marginTop: 8 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
  error: { color: 'red', marginBottom: 12, fontSize: 16 },
  link: { color: '#007bff', marginTop: 18, fontSize: 16 },
}); 