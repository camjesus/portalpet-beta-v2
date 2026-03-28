# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Portal Pet is a React Native mobile application built with Expo SDK 54 for pet adoption, finding lost pets, and reporting found pets. The app connects pet rescuers with potential adopters.

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

No testing framework is configured. The `components/__tests__/` directory exists but is empty.

## Architecture Overview

### Routing Structure

Uses Expo Router v6 with file-based routing and typed routes (`typedRoutes: true`). New Architecture is enabled (`newArchEnabled: true`).

**Tab navigation** (`app/(tabs)/_layout.tsx`) — 6 tabs:
- `home` — Pet search as a scrollable list, uses `useHome.ts` with filter reducer
- `myPets` — User's published pets, uses `useMyPets.ts`
- `chatList` — Messaging list, uses `useChatList.ts`
- `saved` — Liked/saved pets, uses `useSaved.ts`
- `account` — User profile, uses `useAccount.ts`
- `index` — Disabled (blank, redirect tab)

**Stack routes** (modal-style, defined in `app/_layout.tsx`):
`signin`, `managementPet`, `petProfile`, `filter`, `report`, `chat`, `adoptionProfile`, `oauthredirect`

`managementPet` is a multi-step nested stack: `loadData` → `loadImage` → `loadLocation`, each with its own `_layout.tsx` + `index.tsx`.

### Data Layer Architecture

**Two coexisting layers** — the codebase is mid-migration from a legacy service layer to a feature-based architecture:

**Feature-based (new pattern)** — `features/<feature>/`:
```
repository/    ← Firestore/AsyncStorage raw operations
services/      ← Business logic, orchestration
mappers/       ← Firestore documents → app models
factories/     ← Object construction helpers
hooks/         ← React hooks wrapping services (consumed by screens)
utils/         ← Feature-specific helpers
```
Features: `chat`, `pet`, `filter`, `adoption`, `location`, `account`

**Legacy layer (being replaced)** — `services/`:
- `services/dataBase/` — Old Firestore hooks (useGoogleSignin, useReport still here)
- `services/storage/` — AsyncStorage: `userStorage.ts`, `petStorage.ts`, `filterStorage.ts`, `likesStorage.ts`
- `services/utils/` — `geo.ts` (haversine distance), `cloudinary.ts` (image upload), `location.ts`
- `services/mapping/useMapping.ts`

When adding new data operations, follow the feature-based pattern in `features/`.

### State Management

- **Global store**: Zustand (`store/authStore.ts`) — user auth state and chat state
- **Reducers**: `hooks/reducers/useFilter.ts` and `hooks/reducers/usePet.ts` for complex form state
- **AsyncStorage**: Filters, user preferences, likes — accessed via `services/storage/`
- **Local state**: `useState`/`useEffect` for component-level state

### Models

All types in `models/`, re-exported from `models/index.ts`. Key types:

- `Pet` / `PetId` — `PetId = { id: string, pet: Pet }`. Pet has `action: ADOPTION | WANTED | FOUND`, `ageType: MONTH | YEAR`, `size: SMALL | MEDIUM | BIG`, `sex: FEMALE | MALE`
- `Filter` — arrays for `size[]`, `type[]`, `sex[]`; nested `from`/`until` age ranges; `latitude`, `longitude`, `radiusKm`
- `Chat` / `ChatId`, `Message`, `User`, `Rescuer`, `AdoptionProfile`, `AdoptionRequests`, `Report`
- Enums centralized in `Enums.ts`

### Firebase Integration

- Config in `FirebaseConfig.js`
- Firestore collections: `pets`, `chats`, `messages`, `reports`, `adoptionProfiles`, `adoptionRequests`
- Image upload: Cloudinary (`services/utils/cloudinary.ts`) and/or Firebase Storage (`petImages/` path)
- Real-time listeners via Firestore `onSnapshot` in repository layer (see `features/chat/repository/`)
- Pet queries use composite `where` clauses — Firestore composite indexes required
- Age filtering has special YEAR vs MONTH logic (see `features/pet/services/petService.ts`)

### Authentication

- Google OAuth via `expo-auth-session` + `@react-native-google-signin/google-signin`
- Stored in Zustand auth store after sign-in
- Persisted in AsyncStorage via `services/storage/userStorage.ts`

### Component Organization

- `components/ui/` — Reusable: `Button`, `CheckBox`, `TextInputCustom`, `Loading`, `HeaderCustom`, `HeaderAnimated`, `ToggleButton`, `InputAge`, `InputOption`, `IconSymbol.ios.tsx`
- `components/<feature>/` — Feature-scoped: `chat/`, `search/`, `myPets/`, `managementPet/`, `filter/`, `account/`, `chatList/`, `saved/`, `home/`

### Styling

- `react-native-size-matters` for responsive scaling (`scale`, `s()` functions)
- `@react-navigation/native` theme system (`DarkTheme`/`DefaultTheme`)
- Color constants in `constants/Colors.ts`, scheme hook in `hooks/useColorScheme.ts`

### TypeScript

- Path alias: `@/*` → root directory
- Firebase Auth type override for React Native in tsconfig paths
- Strict mode enabled

## Important Notes

- Firebase credentials in `FirebaseConfig.js` and Google Maps API keys in `app.json` are exposed — move to env vars
- Secret files (`secret-google.ts`, `constants/secret.ts`) must stay in `.gitignore`
- `google-services.json` required for Android builds
- Route params accessed via `useLocalSearchParams<T>()` with typed generics
- Chat has a global real-time listener (`hooks/useGlobalChatListener.ts`) set up at root layout level
