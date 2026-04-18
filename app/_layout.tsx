import "../global.css";
// Initialize i18next before any component mounts so the first render has
// translations available. Import ordering here matters — keep above providers.
import "@/i18n";

import { View, ActivityIndicator } from "react-native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { ThemeProvider, useTheme } from "@/context/ThemeContext";

function RootContent() {
  const { colors } = useTheme();

  return (
    <>
      <StatusBar style={colors.statusBarStyle} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
          animation: "fade",
        }}
      />
    </>
  );
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, backgroundColor: "#050404", alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator color="#4A1942" />
      </View>
    );
  }

  return (
    <ThemeProvider>
      <RootContent />
    </ThemeProvider>
  );
}
