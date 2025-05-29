# Ecommerce App (Expo + Firebase + Redux + SQLite)

Esta es una app de ecommerce desarrollada con React Native (Expo), Firebase (Auth, Firestore, Storage), Redux y persistencia local con SQLite.

## Funcionalidades principales
- Registro e inicio de sesión con Firebase Auth (email/contraseña)
- Edición de perfil de usuario (nombre, foto de perfil)
- Carrito de compras global y persistente (Redux + AsyncStorage)
- Catálogo y detalle de productos
- Checkout y resumen de compra
- Persistencia local de datos con SQLite (ejemplo)
- Feedback visual con toasts y loaders
- UI responsive y moderna

## Instalación y configuración

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/tuusuario/tu-repo.git
   cd tu-repo
   ```

2. **Instala las dependencias:**
   ```bash
   npm install
   npx expo install expo-sqlite expo-image-picker
   ```

3. **Configura Firebase:**
   - Copia el archivo `firebaseConfig.example.js` a `firebaseConfig.js`.
   - Completa los datos de tu proyecto Firebase en `firebaseConfig.js`.

4. **Inicia la app:**
   ```bash
   npm start
   ```
   - Escanea el QR con Expo Go o usa un emulador.

## Notas de seguridad
- **No subas tu archivo `firebaseConfig.js` al repositorio.**
- Configura reglas de seguridad en Firestore y Storage para proteger los datos de tus usuarios.

## Estructura de carpetas
- `/screens`: Pantallas principales de la app
- `/store`: Redux store y slices
- `/db.js`: Configuración y helpers de SQLite
- `/firebaseConfig.js`: Configuración de Firebase (no subir a git)

## Créditos y licencias
- Desarrollado por [Tu Nombre]
- Licencia MIT

---

¡Contribuciones y sugerencias son bienvenidas! 