import { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ArrowLeft,
  Phone,
  MessageCircle,
  Navigation,
} from "lucide-react-native";
import Svg, {
  Path,
  Circle,
  Rect,
  Line,
  Defs,
  LinearGradient as SvgGrad,
  Stop,
  G,
} from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedProps,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
  interpolate,
  useDerivedValue,
} from "react-native-reanimated";
import { bookings, agencies } from "@/data/mockData";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const MAP_HEIGHT = 380;
const MAP_PADDING = 30;

/* ─── Route waypoints (curved path from bottom-left to top-right) ─── */
const ROUTE_POINTS = [
  { x: 40, y: 320 },
  { x: 70, y: 290 },
  { x: 110, y: 270 },
  { x: 145, y: 240 },
  { x: 170, y: 210 },
  { x: 210, y: 190 },
  { x: 250, y: 165 },
  { x: 280, y: 140 },
  { x: 310, y: 115 },
  { x: 340, y: 90 },
  { x: 360, y: 65 },
];

// Inline the route data so worklets can capture it as a constant
const ROUTE_XS = ROUTE_POINTS.map((p) => p.x);
const ROUTE_YS = ROUTE_POINTS.map((p) => p.y);
const ROUTE_COUNT = ROUTE_POINTS.length;

/* ─── Build SVG path string from waypoints ─── */
function buildSmoothPath(): string {
  const pts = ROUTE_POINTS;
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i < pts.length; i++) {
    const prev = pts[i - 1];
    const curr = pts[i];
    const cpx = (prev.x + curr.x) / 2;
    d += ` Q ${prev.x + (curr.x - prev.x) * 0.5} ${prev.y}, ${cpx} ${(prev.y + curr.y) / 2}`;
  }
  const last = pts[pts.length - 1];
  d += ` L ${last.x} ${last.y}`;
  return d;
}

/* ─── Fake street blocks for map realism ─── */
function MapStreets() {
  const blocks = [
    { x: 20, y: 20, w: 80, h: 50 },
    { x: 120, y: 30, w: 60, h: 70 },
    { x: 200, y: 20, w: 90, h: 55 },
    { x: 310, y: 15, w: 70, h: 45 },
    { x: 15, y: 100, w: 70, h: 60 },
    { x: 110, y: 120, w: 55, h: 50 },
    { x: 190, y: 100, w: 80, h: 65 },
    { x: 300, y: 80, w: 60, h: 50 },
    { x: 30, y: 190, w: 65, h: 50 },
    { x: 120, y: 200, w: 70, h: 45 },
    { x: 220, y: 185, w: 60, h: 60 },
    { x: 310, y: 155, w: 65, h: 55 },
    { x: 20, y: 270, w: 80, h: 55 },
    { x: 130, y: 280, w: 60, h: 40 },
    { x: 220, y: 265, w: 75, h: 50 },
    { x: 320, y: 240, w: 55, h: 50 },
    { x: 60, y: 340, w: 90, h: 30 },
    { x: 180, y: 335, w: 70, h: 35 },
    { x: 280, y: 320, w: 80, h: 40 },
  ];

  return (
    <G>
      {blocks.map((b, i) => (
        <Rect
          key={i}
          x={b.x}
          y={b.y}
          width={b.w}
          height={b.h}
          rx={4}
          fill="rgba(255,255,255,0.04)"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={0.5}
        />
      ))}
    </G>
  );
}

/* ─── Fake street lines ─── */
function MapRoads() {
  const roads = [
    // Horizontal roads
    { x1: 0, y1: 85, x2: SCREEN_WIDTH, y2: 85 },
    { x1: 0, y1: 175, x2: SCREEN_WIDTH, y2: 175 },
    { x1: 0, y1: 260, x2: SCREEN_WIDTH, y2: 260 },
    { x1: 0, y1: 330, x2: SCREEN_WIDTH, y2: 330 },
    // Vertical roads
    { x1: 105, y1: 0, x2: 105, y2: MAP_HEIGHT },
    { x1: 195, y1: 0, x2: 195, y2: MAP_HEIGHT },
    { x1: 295, y1: 0, x2: 295, y2: MAP_HEIGHT },
  ];

  return (
    <G>
      {roads.map((r, i) => (
        <Line
          key={i}
          x1={r.x1}
          y1={r.y1}
          x2={r.x2}
          y2={r.y2}
          stroke="rgba(255,255,255,0.07)"
          strokeWidth={2}
        />
      ))}
    </G>
  );
}

