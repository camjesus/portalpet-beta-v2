# 🐾 PortalPet

Aplicación móvil para adopción y búsqueda de mascotas, desarrollada de forma independiente con **React Native + Expo**. Conecta personas que encontraron mascotas con quienes las buscan, y gestiona el proceso de adopción de punta a punta.

> Proyecto personal · desarrollado por [Cam](https://github.com/camjesus) · Buenos Aires

---

## 📱 Plataformas

| Plataforma | Estado |
|---|---|
| Android | ✅ Probado en dispositivo físico y emulador |
| iOS | ✅ Compatible — requiere Xcode y Apple Developer account para build |

La app está desarrollada con React Native + Expo, lo que garantiza compatibilidad multiplataforma. El código base es compartido; las diferencias se limitan a configuración de OAuth (iOS Client ID) y el archivo `GoogleService-Info.plist` de Firebase para iOS.

---

## ✨ Funcionalidades

### Autenticación
- Login con **Google OAuth** via `expo-auth-session`
- Manejo de deep linking con `+native-intent.tsx` y `oauthredirect.tsx`
- Persistencia de sesión con AsyncStorage

### Búsqueda y filtros
- Búsqueda de mascotas con filtros combinables: especie, sexo, tamaño, acción
- Geolocalización con radio configurable (`expo-location` + `react-native-maps`)
- Ordenamiento por fecha reciente o cercanía
- Persistencia de filtros entre sesiones con `AsyncStorage`

### Publicaciones
- Carga de foto con `expo-image-picker` y compresión con `expo-image-manipulator`
- Mascotas encontradas y mascotas buscadas como flujos diferenciados
- Gestión de estados con transiciones controladas (ver abajo)

### Guardados
- Guardado de mascotas favoritas con sincronización en tiempo real vía Firestore

### Chat en tiempo real
- Mensajería entre usuario y rescatista via `onSnapshot` de Firestore
- Badges de mensajes no leídos con listener global (`useGlobalChatListener`)
- Scroll automático al último mensaje
- Ordenamiento de conversaciones por fecha o estado de adopción
- Eliminación suave de chats (`softDelete`) con confirmación

### Gestión de adopción
- Perfil de adopción enviado desde el chat
- Flujo completo: solicitud → aceptación / rechazo
- Estado de adopción reflejado en la tarjeta del chat con badge de color

### Estados de mascotas

**Mascota en adopción:**
```
En Adopción → Adaptación → Adoptada
```

**Mascota encontrada:**
```
Encontrada → En adopción → Adoptada
```

**Mascota buscada:**
```
Buscada → Encontrada → Cerrada
```

---

## 🏗 Arquitectura

Feature-based con separación clara de capas:

```
app/              → Pantallas y rutas (Expo Router, file-based)
components/       → Componentes UI reutilizables
features/
  ├── pet/        → Lógica de mascotas (hooks, services, repository, mappers)
  ├── chat/       → Lógica de chat (hooks, services, repository)
  └── filter/     → Lógica de filtros
services/         → Servicios transversales (storage, geo, utils)
models/           → Tipos e interfaces TypeScript
constants/        → Datos estáticos y validaciones
hooks/            → Custom hooks globales
store/            → Estado global con Zustand
context/          → React Context para sesión
assets/           → Imágenes y fuentes
android/          → Proyecto nativo Android
```

### Decisiones técnicas

- **Expo Router con file-based routing** — navegación declarativa similar a Next.js, facilita escalabilidad
- **Feature-based architecture** — cada dominio (`chat`, `pet`, `filter`) tiene sus propios servicios, repositorios y mappers, desacoplando UI de lógica de negocio
- **Firebase Firestore + Storage** — base de datos en tiempo real para el chat, storage para imágenes, sin backend propio
- **Zustand** — estado global simple y sin boilerplate, con stores por dominio
- **TypeScript end-to-end** — modelos tipados en `models/` usados en toda la app
- **react-native-size-matters** — escala de tamaños responsive para distintas densidades de pantalla

---

## 🛠 Stack

| Tecnología | Versión | Uso |
|---|---|---|
| React Native | 0.81.5 | Framework principal |
| Expo | ~54 | Toolchain y módulos nativos |
| Expo Router | ~6 | Navegación file-based |
| Firebase | ^12 | Firestore, Auth, Storage |
| TypeScript | ~5.9 | Tipado estático |
| Zustand | ^5 | Estado global |
| react-native-maps | 1.20 | Mapas y geolocalización |
| expo-location | ^19 | Ubicación del usuario |
| expo-image-picker | ~17 | Selección de imágenes |
| react-native-svg | 15.12 | Ilustraciones vectoriales |
| EAS Build | — | Build y distribución |

---
## 🧩 Desafíos técnicos resueltos

**Google OAuth en Android físico**
Chrome Custom Tabs en Android moderno bloquea custom URI schemes. Se resolvió configurando `AndroidManifest.xml` con el meta-data correcto, registrando el intent-filter del scheme invertido del Client ID y usando `makeRedirectUri` con el native scheme.

**Google OAuth con múltiples dispositivos**
Cada contexto de ejecución necesita sus propias credenciales de Google: emulador, dispositivo físico, iOS y Expo tienen configuraciones distintas. Se manejaron con variables de entorno para no hardcodear nada.

**Iconos no compatibles entre plataformas**
Los iconos nativos de iOS no existen en Android. Se creó un componente wrapper que resuelve el ícono correcto según la plataforma automáticamente.

**Deep linking con Expo Router**
El redirect de OAuth requiere que Expo Router intercepte URIs externas. Se implementó `+native-intent.tsx` para el routing y `oauthredirect.tsx` para completar la sesión del browser.

**Chat en tiempo real con race conditions**
Los listeners de `onSnapshot` de Firestore corrían en paralelo con el estado `activeChatId` de Zustand. Se resolvió sincronizando el store antes de suscribir el listener global de badges no leídos.

**Navegación post-adopción**
El flujo de `adoptionProfile` requería distinguir si venía del chat o de otra pantalla. Se implementó con params `fromChat` + `chatId` y se reemplazó `router.back()` por `router.dismissTo()` para el contexto de modal.

**APK crash en producción**
Conflicto entre `app.json` y `app.config.js` donde las variables de entorno de EAS no eran inyectadas al momento del build. Resuelto centralizando la config en `app.config.js` con lectura explícita de `process.env`.

---

## 🚀 Setup local

### Requisitos

- Node.js >= 18
- Android Studio (emulador o dispositivo físico) — o Xcode para iOS
- Cuenta de Firebase
- Proyecto en Google Cloud Console con OAuth configurado

### 1. Clonar

```bash
git clone https://github.com/camjesus/portalpet-beta-v2.git
cd portalpet-beta-v2
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar Firebase

Creá un proyecto en [Firebase Console](https://console.firebase.google.com) y descargá los archivos de configuración:

**Android:** colocá `google-services.json` en:
```
android/app/google-services.json
google-services.json   ← raíz del proyecto
```

**iOS:** colocá `GoogleService-Info.plist` en:
```
ios/portalpet/GoogleService-Info.plist
```

### 4. Configurar variables de entorno

Creá `.env` en la raíz (o configurá en EAS):

```env
GOOGLE_ANDROID_ID=
GOOGLE_WEB_ID=
GOOGLE_IOS_ID=
GOOGLE_EXPO_ID=
GOOGLE_ANDROID_FISICO_ID=
API_KEY_LOCATIONIQ=
```

> ⚠️ Estos archivos están en `.gitignore` y no se incluyen en el repositorio.

### 5. SHA-1 del keystore (para OAuth en Android)

```bash
keytool -list -v \
  -keystore android/app/debug.keystore \
  -alias androiddebugkey \
  -storepass android -keypass android
```

Registrá el SHA-1 en el Android Client ID de Google Cloud Console.

### 6. Correr

**Android:**
```bash
npx expo run:android
```

**iOS:**
```bash
npx expo run:ios
```

> Esta app requiere `expo run:android` / `expo run:ios` — no funciona con Expo Go por los módulos nativos y el OAuth.

---

## 🤖 Desarrollo asistido por IA

**Claude (Anthropic)** fue utilizado como asistente de desarrollo a lo largo del proyecto: pair programming, generación de componentes, debugging y resolución de problemas técnicos complejos. Su uso fue intencional y transparente, complementando la toma de decisiones arquitectónicas y el criterio técnico propio.

---

## 📄 Licencia

MIT
