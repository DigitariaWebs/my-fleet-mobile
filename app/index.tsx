import { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
  runOnJS,
} from "react-native-reanimated";

export default function SplashScreen() {
  const router = useRouter();

  const logoOpacity = useSharedValue(0);
  const logoScale = useSharedValue(0.9);
  const barWidth = useSharedValue(0);

  useEffect(() => {
    // Animate logo in
    logoOpacity.value = withTiming(1, { duration: 600, easing: Easing.out(Easing.ease) });
    logoScale.value = withTiming(1, { duration: 600, easing: Easing.out(Easing.ease) });

    // Animate loading bar
    barWidth.value = withTiming(100, {
      duration: 2500,
      easing: Easing.inOut(Easing.ease),
    });

    // Navigate after 2.5s
    const timer = setTimeout(() => {
      router.replace("/onboarding");
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const logoAnimatedStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{ scale: logoScale.value }],
  }));

  const barAnimatedStyle = useAnimatedStyle(() => ({
    width: `${barWidth.value}%`,
  }));

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Animated.View style={logoAnimatedStyle}>
        <View style={styles.logoRow}>
          <Animated.Text style={[styles.logoText, styles.logoAccent]}>M</Animated.Text>
          <Animated.Text style={styles.logoText}>yFleet</Animated.Text>
        </View>
      </Animated.View>

      {/* Loading bar */}
      <View style={styles.barContainer}>
        <View style={styles.barTrack}>
          <Animated.View style={[styles.barFill, barAnimatedStyle]} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050404",
    alignItems: "center",
    justifyContent: "center",
  },
  glowContainer: {
    position: "absolute",
    width: 200,
    height: 200,
    alignItems: "center",
    justifyContent: "center",
  },
  glow: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "rgba(74, 25, 66, 0.3)",
    // Blur approximation via shadow on iOS
    shadowColor: "#4A1942",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 80,
    elevation: 0,
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoText: {
    fontFamily: "Poppins_700Bold",
    fontSize: 32,
    color: "#EAEAEA",
    letterSpacing: -0.5,
  },
  logoAccent: {
    color: "#4A1942",
  },
  barContainer: {
    position: "absolute",
    bottom: 32,
    width: 200,
    alignItems: "center",
  },
  barTrack: {
    width: 200,
    height: 2,
    backgroundColor: "rgba(234, 234, 234, 0.1)",
    borderRadius: 1,
    overflow: "hidden",
  },
  barFill: {
    height: 2,
    backgroundColor: "#4A1942",
    borderRadius: 1,
  },
});