/* ─── Animated Map ─── */
function AnimatedMap() {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, { duration: 6000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, []);

  const carX = useDerivedValue(() => {
    'worklet';
    const total = ROUTE_COUNT - 1;
    const scaled = progress.value * total;
    const idx = Math.min(Math.floor(scaled), total - 1);
    const t = scaled - idx;
    return ROUTE_XS[idx] + (ROUTE_XS[idx + 1] - ROUTE_XS[idx]) * t;
  });
  const carY = useDerivedValue(() => {
    'worklet';
    const total = ROUTE_COUNT - 1;
    const scaled = progress.value * total;
    const idx = Math.min(Math.floor(scaled), total - 1);
    const t = scaled - idx;
    return ROUTE_YS[idx] + (ROUTE_YS[idx + 1] - ROUTE_YS[idx]) * t;
  });

  const carStyle = useAnimatedStyle(() => ({
    position: "absolute" as const,
    left: carX.value - 22,
    top: carY.value - 22,
    width: 44,
    height: 44,
  }));

  // Pulsing ring around the car
  const pulseScale = useSharedValue(1);
  const pulseOpacity = useSharedValue(0.5);

  useEffect(() => {
    pulseScale.value = withRepeat(
      withSequence(
        withTiming(1.8, { duration: 1200, easing: Easing.out(Easing.ease) }),
        withTiming(1, { duration: 0 })
      ),
      -1,
      false
    );
    pulseOpacity.value = withRepeat(
      withSequence(
        withTiming(0, { duration: 1200, easing: Easing.out(Easing.ease) }),
        withTiming(0.5, { duration: 0 })
      ),
      -1,
      false
    );
  }, []);

  const pulseStyle = useAnimatedStyle(() => ({
    position: "absolute" as const,
    left: carX.value - 30,
    top: carY.value - 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#4A1942",
    transform: [{ scale: pulseScale.value }],
    opacity: pulseOpacity.value,
  }));

  const routePath = buildSmoothPath();
  const startPt = ROUTE_POINTS[0];
  const endPt = ROUTE_POINTS[ROUTE_POINTS.length - 1];

  return (
    <View style={styles.mapContainer}>
      <Svg
        width={SCREEN_WIDTH}
        height={MAP_HEIGHT}
        viewBox={`0 0 ${SCREEN_WIDTH} ${MAP_HEIGHT}`}
      >
        <Defs>
          <SvgGrad id="routeGrad" x1="0" y1="1" x2="1" y2="0">
            <Stop offset="0" stopColor="#2ECC71" stopOpacity="0.8" />
            <Stop offset="0.5" stopColor="#4A1942" stopOpacity="1" />
            <Stop offset="1" stopColor="#E74C3C" stopOpacity="0.8" />
          </SvgGrad>
        </Defs>

        {/* Roads */}
        <MapRoads />

        {/* City blocks */}
        <MapStreets />

        {/* Route shadow */}
        <Path
          d={routePath}
          fill="none"
          stroke="rgba(74, 25, 66, 0.3)"
          strokeWidth={12}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Route dashed trail */}
        <Path
          d={routePath}
          fill="none"
          stroke="rgba(74, 25, 66, 0.15)"
          strokeWidth={20}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Main route line */}
        <Path
          d={routePath}
          fill="none"
          stroke="url(#routeGrad)"
          strokeWidth={5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Dotted center line */}
        <Path
          d={routePath}
          fill="none"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeDasharray="6,8"
        />

        {/* Start marker — outer ring */}
        <Circle cx={startPt.x} cy={startPt.y} r={14} fill="rgba(46,204,113,0.15)" />
        <Circle cx={startPt.x} cy={startPt.y} r={9} fill="rgba(46,204,113,0.3)" />
        <Circle cx={startPt.x} cy={startPt.y} r={5} fill="#2ECC71" />

        {/* End marker — outer ring */}
        <Circle cx={endPt.x} cy={endPt.y} r={14} fill="rgba(231,76,60,0.15)" />
        <Circle cx={endPt.x} cy={endPt.y} r={9} fill="rgba(231,76,60,0.3)" />
        <Circle cx={endPt.x} cy={endPt.y} r={5} fill="#E74C3C" />

        {/* Start label */}
        <Rect x={startPt.x - 30} y={startPt.y + 18} width={60} height={20} rx={10} fill="rgba(46,204,113,0.2)" />

        {/* End label */}
        <Rect x={endPt.x - 25} y={endPt.y - 35} width={50} height={20} rx={10} fill="rgba(231,76,60,0.2)" />
      </Svg>

      {/* Start label text */}
      <View style={[styles.markerLabel, { left: startPt.x - 30, top: startPt.y + 20 }]}>
        <Text style={[styles.markerLabelText, { color: "#2ECC71" }]}>Départ</Text>
      </View>

      {/* End label text */}
      <View style={[styles.markerLabel, { left: endPt.x - 25, top: endPt.y - 33 }]}>
        <Text style={[styles.markerLabelText, { color: "#E74C3C" }]}>Arrivée</Text>
      </View>

      {/* Pulsing ring behind car */}
      <Animated.View style={pulseStyle} />

      {/* Animated car */}
      <Animated.View style={carStyle}>
        <View style={styles.carBubble}>
          <Text style={styles.carEmoji}>🚗</Text>
        </View>
      </Animated.View>
    </View>
  );
}

