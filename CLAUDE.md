# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Portal Pet is a React Native mobile application built with Expo SDK 54 for pet adoption, finding lost pets, and reporting found pets. The app connects pet rescuers with potential adopters through a swipe-based interface.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npx expo start

# Run on iOS
npm run ios

# Run on Android
npm run android

# Build preview (Android APK)
eas build --profile preview --platform android

# Build production
eas build --profile production
```

## Architecture Overview

### Routing Structure
- Uses Expo Router (v6) with file-based routing
- Main navigation in `app/_layout.tsx` defines all top-level routes
- Tab navigation in `app/(tabs)/_layout.tsx` with 5 main tabs: home (search), myPets, chatList, account
- Modal-style routes: signin, managementPet, petProfile, filter, report, chat

### State Management
- **Local state**: React hooks (useState, useReducer) for component-level state
- **Persistent storage**: AsyncStorage via `service/storeData/` for user and filter preferences
- **Reducers**: Custom reducers in `hooks/reducers/` (useFilter, usePet) for complex state logic

### Data Layer Architecture

**Service Layer** (`service/`):
- `service/dataBase/`: Firebase Firestore operations (usePet, useChat, useMessage, useReport, useFilter)
- `service/storeData/`: AsyncStorage operations for local persistence (useUser, useFilter)
- `service/utils/`: Utility functions for data manipulation
- `service/mapping/`: Data transformation functions (e.g., Firestore documents to app models)

**Models** (`models/`):
- TypeScript types/interfaces: Pet, User, Chat, Message, Report, Filter, Rescuer, Enums
- Pet model includes action types: ADOPTION, WANTED, FOUND

### Firebase Integration
- Configuration in `FirebaseConfig.js`
- Firestore collections: `pets`, `chats`, `messages`, `reports`
- Firebase Storage for pet images (uploaded to `petImages/` path)
- Google Sign-In via `expo-auth-session` (service/dataBase/useGoogleSignin.ts)

### Key Features & Flow

**Pet Management**:
- Create/edit pets via `managementPet` route with form components in `app/managementPet/components/`
- Image upload using `expo-image-picker` → Firebase Storage
- Pet filtering by type, size, sex, age with `filter` route
- Swipe interface for browsing pets in `components/Search/Swiper.tsx`

**Chat System**:
- One-to-one messaging between users
- Chat list in `app/(tabs)/chatList.tsx`
- Individual chats in `app/chat/` with bubble components
- Real-time message fetching from Firestore

**Authentication**:
- Google OAuth via `expo-auth-session`
- User data stored in AsyncStorage after sign-in
- User info fetched from `https://www.googleapis.com/userinfo/v2/me`

### Component Organization
- `components/ui/`: Reusable UI components (Button, CheckBox, TextInputCustom, Loading, Toast, etc.)
- `components/Search/`: Pet browsing components (Swiper, SwiperCard)
- `components/MyPets/`: User's pet list components
- `components/ChatList/`: Chat list components
- Screen-specific components in respective `app/*/components/` directories

### Styling
- Uses `react-native-size-matters` for responsive scaling (scale function)
- Theme support via `@react-navigation/native` (DarkTheme/DefaultTheme)
- Custom color scheme hook in `hooks/useColorScheme.ts`
- Color constants in `constants/Colors.ts`

### TypeScript Configuration
- Path alias: `@/*` maps to root directory
- Firebase Auth type override for React Native in tsconfig paths
- Strict mode enabled

## Important Notes

- The app uses Expo SDK 54 with React 19.1.0 and React Native 0.81.5
- Firebase credentials are currently exposed in `FirebaseConfig.js` - these should be moved to environment variables
- Secret files exist (`secret-google.ts`, `constants/secret.ts`) - ensure these are in .gitignore
- Google services configuration in `google-services.json` for Android
- Recent migration to SDK 54 (per git history)
- Pet queries use multiple Firestore `where` clauses - be mindful of composite index requirements
- Age filtering has special handling for YEAR vs MONTH types (see `getPetsAgeTypeMonth` in `service/dataBase/usePet.ts`)
