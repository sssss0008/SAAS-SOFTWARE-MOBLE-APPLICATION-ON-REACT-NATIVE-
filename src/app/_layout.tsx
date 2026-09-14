import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="(modals)/notifications"
        options={{
          presentation: 'modal',
          title: 'Notifications',
          headerStyle: { backgroundColor: '#f8fafc' },
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="(modals)/invite"
        options={{
          presentation: 'modal',
          title: 'Invite Team Member',
          headerStyle: { backgroundColor: '#f8fafc' },
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
