import { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useRouter } from "expo-router";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  FadeIn,
  FadeOut,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { Button } from "@/components/ui/Button";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

interface Slide {
  image: string;
  headline: string;
  subtitle: string;
}

const slides: Slide[] = [
  {
    image: "https://images.unsplash.com/photo-1770847816156-a4041d979580?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    headline: "Louez en toute simplicité",
    subtitle: "Parcourez les meilleures agences et réservez en quelques secondes",
  },
  {
    image: "https://images.unsplash.com/photo-1769546253924-9e23d794be53?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    headline: "Des agences de confiance",
    subtitle: "Toutes nos agences sont vérifiées et notées par la communauté",
  },
  {
    image: "https://images.unsplash.com/photo-1761264889404-a194af20ae90?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    headline: "Votre flotte, votre choix",
    subtitle: "Berlines, SUV, sportives, cabriolets — avec ou sans chauffeur",
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const contentOpacity = useSharedValue(1);

  const navigateToAuth = useCallback(() => {
    // TODO: Navigate to auth screen when implemented
    // router.replace("/auth");
  }, [router]);

  const handleNext = useCallback(() => {
    if (currentSlide < slides.length - 1) {
      // Fade out, change slide, fade in
      contentOpacity.value = withTiming(0, { duration: 200, easing: Easing.out(Easing.ease) }, () => {
        // This runs on UI thread, so use runOnJS if needed
      });

      setTimeout(() => {
        setCurrentSlide((prev) => prev + 1);
        contentOpacity.value = withTiming(1, { duration: 300, easing: Easing.in(Easing.ease) });
      }, 200);
    } else {
      navigateToAuth();
    }
  }, [currentSlide, contentOpacity, navigateToAuth]);

  const handleSkip = useCallback(() => {
    navigateToAuth();
  }, [navigateToAuth]);

  const handleDotPress = useCallback((index: number) => {
    contentOpacity.value = withTiming(0, { duration: 200 });
    setTimeout(() => {
      setCurrentSlide(index);
      contentOpacity.value = withTiming(1, { duration: 300 });
    }, 200);
  }, [contentOpacity]);

  const contentAnimatedStyle = useAnimatedStyle(() => ({
    opacity: contentOpacity.value,
  }));

  const slide = slides[currentSlide];

  return (
    <View style={styles.container}>
      {/* Background Image */}
      <Animated.View style={[StyleSheet.absoluteFillObject, contentAnimatedStyle]}>
        <ImageBackground
          source={{ uri: slide.image }}
          style={styles.backgroundImage}
          resizeMode="cover"
        >
          {/* Gradient Overlay */}
          <LinearGradient
            colors={[
              "transparent",
              "rgba(5, 4, 4, 0.7)",
              "rgba(5, 4, 4, 0.95)",
            ]}
            locations={[0, 0.4, 1]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={StyleSheet.absoluteFillObject}
          />
        </ImageBackground>
      </Animated.View>

      {/* Skip Button */}
      <TouchableOpacity
        onPress={handleSkip}
        style={styles.skipButton}
        activeOpacity={0.7}
      >
        <Text style={styles.skipText}>Passer</Text>
      </TouchableOpacity>

      {/* Bottom Content */}
      <View style={styles.content}>
        <Animated.View style={contentAnimatedStyle}>
          <Text style={styles.headline}>{slide.headline}</Text>
          <Text style={styles.subtitle}>{slide.subtitle}</Text>
        </Animated.View>

        {/* Pagination Dots */}
        <View style={styles.dotsContainer}>
          {slides.map((_, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleDotPress(index)}
              style={[
                styles.dot,
                {
                  width: index === currentSlide ? 8 : 6,
                  height: index === currentSlide ? 8 : 6,
                  backgroundColor:
                    index === currentSlide
                      ? "#4A1942"
                      : "rgba(234, 234, 234, 0.3)",
                },
              ]}
            />
          ))}
        </View>

        {/* CTA Button */}
        <Button fullWidth onPress={handleNext}>
          Commencer
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050404",
  },
  backgroundImage: {
    flex: 1,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  skipButton: {
    position: "absolute",
    top: 56,
    right: 20,
    zIndex: 10,
    padding: 8,
  },
  skipText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    color: "rgba(234, 234, 234, 0.6)",
  },
  content: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingBottom: 48,
  },
  headline: {
    fontFamily: "Poppins_700Bold",
    fontSize: 26,
    color: "#EAEAEA",
    lineHeight: 34,
    marginBottom: 12,
  },
  subtitle: {
    fontFamily: "Poppins_400Regular",
    fontSize: 15,
    color: "rgba(234, 234, 234, 0.7)",
    lineHeight: 22,
    marginBottom: 32,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginBottom: 24,
  },
  dot: {
    borderRadius: 999,
  },
});
