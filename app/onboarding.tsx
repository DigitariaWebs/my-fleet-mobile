import { useState, useCallback, useEffect } from "react";
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
  withDelay,
  withSpring,
  withSequence,
  Easing,
  interpolate,
  runOnJS,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { Button } from "@/components/ui/Button";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const TRANSITION_OUT = 350;
const TRANSITION_IN_DELAY = 100;

interface Slide {
  image: string;
  headline: string;
  subtitle: string;
}

const slides: Slide[] = [
  {
    image: "https://images.unsplash.com/photo-1770847816156-a4041d979580?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    headline: "Louez en toute\nsimplicité",
    subtitle: "Parcourez les meilleures agences et réservez en quelques secondes",
  },
  {
    image: "https://images.unsplash.com/photo-1769546253924-9e23d794be53?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    headline: "Des agences\nde confiance",
    subtitle: "Toutes nos agences sont vérifiées et notées par la communauté",
  },
  {
    image: "https://images.unsplash.com/photo-1761264889404-a194af20ae90?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    headline: "Votre flotte,\nvotre choix",
    subtitle: "Berlines, SUV, sportives, cabriolets — avec ou sans chauffeur",
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Image animations
  const imageOpacity = useSharedValue(0);
  const imageScale = useSharedValue(1.15);

  // Text animations
  const headlineTranslateY = useSharedValue(40);
  const headlineOpacity = useSharedValue(0);
  const subtitleTranslateY = useSharedValue(30);
  const subtitleOpacity = useSharedValue(0);

  // Dots
  const dotsOpacity = useSharedValue(0);

  // Button
  const buttonTranslateY = useSharedValue(20);
  const buttonOpacity = useSharedValue(0);

  // Skip button
  const skipOpacity = useSharedValue(0);

  // Ken Burns — slow zoom on image
  const kenBurnsScale = useSharedValue(1.0);

  const animateIn = useCallback(() => {
    "worklet";
    // Image: fade in + scale down from 1.15 to 1.0
    imageOpacity.value = withTiming(1, { duration: 800, easing: Easing.out(Easing.cubic) });
    imageScale.value = withTiming(1.0, { duration: 900, easing: Easing.out(Easing.cubic) });

    // Ken Burns: slow zoom 1.0 → 1.08 over the slide duration
    kenBurnsScale.value = 1.0;
    kenBurnsScale.value = withTiming(1.08, { duration: 8000, easing: Easing.linear });

    // Headline: slide up + fade in with spring
    headlineTranslateY.value = 40;
    headlineOpacity.value = 0;
    headlineTranslateY.value = withDelay(300, withSpring(0, { damping: 20, stiffness: 90 }));
    headlineOpacity.value = withDelay(300, withTiming(1, { duration: 500 }));

    // Subtitle: slide up + fade in (staggered)
    subtitleTranslateY.value = 30;
    subtitleOpacity.value = 0;
    subtitleTranslateY.value = withDelay(500, withSpring(0, { damping: 20, stiffness: 90 }));
    subtitleOpacity.value = withDelay(500, withTiming(1, { duration: 500 }));

    // Dots: fade in
    dotsOpacity.value = withDelay(650, withTiming(1, { duration: 400 }));

    // Button: slide up + fade in
    buttonTranslateY.value = 20;
    buttonOpacity.value = 0;
    buttonTranslateY.value = withDelay(750, withSpring(0, { damping: 20, stiffness: 100 }));
    buttonOpacity.value = withDelay(750, withTiming(1, { duration: 400 }));

    // Skip
    skipOpacity.value = withDelay(900, withTiming(1, { duration: 400 }));
  }, []);

  const animateOut = useCallback(() => {
    "worklet";
    // Image: slight zoom in + fade out
    imageScale.value = withTiming(1.1, { duration: TRANSITION_OUT, easing: Easing.in(Easing.cubic) });
    imageOpacity.value = withTiming(0, { duration: TRANSITION_OUT, easing: Easing.in(Easing.cubic) });

    // Headline: slide up + fade out
    headlineTranslateY.value = withTiming(-20, { duration: TRANSITION_OUT, easing: Easing.in(Easing.cubic) });
    headlineOpacity.value = withTiming(0, { duration: 250 });

    // Subtitle: slide up + fade out (slight delay)
    subtitleTranslateY.value = withTiming(-15, { duration: TRANSITION_OUT, easing: Easing.in(Easing.cubic) });
    subtitleOpacity.value = withTiming(0, { duration: 250 });

    // Dots + button: fade out
    dotsOpacity.value = withTiming(0, { duration: 200 });
    buttonOpacity.value = withTiming(0, { duration: 200 });
    buttonTranslateY.value = withTiming(10, { duration: 250 });
  }, []);

  // Initial entrance animation
  useEffect(() => {
    animateIn();
  }, []);

  const navigateToAuth = useCallback(() => {
    router.replace("/auth");
  }, [router]);

  const goToSlide = useCallback(
    (index: number) => {
      if (index === currentSlide || isTransitioning) return;
      setIsTransitioning(true);

      // Animate everything out
      animateOut();

      setTimeout(() => {
        setCurrentSlide(index);
        // Animate everything in
        animateIn();
        setTimeout(() => setIsTransitioning(false), 600);
      }, TRANSITION_OUT + TRANSITION_IN_DELAY);
    },
    [currentSlide, isTransitioning, animateOut, animateIn]
  );

  const handleNext = useCallback(() => {
    if (currentSlide < slides.length - 1) {
      goToSlide(currentSlide + 1);
    } else {
      navigateToAuth();
    }
  }, [currentSlide, goToSlide, navigateToAuth]);

  // ─── Animated styles ───

  const imageAnimatedStyle = useAnimatedStyle(() => ({
    opacity: imageOpacity.value,
    transform: [{ scale: imageScale.value * kenBurnsScale.value }],
  }));

  const headlineAnimatedStyle = useAnimatedStyle(() => ({
    opacity: headlineOpacity.value,
    transform: [{ translateY: headlineTranslateY.value }],
  }));

  const subtitleAnimatedStyle = useAnimatedStyle(() => ({
    opacity: subtitleOpacity.value,
    transform: [{ translateY: subtitleTranslateY.value }],
  }));

  const dotsAnimatedStyle = useAnimatedStyle(() => ({
    opacity: dotsOpacity.value,
  }));

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    opacity: buttonOpacity.value,
    transform: [{ translateY: buttonTranslateY.value }],
  }));

  const skipAnimatedStyle = useAnimatedStyle(() => ({
    opacity: skipOpacity.value,
  }));

  const slide = slides[currentSlide]!;

  return (
    <View style={styles.container}>
      {/* ─── Background Image with Ken Burns ─── */}
      <Animated.View style={[StyleSheet.absoluteFillObject, imageAnimatedStyle]}>
        <ImageBackground
          source={{ uri: slide.image }}
          style={styles.backgroundImage}
          resizeMode="cover"
        >
          {/* Multi-layer gradient for depth */}
          <LinearGradient
            colors={[
              "rgba(5, 4, 4, 0.1)",
              "transparent",
              "rgba(5, 4, 4, 0.4)",
              "rgba(5, 4, 4, 0.85)",
              "rgba(5, 4, 4, 0.98)",
            ]}
            locations={[0, 0.15, 0.45, 0.7, 1]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={StyleSheet.absoluteFillObject}
          />
          {/* Subtle vignette from sides */}
          <LinearGradient
            colors={[
              "rgba(5, 4, 4, 0.3)",
              "transparent",
              "rgba(5, 4, 4, 0.3)",
            ]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={StyleSheet.absoluteFillObject}
          />
        </ImageBackground>
      </Animated.View>

      {/* ─── Skip Button ─── */}
      <Animated.View style={[styles.skipButton, skipAnimatedStyle]}>
        <TouchableOpacity
          onPress={navigateToAuth}
          activeOpacity={0.7}
          style={styles.skipTouchable}
        >
          <Text style={styles.skipText}>Passer</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* ─── Bottom Content ─── */}
      <View style={styles.content}>
        {/* Decorative accent line */}
        <Animated.View style={[styles.accentLine, headlineAnimatedStyle]} />

        {/* Headline */}
        <Animated.View style={headlineAnimatedStyle}>
          <Text style={styles.headline}>{slide.headline}</Text>
        </Animated.View>

        {/* Subtitle */}
        <Animated.View style={subtitleAnimatedStyle}>
          <Text style={styles.subtitle}>{slide.subtitle}</Text>
        </Animated.View>

        {/* Pagination Dots */}
        <Animated.View style={[styles.dotsContainer, dotsAnimatedStyle]}>
          {slides.map((_, index) => {
            const isActive = index === currentSlide;
            return (
              <TouchableOpacity
                key={index}
                onPress={() => goToSlide(index)}
                hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.dot,
                    isActive ? styles.dotActive : styles.dotInactive,
                  ]}
                />
              </TouchableOpacity>
            );
          })}
        </Animated.View>

        {/* CTA Button */}
        <Animated.View style={buttonAnimatedStyle}>
          <Button fullWidth onPress={handleNext}>
            {currentSlide === slides.length - 1 ? "Commencer" : "Suivant"}
          </Button>
        </Animated.View>
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

  /* Skip */
  skipButton: {
    position: "absolute",
    top: 56,
    right: 20,
    zIndex: 10,
  },
  skipTouchable: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "rgba(46, 28, 43, 0.5)",
    borderWidth: 1,
    borderColor: "rgba(234, 234, 234, 0.1)",
  },
  skipText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 13,
    color: "rgba(234, 234, 234, 0.7)",
  },

  /* Content */
  content: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    paddingBottom: 52,
  },

  /* Accent line */
  accentLine: {
    width: 32,
    height: 3,
    borderRadius: 2,
    backgroundColor: "#4A1942",
    marginBottom: 16,
  },

  /* Headline */
  headline: {
    fontFamily: "Poppins_700Bold",
    fontSize: 30,
    color: "#EAEAEA",
    lineHeight: 40,
    letterSpacing: -0.5,
    marginBottom: 16,
  },

  /* Subtitle */
  subtitle: {
    fontFamily: "Poppins_400Regular",
    fontSize: 15,
    color: "rgba(234, 234, 234, 0.65)",
    lineHeight: 24,
    marginBottom: 36,
  },

  /* Dots */
  dotsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 28,
  },
  dot: {
    borderRadius: 999,
  },
  dotActive: {
    width: 24,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#4A1942",
  },
  dotInactive: {
    width: 6,
    height: 6,
    backgroundColor: "rgba(234, 234, 234, 0.25)",
  },
});
