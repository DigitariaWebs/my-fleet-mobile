import { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  Text,
  Pressable,
  Animated,
  Easing,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import {
  Zap,
  ZapOff,
  ScanLine,
  CheckCircle2,
  Lock,
  Keyboard,
  Sparkles,
} from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { agencies } from "@/data/mockData";

const FRAME_SIZE = 272;
const CORNER_SIZE = 40;
const ACCENT = "#4A1942";
const ACCENT_SOFT = "#8B3D7E";

export default function ScanScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const [flashOn, setFlashOn] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [detected, setDetected] = useState<string | null>(null);

  const scanAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(0)).current;
  const livePulse = useRef(new Animated.Value(0)).current;
  const ringSpin = useRef(new Animated.Value(0)).current;

  // Scan line sweep
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
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [scanAnim]);

  // QR hint pulse
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
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [pulseAnim]);

  // Live dot pulse
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(livePulse, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(livePulse, {
          toValue: 0,
          duration: 900,
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [livePulse]);

  // Slow ring rotation around viewfinder
  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(ringSpin, {
        toValue: 1,
        duration: 9000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );
    loop.start();
    return () => loop.stop();
  }, [ringSpin]);

  const handleSimulateScan = useCallback(() => {
    setScanning(true);
    const agency = agencies[Math.floor(Math.random() * agencies.length)]!;
    setTimeout(() => {
      setDetected(agency.name);
      setTimeout(() => {
        setScanning(false);
        setDetected(null);
        // After scan, land on the connected-agency home.
        router.replace("/home");
      }, 700);
    }, 900);
  }, [router]);

  const scanLineTranslate = scanAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [8, FRAME_SIZE - 24],
  });
  const pulseOpacity = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.35, 1],
  });
  const pulseScale = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.92, 1.04],
  });
  const liveOpacity = livePulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 1],
  });
  const ringRotate = ringSpin.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View className="flex-1 bg-bg-primary">
      {/* ── Camera backdrop + radial accent wash ─────────────────────── */}
      <View style={StyleSheet.absoluteFillObject} className="bg-[#0b0a0b]" />
      <LinearGradient
        colors={[
          "rgba(74, 25, 66, 0.22)",
          "rgba(11, 10, 11, 0)",
          "rgba(11, 10, 11, 0.6)",
        ]}
        locations={[0, 0.55, 1]}
        style={StyleSheet.absoluteFillObject}
        pointerEvents="none"
      />

      {/* ── Dim mask with viewfinder hole ────────────────────────────── */}
      <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
        <View className="flex-1 bg-black/70" />
        <View className="flex-row" style={{ height: FRAME_SIZE }}>
          <View className="flex-1 bg-black/70" />
          <View style={{ width: FRAME_SIZE, height: FRAME_SIZE }} />
          <View className="flex-1 bg-black/70" />
        </View>
        <View className="flex-1 bg-black/70" />
      </View>

      {/* ── Viewfinder: centered absolute ────────────────────────────── */}
      <View
        pointerEvents="none"
        className="absolute left-0 right-0 items-center"
        style={{ top: "50%", marginTop: -FRAME_SIZE / 2 }}
      >
        <View
          style={{ width: FRAME_SIZE + 44, height: FRAME_SIZE + 44 }}
          className="items-center justify-center"
        >
          {/* Rotating dashed accent ring */}
          <Animated.View
            style={[
              styles.ring,
              { transform: [{ rotate: ringRotate }] },
            ]}
          />

          {/* Soft glow halo */}
          <View style={styles.glowHalo} />

          {/* Viewfinder frame */}
          <View
            style={{ width: FRAME_SIZE, height: FRAME_SIZE }}
            className="items-center justify-center"
          >
            {/* Corner brackets */}
            <View style={[styles.corner, styles.cornerTL]} />
            <View style={[styles.corner, styles.cornerTR]} />
            <View style={[styles.corner, styles.cornerBL]} />
            <View style={[styles.corner, styles.cornerBR]} />

            {/* Gradient scan line */}
            {!detected && (
              <Animated.View
                style={[
                  styles.scanLineWrap,
                  { transform: [{ translateY: scanLineTranslate }] },
                ]}
              >
                <LinearGradient
                  colors={[
                    "transparent",
                    "rgba(139, 61, 126, 0.35)",
                    ACCENT_SOFT,
                    "rgba(139, 61, 126, 0.35)",
                    "transparent",
                  ]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.scanLine}
                />
              </Animated.View>
            )}

            {/* Center hint icon or detected state */}
            {detected ? (
              <Animated.View className="items-center px-5">
                <View style={styles.detectedRingOuter}>
                  <View style={styles.detectedRingInner}>
                    <CheckCircle2
                      size={44}
                      color="#2ECC71"
                      strokeWidth={1.8}
                    />
                  </View>
                </View>
                <Text
                  numberOfLines={1}
                  className="font-poppins-semibold text-text-primary text-center"
                  style={{ fontSize: 15, marginTop: 12 }}
                >
                  {detected}
                </Text>
                <Text
                  className="font-poppins text-text-secondary text-center"
                  style={{ fontSize: 12, marginTop: 4 }}
                >
                  {t("scan.connecting", { name: detected })}
                </Text>
              </Animated.View>
            ) : (
              <Animated.View
                style={{
                  opacity: pulseOpacity,
                  transform: [{ scale: pulseScale }],
                }}
                className="items-center"
              >
                <View style={styles.qrHintTile}>
                  <QrGlyph />
                </View>
              </Animated.View>
            )}
          </View>
        </View>

        {/* "Hold steady" chip below viewfinder */}
        {!detected && (
          <View style={styles.holdChip}>
            <View style={styles.holdDot} />
            <Text
              className="font-poppins-medium text-text-secondary"
              style={{ fontSize: 11, letterSpacing: 0.4 }}
            >
              {t("scan.holdSteady")}
            </Text>
          </View>
        )}
      </View>

      {/* ── Top bar ──────────────────────────────────────────────────── */}
      <SafeAreaView
        edges={["top"]}
        className="absolute left-0 right-0 top-0"
      >
        <View className="flex-row items-center justify-between px-4 pt-2">
          {/* Live dot pill (left) */}
          <View className="overflow-hidden rounded-full">
            <BlurView
              intensity={40}
              tint="dark"
              style={styles.liveChip}
            >
              <Animated.View
                style={[styles.liveDot, { opacity: liveOpacity }]}
              />
              <Text
                className="font-poppins-semibold text-text-primary"
                style={{ fontSize: 11, letterSpacing: 0.6 }}
              >
                {t("scan.live").toUpperCase()}
              </Text>
            </BlurView>
          </View>

          {/* Title badge (center) */}
          <View className="overflow-hidden rounded-full">
            <BlurView
              intensity={40}
              tint="dark"
              style={styles.titleBadge}
            >
              <ScanLine size={14} color="#EAEAEA" strokeWidth={1.8} />
              <Text
                className="font-poppins-semibold text-text-primary"
                style={{ fontSize: 13 }}
              >
                {t("scan.title")}
              </Text>
            </BlurView>
          </View>

          {/* Flash pill (right) */}
          <Pressable
            onPress={() => setFlashOn((v) => !v)}
            className="overflow-hidden rounded-full"
          >
            <BlurView
              intensity={40}
              tint="dark"
              style={[
                styles.flashPill,
                flashOn && styles.flashPillActive,
              ]}
            >
              {flashOn ? (
                <Zap size={18} color="#F1C40F" strokeWidth={1.8} fill="#F1C40F" />
              ) : (
                <ZapOff size={18} color="#EAEAEA" strokeWidth={1.8} />
              )}
            </BlurView>
          </Pressable>
        </View>
      </SafeAreaView>

      {/* ── Bottom glass sheet ───────────────────────────────────────── */}
      <SafeAreaView
        edges={["bottom"]}
        className="absolute left-0 right-0 bottom-0"
      >
        <View className="mx-4 mb-3 overflow-hidden" style={{ borderRadius: 28 }}>
          <BlurView intensity={50} tint="dark" style={styles.bottomCard}>
            {/* Feature chip row */}
            <View className="flex-row justify-center" style={{ gap: 6, marginBottom: 14 }}>
              <FeatureChip icon={<Lock size={11} color={ACCENT_SOFT} strokeWidth={2} />} label={t("scan.chip3")} />
              <FeatureChip icon={<Sparkles size={11} color={ACCENT_SOFT} strokeWidth={2} />} label={t("scan.chip2")} />
              <FeatureChip icon={<ScanLine size={11} color={ACCENT_SOFT} strokeWidth={2} />} label={t("scan.chip1")} />
            </View>

            <Text
              className="font-poppins-bold text-text-primary text-center"
              style={{ fontSize: 18, letterSpacing: -0.2 }}
            >
              {t("scan.headline")}
            </Text>

            <Text
              className="font-poppins text-text-secondary text-center"
              style={{ fontSize: 13, lineHeight: 19, marginTop: 6, paddingHorizontal: 8 }}
            >
              {t("scan.subline")}
            </Text>

            {/* Primary CTA */}
            <Pressable
              onPress={handleSimulateScan}
              disabled={scanning}
              style={({ pressed }) => ({
                ...styles.primaryCta,
                opacity: scanning ? 0.65 : pressed ? 0.9 : 1,
                transform: [{ scale: pressed ? 0.98 : 1 }],
              })}
            >
              <Text
                style={{
                  fontFamily: "Poppins_600SemiBold",
                  fontSize: 15,
                  letterSpacing: 0.2,
                  color: "#FFFFFF",
                  textAlign: "center",
                }}
              >
                {scanning ? t("scan.analyzing") : t("scan.simulateButton")}
              </Text>
            </Pressable>

            {/* Secondary ghost link */}
            <Pressable
              onPress={() => {}}
              className="flex-row items-center justify-center"
              style={{ gap: 6, marginTop: 10 }}
            >
              <Keyboard size={13} color="rgba(234, 234, 234, 0.55)" strokeWidth={2} />
              <Text
                className="font-poppins-medium"
                style={{ fontSize: 12, color: "rgba(234, 234, 234, 0.55)" }}
              >
                {t("scan.enterCode")}
              </Text>
            </Pressable>
          </BlurView>
        </View>
      </SafeAreaView>
    </View>
  );
}

