import { Stack } from "expo-router";

export default function ManagementPetLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="loadImage" options={{ headerShown: false }} />
      <Stack.Screen name="loadData" options={{ headerShown: false }} />
      <Stack.Screen name="loadLocation" options={{ headerShown: false }} />
      <Stack.Screen name="loadMedicalRecord" options={{ headerShown: false }} />
      <Stack.Screen name="loadCharacteristics" options={{ headerShown: false }} />
    </Stack>
  );
}
