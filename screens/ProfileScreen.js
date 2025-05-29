import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db, storage } from '../firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Toast from 'react-native-root-toast';

export default function ProfileScreen() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setEmail(firebaseUser?.email || '');
      if (firebaseUser) {
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setName(data.name || '');
          setPhoto(data.photoURL || null);
        }
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, allowsEditing: true, aspect: [1, 1], quality: 0.5 });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setPhoto(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      let photoURL = photo;
      const user = auth.currentUser;
      if (photo && photo.startsWith('file://')) {
        // Subir imagen a Firebase Storage
        const response = await fetch(photo);
        const blob = await response.blob();
        const storageRef = ref(storage, `profilePictures/${user.uid}`);
        await uploadBytes(storageRef, blob);
        photoURL = await getDownloadURL(storageRef);
      }
      await setDoc(doc(db, 'users', user.uid), { name, photoURL }, { merge: true });
      Alert.alert('Perfil actualizado');
      Toast.show('Perfil actualizado correctamente', { duration: Toast.durations.SHORT, backgroundColor: '#ff8800', textColor: '#fff' });
    } catch (e) {
      Alert.alert('Error al guardar el perfil');
      Toast.show('Error al guardar el perfil', { duration: Toast.durations.SHORT, backgroundColor: 'red', textColor: '#fff' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <View style={styles.container}><ActivityIndicator size="large" color="#ff8800" /></View>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil de usuario</Text>
      <TouchableOpacity onPress={handlePickImage} style={styles.avatarWrapper}>
        {photo ? (
          <Image source={{ uri: photo }} style={styles.avatar} />
        ) : (
          <View style={[styles.avatar, { justifyContent: 'center', alignItems: 'center' }]}>
            <Text style={{ color: '#aaa', fontSize: 32 }}>+</Text>
          </View>
        )}
      </TouchableOpacity>
      <Text style={styles.label}>Email:</Text>
      <Text style={styles.email}>{email}</Text>
      <Text style={styles.label}>Nombre:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Tu nombre"
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSave} disabled={saving}>
        <Text style={styles.saveButtonText}>{saving ? 'Guardando...' : 'Guardar cambios'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5', padding: 24 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#ff8800', marginBottom: 24 },
  label: { fontSize: 18, color: '#888', marginBottom: 4 },
  email: { fontSize: 20, color: '#333', marginBottom: 24, fontWeight: 'bold' },
  input: { width: '100%', maxWidth: 340, backgroundColor: '#fff', borderRadius: 8, padding: 14, marginBottom: 16, borderWidth: 1, borderColor: '#ffa94d', fontSize: 16 },
  avatarWrapper: { marginBottom: 16 },
  avatar: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#ffe066' },
  saveButton: { backgroundColor: '#ff8800', paddingVertical: 14, borderRadius: 8, alignItems: 'center', width: '100%', maxWidth: 340, marginTop: 8 },
  saveButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
}); 