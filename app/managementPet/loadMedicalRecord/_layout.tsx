import { Stack } from "expo-router";

export default function LoadMedicalRecordLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}
