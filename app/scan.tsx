import { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Zap,
  ZapOff,
  QrCode,
  ScanLine,
  CheckCircle2,
} from "lucide-react-native";
import { Button } from "@/components/ui/Button";
import { agencies } from "@/data/mockData";

const FRAME_SIZE = 260;
const CORNER_SIZE = 36;

export default function ScanScreen() {
  const router = useRouter();
  const [flashOn, setFlashOn] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [detected, setDetected] = useState<string | null>(null);

  const scanAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(scanAnim, {
          toValue: 1,
          duration: 1800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(scanAnim, {
          toValue: 0,
          duration: 1800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [scanAnim]);

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0,
          duration: 1200,
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [pulseAnim]);

  const handleSimulateScan = useCallback(() => {
    setScanning(true);
    // Pick a random agency to simulate a unique QR code per agency
    const agency = agencies[Math.floor(Math.random() * agencies.length)]!;
    setTimeout(() => {
      setDetected(agency.name);
      setTimeout(() => {
        setScanning(false);
        setDetected(null);
        router.push(`/agency/${agency.id}` as any);
      }, 550);
    }, 900);
  }, [router]);

  const scanLineTranslate = scanAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [8, FRAME_SIZE - 8],
  });

  const pulseOpacity = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 1],
  });

  return (
    <View style={styles.container}>
      {/* Simulated camera backdrop */}
      <View style={styles.cameraBackdrop}>
        <View style={styles.cameraNoise} />
      </View>

      {/* Dimmed overlay with a hole */}
      <View style={styles.overlay}>
        <View style={styles.overlayTop} />
        <View style={styles.overlayMiddle}>
          <View style={styles.overlaySide} />
          <View style={styles.frameArea}>
            {/* Corner brackets */}
            <View style={[styles.corner, styles.cornerTL]} />
            <View style={[styles.corner, styles.cornerTR]} />
            <View style={[styles.corner, styles.cornerBL]} />
            <View style={[styles.corner, styles.cornerBR]} />

            {/* Scanning line */}
            <Animated.View
              style={[
                styles.scanLine,
                { transform: [{ translateY: scanLineTranslate }] },
              ]}
            />

            {/* Central hint icon or confirmation */}
            {detected ? (
              <View style={styles.detectedCenter}>
                <View style={styles.detectedCircle}>
                  <CheckCircle2
                    size={40}
                    color="#2ECC71"
                    strokeWidth={1.8}
                  />
                </View>
                <Text style={styles.detectedName} numberOfLines={1}>
                  {detected}
                </Text>
              </View>
            ) : (
              <Animated.View
                style={[styles.centerHint, { opacity: pulseOpacity }]}
              >
                <QrCode
                  size={56}
                  color="rgba(234,234,234,0.18)"
                  strokeWidth={1}
                />
              </Animated.View>
            )}
          </View>
          <View style={styles.overlaySide} />
        </View>
        <View style={styles.overlayBottom} />
      </View>

      {/* Top bar (title + flashlight only) */}
      <SafeAreaView style={styles.topBar} edges={["top"]}>
        <View style={styles.topBarSpacer} />
        <View style={styles.titleBadge}>
          <ScanLine size={14} color="#EAEAEA" strokeWidth={1.5} />
          <Text style={styles.titleText}>QR Agence</Text>
        </View>
        <TouchableOpacity
          onPress={() => setFlashOn((v) => !v)}
          style={[styles.pillButton, flashOn && styles.pillButtonActive]}
          activeOpacity={0.8}
        >
          {flashOn ? (
            <Zap size={20} color="#F1C40F" strokeWidth={1.5} fill="#F1C40F" />
          ) : (
            <ZapOff size={20} color="#EAEAEA" strokeWidth={1.5} />
          )}
        </TouchableOpacity>
      </SafeAreaView>

      {/* Bottom panel */}
      <SafeAreaView style={styles.bottomArea} edges={["bottom"]}>
        <View style={styles.bottomCard}>
          <Text style={styles.headline}>Scannez le QR code de votre agence</Text>
          <Text style={styles.subline}>
            Placez le code dans le cadre. Vous serez connecté automatiquement.
          </Text>

          <Button fullWidth onPress={handleSimulateScan} disabled={scanning}>
            {scanning ? "Analyse en cours…" : "Simuler le scan"}
          </Button>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#050404" },

  /* Camera simulated backdrop */
  cameraBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#0b0a0b",
  },
  cameraNoise: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(74, 25, 66, 0.08)",
  },

  /* Overlay mask */
  overlay: { ...StyleSheet.absoluteFillObject },
  overlayTop: {
    flex: 1,
    backgroundColor: "rgba(5, 4, 4, 0.72)",
  },
  overlayMiddle: { flexDirection: "row", height: FRAME_SIZE },
  overlaySide: {
    flex: 1,
    backgroundColor: "rgba(5, 4, 4, 0.72)",
  },
  overlayBottom: {
    flex: 1,
    backgroundColor: "rgba(5, 4, 4, 0.72)",
  },
  frameArea: {
    width: FRAME_SIZE,
    height: FRAME_SIZE,
    borderRadius: 28,
    overflow: "hidden",
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },

  /* Corner brackets (rounded) */
  corner: {
    position: "absolute",
    width: CORNER_SIZE,
    height: CORNER_SIZE,
    borderColor: "#EAEAEA",
  },
  cornerTL: {
    top: 0,
    left: 0,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderTopLeftRadius: 20,
  },
  cornerTR: {
    top: 0,
    right: 0,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderTopRightRadius: 20,
  },
  cornerBL: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderBottomLeftRadius: 20,
  },
  cornerBR: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderBottomRightRadius: 20,
  },

  scanLine: {
    position: "absolute",
    left: 12,
    right: 12,
    height: 2,
    borderRadius: 999,
    backgroundColor: "#4A1942",
    shadowColor: "#4A1942",
    shadowOpacity: 0.9,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
  },

  centerHint: { position: "absolute" },

  detectedCenter: {
    position: "absolute",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  detectedCircle: {
    width: 72,
    height: 72,
    borderRadius: 999,
    backgroundColor: "rgba(46, 204, 113, 0.12)",
    borderWidth: 2,
    borderColor: "rgba(46, 204, 113, 0.5)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  detectedName: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    color: "#EAEAEA",
    textAlign: "center",
  },

  /* Top bar */
  topBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  topBarSpacer: { width: 40, height: 40 },
  pillButton: {
    width: 40,
    height: 40,
    borderRadius: 999,
    backgroundColor: "rgba(46, 28, 43, 0.85)",
    borderWidth: 1,
    borderColor: "rgba(234, 234, 234, 0.08)",
    alignItems: "center",
    justifyContent: "center",
  },
  pillButtonActive: {
    backgroundColor: "rgba(241, 196, 15, 0.15)",
    borderColor: "rgba(241, 196, 15, 0.5)",
  },
  titleBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 14,
    height: 36,
    borderRadius: 999,
    backgroundColor: "rgba(46, 28, 43, 0.85)",
    borderWidth: 1,
    borderColor: "rgba(234, 234, 234, 0.08)",
  },
  titleText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 13,
    color: "#EAEAEA",
  },

  /* Bottom panel */
  bottomArea: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
  bottomCard: {
    margin: 16,
    padding: 20,
    borderRadius: 28,
    backgroundColor: "rgba(46, 28, 43, 0.95)",
    borderWidth: 1,
    borderColor: "rgba(234, 234, 234, 0.08)",
    gap: 14,
  },
  headline: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 17,
    color: "#EAEAEA",
    textAlign: "center",
  },
  subline: {
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
    color: "rgba(234, 234, 234, 0.6)",
    textAlign: "center",
    marginBottom: 4,
  },
});
