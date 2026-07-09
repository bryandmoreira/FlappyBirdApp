// app/_layout.tsx
import { GameProvider } from "@/hooks/game";
import { SkinProvider } from "@/hooks/skin";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

export {
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  initialRouteName: "index",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    PublicPixel: require("../assets/fonts/PublicPixel-rv0pA.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <GameProvider>
      <SkinProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="play" options={{ headerShown: false }} />
          <Stack.Screen name="game-over" options={{ headerShown: false }} />
          <Stack.Screen name="skins" options={{ headerShown: false }} />
        </Stack>
      </SkinProvider>
    </GameProvider>
  );
}