import { Stack } from 'expo-router';

export default function AMBPetLayout() {

  return (
      <Stack>
        <Stack.Screen name="abmPet" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }}  />
      </Stack>
  );
}
