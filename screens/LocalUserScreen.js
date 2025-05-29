import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, ScrollView } from 'react-native';
import { createUserTable, insertUser, getUsers } from '../db';

export default function LocalUserScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    createUserTable();
    getUsers(setUsers);
  }, []);

  const handleAddUser = () => {
    if (!name || !email) return;
    insertUser(name, email, () => getUsers(setUsers));
    setName('');
    setEmail('');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Usuarios locales (SQLite)</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Button title="Guardar usuario local" onPress={handleAddUser} />
      <Text style={styles.subtitle}>Usuarios guardados localmente:</Text>
      {users.map(u => (
        <Text key={u.id} style={styles.user}>{u.name} - {u.email}</Text>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, alignItems: 'center', padding: 24, backgroundColor: '#f5f5f5' },
  title: { fontSize: 22, fontWeight: 'bold', color: '#ff8800', marginBottom: 16 },
  input: { width: '100%', maxWidth: 340, backgroundColor: '#fff', borderRadius: 8, padding: 14, marginBottom: 12, borderWidth: 1, borderColor: '#ffa94d', fontSize: 16 },
  subtitle: { fontSize: 18, color: '#888', marginTop: 24, marginBottom: 8 },
  user: { fontSize: 16, color: '#333', marginBottom: 4 },
}); 