/* ─── Pulsing dot for timeline ─── */
function PulsingDot({ color }: { color: string }) {
  const opacity = useSharedValue(1);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.3, { duration: 800, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 800, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[styles.timelineDot, { backgroundColor: color }, animatedStyle]}
    />
  );
}

/* ─── Timeline steps ─── */
interface TimelineStep {
  status: string;
  time: string;
  completed: boolean;
  active: boolean;
}

const timelineSteps: TimelineStep[] = [
  { status: "Réservation confirmée", time: "12 Juin, 09:00", completed: true, active: false },
  { status: "Véhicule en préparation", time: "12 Juin, 09:30", completed: true, active: false },
  { status: "En route vers vous", time: "Arrivée estimée : 10:15", completed: false, active: true },
  { status: "Livré", time: "", completed: false, active: false },
];

/* ─── Main Screen ─── */
export default function TrackingScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const booking = bookings.find((b) => b.id === id);
  const agency = agencies.find(
    (a) => booking && a.name === booking.agencyName
  );
  const agencyLogo = agency?.logo ?? "P";
  const agencyName = booking?.agencyName ?? "Prestige Auto Nice";

  return (
    <View style={styles.container}>
      {/* ─── Map Section ─── */}
      <View style={styles.mapSection}>
        <AnimatedMap />

        <SafeAreaView style={styles.mapBackRow} edges={["top"]}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.mapBtn}
            activeOpacity={0.7}
          >
            <ArrowLeft size={20} color="#EAEAEA" strokeWidth={1.5} />
          </TouchableOpacity>
        </SafeAreaView>

        <TouchableOpacity style={styles.fullscreenBtn} activeOpacity={0.7}>
          <Navigation size={16} color="#EAEAEA" strokeWidth={1.5} />
          <Text style={styles.fullscreenText}>Plein écran</Text>
        </TouchableOpacity>
      </View>

      {/* ─── Bottom Card ─── */}
      <View style={styles.bottomCard}>
        <View style={styles.dragHandle} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.bottomContent}
        >
          {/* Timeline */}
          <View style={styles.timeline}>
            {timelineSteps.map((step, index) => (
              <View key={index} style={styles.timelineRow}>
                {step.active ? (
                  <PulsingDot color="#4A1942" />
                ) : (
                  <View
                    style={[
                      styles.timelineDot,
                      {
                        backgroundColor: step.completed
                          ? "#2ECC71"
                          : "rgba(234, 234, 234, 0.1)",
                      },
                    ]}
                  />
                )}
                <View style={styles.timelineTextBlock}>
                  <Text style={styles.timelineStatus}>{step.status}</Text>
                  {step.time !== "" && (
                    <Text style={styles.timelineTime}>{step.time}</Text>
                  )}
                </View>
              </View>
            ))}
          </View>

          {/* ETA */}
          <View style={styles.etaBlock}>
            <Text style={styles.etaValue}>15 min</Text>
            <Text style={styles.etaLabel}>Temps d'arrivée estimé</Text>
          </View>

          {/* Driver Card */}
          <View style={styles.driverCard}>
            <View style={styles.driverLeft}>
              <View style={styles.driverAvatar}>
                <Text style={styles.driverAvatarText}>{agencyLogo}</Text>
              </View>
              <View>
                <Text style={styles.driverName}>{agencyName}</Text>
                <Text style={styles.driverStatusText}>Livraison en cours</Text>
              </View>
            </View>
            <View style={styles.driverActions}>
              <TouchableOpacity style={styles.actionBtnPrimary} activeOpacity={0.7} onPress={() => router.push(`/call/${id}` as any)}>
                <Phone size={18} color="#EAEAEA" strokeWidth={1.5} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionBtnSecondary} activeOpacity={0.7} onPress={() => router.push(`/messagerie/${id}` as any)}>
                <MessageCircle size={18} color="#EAEAEA" strokeWidth={1.5} />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050404",
  },

  /* ─── Map ─── */
  mapSection: {
    height: MAP_HEIGHT,
    position: "relative",
    overflow: "hidden",
  },
  mapContainer: {
    flex: 1,
    backgroundColor: "#0d0d0d",
    position: "relative",
  },
  markerLabel: {
    position: "absolute",
    width: 60,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  markerLabelText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 9,
  },
  carBubble: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#4A1942",
    borderWidth: 3,
    borderColor: "#EAEAEA",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#4A1942",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 8,
  },
  carEmoji: {
    fontSize: 20,
  },

  /* Nav buttons */
  mapBackRow: {
    position: "absolute",
    top: 0,
    left: 20,
    paddingTop: 8,
  },
  mapBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#2E1C2B",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 6,
  },
  fullscreenBtn: {
    position: "absolute",
    bottom: 36,
    right: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "#4A1942",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 6,
  },
  fullscreenText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 13,
    color: "#EAEAEA",
  },

  /* ─── Bottom Card ─── */
  bottomCard: {
    flex: 1,
    backgroundColor: "#050404",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
    zIndex: 20,
  },
  dragHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: "rgba(234, 234, 234, 0.6)",
    alignSelf: "center",
    marginTop: 12,
    marginBottom: 24,
  },
  bottomContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  /* Timeline */
  timeline: {
    gap: 16,
    marginBottom: 24,
  },
  timelineRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  timelineDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  timelineTextBlock: {
    flex: 1,
  },
  timelineStatus: {
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    color: "#EAEAEA",
  },
  timelineTime: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: "rgba(234, 234, 234, 0.6)",
  },

  /* ETA */
  etaBlock: {
    alignItems: "center",
    marginBottom: 24,
  },
  etaValue: {
    fontFamily: "Poppins_700Bold",
    fontSize: 28,
    color: "#EAEAEA",
  },
  etaLabel: {
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
    color: "rgba(234, 234, 234, 0.6)",
  },

  /* Driver Card */
  driverCard: {
    backgroundColor: "#2E1C2B",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  driverLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  driverAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#4A1942",
    alignItems: "center",
    justifyContent: "center",
  },
  driverAvatarText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    color: "#EAEAEA",
  },
  driverName: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    color: "#EAEAEA",
  },
  driverStatusText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: "rgba(234, 234, 234, 0.6)",
  },
  driverActions: {
    flexDirection: "row",
    gap: 8,
  },
  actionBtnPrimary: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#4A1942",
    alignItems: "center",
    justifyContent: "center",
  },
  actionBtnSecondary: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(234, 234, 234, 0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
});
