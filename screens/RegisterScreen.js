import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import Toast from 'react-native-root-toast';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!email) return 'El email es obligatorio';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return 'El email no es válido';
    if (!password) return 'La contraseña es obligatoria';
    if (password.length < 6) return 'La contraseña debe tener al menos 6 caracteres';
    return '';
  };

  const handleRegister = async () => {
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError('');
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Toast.show('¡Registro exitoso! Ahora puedes iniciar sesión.', { duration: Toast.durations.SHORT, backgroundColor: '#ff8800', textColor: '#fff' });
      // El usuario será redirigido automáticamente si usas un listener en App.js
    } catch (e) {
      setError('No se pudo registrar. El email puede estar en uso o la contraseña es muy débil.');
      Toast.show('No se pudo registrar. El email puede estar en uso o la contraseña es muy débil.', { duration: Toast.durations.SHORT, backgroundColor: 'red', textColor: '#fff' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>
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
        placeholder="Contraseña (mínimo 6 caracteres)"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Registrarse</Text>}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>¿Ya tienes cuenta? Inicia sesión</Text>
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