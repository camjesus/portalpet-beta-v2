# 🐾 Portal Pet

Portal Pet es una aplicación móvil **independiente**, desarrollada de forma individual con **React Native + Expo**, que conecta personas con mascotas en adopción y permite reportar mascotas perdidas. Los usuarios pueden publicar mascotas, buscar por filtros, chatear con rescatistas y gestionar sus publicaciones.

---

## ✨ Funcionalidades principales

- 🔍 **Búsqueda de mascotas** — Swiper de mascotas con filtros por tipo, sexo y tamaño
- 📋 **Publicar mascotas** — Carga de foto, datos y ubicación de la mascota
- 💬 **Chat en tiempo real** — Comunicación entre usuarios y rescatistas vía Firebase
- 📍 **Geolocalización** — Integración con mapas para ubicar mascotas
- 🚨 **Reportes** — Reporte de mascotas perdidas o encontradas
- 🔐 **Autenticación** — Login con Google OAuth

---

## 🛠 Tecnologías

| Tecnología | Uso |
|---|---|
| React Native + Expo ~54 | Framework principal |
| Expo Router ~6 | Navegación basada en archivos |
| Firebase | Base de datos, autenticación y storage |
| Claude (Anthropic) | Pair programming, generación de código y resolución de problemas técnicos |
| expo-auth-session | Google OAuth |
| expo-location | Geolocalización |
| expo-image-picker | Selección de imágenes |
| react-native-maps | Mapas |
| Zustand | Estado global |

---

## 👩‍💻 Para recruiters

> Proyecto personal desarrollado de forma independiente, desde el diseño hasta el deploy.

### 🤖 Herramientas de desarrollo asistido por IA

- **Claude (Anthropic)** — Utilizado como asistente de desarrollo a lo largo del proyecto: generación de código, pair programming y resolución de problemas técnicos complejos. Su uso fue intencional y transparente, complementando la toma de decisiones arquitectónicas y el criterio técnico propio.

### 🏗 Decisiones técnicas y arquitectura

- **Expo Router con file-based routing** — organización de pantallas como rutas, similar a Next.js, facilitando escalabilidad y navegación declarativa
- **Feature-based architecture** — la lógica está separada por dominio (`features/chat`, `features/pet`, `features/filter`) con sus propios servicios, repositorios y mappers, desacoplando la UI de la lógica de negocio
- **Firebase Firestore + Storage** — base de datos en tiempo real para el chat y storage para imágenes de mascotas, sin necesidad de backend propio
- **TypeScript end-to-end** — modelos tipados en `models/` usados en toda la app, reduciendo errores en runtime
- **Zustand para estado global** — elegido sobre Redux por su simplicidad y menor boilerplate manteniendo el mismo poder

### 🧩 Desafíos resueltos

- **Google OAuth en dispositivo físico Android** — Chrome Custom Tabs en Android moderno bloquea custom URI schemes por seguridad. Se resolvió configurando el `AndroidManifest.xml` con el meta-data correcto para deshabilitar Custom Tabs, registrando el intent-filter del scheme invertido del Client ID y usando `makeRedirectUri` con el native scheme correcto
- **Deep linking con Expo Router** — el redirect de OAuth necesita que Expo Router maneje URIs externas. Se implementó `+native-intent.tsx` para interceptar y redirigir correctamente, y `oauthredirect.tsx` para completar la sesión del browser
- **Chat en tiempo real con listeners** — se implementó un sistema de suscripción con `onSnapshot` de Firestore que actualiza los mensajes en tiempo real y hace scroll automático al último mensaje

### 📸 Screenshots

> _Próximamente — podés ver el proyecto en funcionamiento contactándome directamente_

---

## 🚀 Instalación y setup

### Requisitos previos

- Node.js >= 18
- Android Studio (para emulador o dispositivo físico)
- Expo CLI: `npm install -g expo-cli`
- Cuenta de Firebase
- Proyecto en Google Cloud Console con OAuth configurado

### 1. Clonar el repositorio

```bash
git clone https://github.com/camjesus/portalpet-beta-v2.git
cd portalpet-beta-v2
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar Firebase

Creá un proyecto en [Firebase Console](https://console.firebase.google.com) y descargá el archivo `google-services.json`. Colocalo en:

```
android/app/google-services.json
google-services.json  ← raíz del proyecto
```

### 4. Configurar Google OAuth

Creá las credenciales OAuth en [Google Cloud Console](https://console.cloud.google.com):

- **Android Client ID** — con el SHA-1 del keystore de debug
- **Web Client ID** — para el flow de autenticación

Luego creá el archivo `secret-google.ts` en la raíz:

```typescript
export const GOOGLE_ANDROID_ID = "TU_ANDROID_CLIENT_ID";
export const GOOGLE_WEB_ID = "TU_WEB_CLIENT_ID";
export const GOOGLE_IOS_ID = "TU_IOS_CLIENT_ID";
export const GOOGLE_EXPO_ID = "TU_EXPO_CLIENT_ID";
export const GOOGLE_ANDROID_FISICO_ID = "TU_ANDROID_FISICO_CLIENT_ID";
export const API_KEY_LOCATIONIQ = "TU_API_KEY_LOCATIONIQ";
```

> ⚠️ Este archivo está en `.gitignore` y no se incluye en el repositorio.

### 5. Obtener el SHA-1 del keystore

```bash
keytool -list -v -keystore android/app/debug.keystore -alias androiddebugkey -storepass android -keypass android
```

Registrá el SHA-1 en el Android Client ID de Google Cloud Console.

### 6. Correr en Android

```bash
npx expo run:android
```

> **Nota:** Esta app requiere `npx expo run:android` (no Expo Go) para que funcionen el OAuth y los módulos nativos correctamente.

---

## 📁 Estructura del proyecto

```
app/          → Pantallas (Expo Router)
components/   → Componentes reutilizables
features/     → Lógica de negocio por dominio
services/     → Servicios externos (Firebase, storage)
models/       → Tipos e interfaces TypeScript
constants/    → Datos estáticos y validaciones
hooks/        → Custom hooks
assets/       → Imágenes y fuentes
android/      → Proyecto nativo Android
```

---

## 📄 Licencia

MIT
