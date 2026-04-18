import { useEffect, useState } from "react";
import { View, Image } from "react-native";
import { Redirect } from "expo-router";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";

const SPLASH_DURATION_MS = 1600;
const LOGO_SIZE = 180;

export default function SplashScreen() {
  const [splashDone, setSplashDone] = useState(false);

  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, {
      duration: 700,
      easing: Easing.out(Easing.quad),
    });
    const timer = setTimeout(() => setSplashDone(true), SPLASH_DURATION_MS);
    return () => clearTimeout(timer);
  }, []);

  const logoStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  if (splashDone) {
    return <Redirect href="/onboarding" />;
  }

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Animated.View style={logoStyle}>
        <Image
          source={require("../assets/logo.png")}
          style={{ width: LOGO_SIZE, height: LOGO_SIZE }}
          resizeMode="contain"
        />
      </Animated.View>
    </View>
  );
}