// ── QR glyph (four square corners drawn with dots) ─────────────────────────
function QrGlyph() {
  return (
    <View style={{ width: 48, height: 48 }}>
      <View style={[styles.qrDot, { top: 0, left: 0 }]} />
      <View style={[styles.qrDot, { top: 0, right: 0 }]} />
      <View style={[styles.qrDot, { bottom: 0, left: 0 }]} />
      <View style={[styles.qrMini, { top: 18, left: 18 }]} />
      <View style={[styles.qrMini, { top: 14, right: 4 }]} />
      <View style={[styles.qrMini, { bottom: 4, right: 18 }]} />
    </View>
  );
}

// ── Feature chip ───────────────────────────────────────────────────────────
function FeatureChip({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <View style={styles.featureChip}>
      {icon}
      <Text
        className="font-poppins-medium text-text-primary"
        style={{ fontSize: 10.5, letterSpacing: 0.2 }}
      >
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  // Rotating dashed ring around the viewfinder
  ring: {
    position: "absolute",
    width: FRAME_SIZE + 44,
    height: FRAME_SIZE + 44,
    borderRadius: (FRAME_SIZE + 44) / 2,
    borderWidth: 1,
    borderColor: "rgba(139, 61, 126, 0.35)",
    borderStyle: "dashed",
  },
  // Soft glow halo behind the frame
  glowHalo: {
    position: "absolute",
    width: FRAME_SIZE + 20,
    height: FRAME_SIZE + 20,
    borderRadius: 36,
    backgroundColor: "rgba(74, 25, 66, 0.18)",
  },

  // Corner brackets
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
    borderTopLeftRadius: 22,
  },
  cornerTR: {
    top: 0,
    right: 0,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderTopRightRadius: 22,
  },
  cornerBL: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderBottomLeftRadius: 22,
  },
  cornerBR: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderBottomRightRadius: 22,
  },

  // Scan line
  scanLineWrap: {
    position: "absolute",
    left: 12,
    right: 12,
    height: 22,
    top: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  scanLine: {
    width: "100%",
    height: 2,
    borderRadius: 999,
  },

  // QR hint stage
  qrHintTile: {
    width: 92,
    height: 92,
    borderRadius: 22,
    backgroundColor: "rgba(46, 28, 43, 0.45)",
    borderWidth: 1,
    borderColor: "rgba(139, 61, 126, 0.25)",
    alignItems: "center",
    justifyContent: "center",
  },
  qrDot: {
    position: "absolute",
    width: 14,
    height: 14,
    borderRadius: 3,
    borderWidth: 2,
    borderColor: "rgba(234, 234, 234, 0.55)",
  },
  qrMini: {
    position: "absolute",
    width: 4,
    height: 4,
    borderRadius: 1,
    backgroundColor: "rgba(234, 234, 234, 0.5)",
  },

  // Detected state rings
  detectedRingOuter: {
    width: 104,
    height: 104,
    borderRadius: 52,
    backgroundColor: "rgba(46, 204, 113, 0.08)",
    borderWidth: 1.5,
    borderColor: "rgba(46, 204, 113, 0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  detectedRingInner: {
    width: 78,
    height: 78,
    borderRadius: 39,
    backgroundColor: "rgba(46, 204, 113, 0.14)",
    borderWidth: 1.5,
    borderColor: "rgba(46, 204, 113, 0.5)",
    alignItems: "center",
    justifyContent: "center",
  },

  // Hold steady chip
  holdChip: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "rgba(46, 28, 43, 0.65)",
    borderWidth: 1,
    borderColor: "rgba(234, 234, 234, 0.08)",
  },
  holdDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: ACCENT_SOFT,
  },

  // Top bar pills
  liveChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    paddingHorizontal: 12,
    height: 36,
    borderWidth: 1,
    borderColor: "rgba(234, 234, 234, 0.08)",
    borderRadius: 999,
  },
  liveDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#2ECC71",
  },
  titleBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    paddingHorizontal: 14,
    height: 36,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(234, 234, 234, 0.08)",
  },
  flashPill: {
    width: 36,
    height: 36,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(234, 234, 234, 0.08)",
  },
  flashPillActive: {
    borderColor: "rgba(241, 196, 15, 0.55)",
  },

  // Bottom sheet
  bottomCard: {
    padding: 20,
    backgroundColor: "rgba(5, 4, 4, 0.55)",
    borderWidth: 1,
    borderColor: "rgba(234, 234, 234, 0.08)",
    borderRadius: 28,
  },
  featureChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    backgroundColor: "rgba(74, 25, 66, 0.22)",
    borderWidth: 1,
    borderColor: "rgba(74, 25, 66, 0.4)",
  },
  primaryCta: {
    marginTop: 18,
    height: 52,
    alignSelf: "stretch",
    borderRadius: 999,
    backgroundColor: ACCENT,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: ACCENT,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45,
    shadowRadius: 14,
    elevation: 6,
  },
});
