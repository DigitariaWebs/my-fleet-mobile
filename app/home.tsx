import { useMemo, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Share2,
  ScanLine,
  MapPin,
  Star,
  CheckCircle,
} from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { useTranslation } from "react-i18next";
import { BottomNav } from "@/components/BottomNav";
import { useTheme } from "@/context/ThemeContext";
import {
  agencies,
  vehicles,
  reviews,
  getVehicleCover,
} from "@/data/mockData";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CONNECTED_AGENCY_ID = "1";

type Tab = "vehicles" | "reviews";

export default function HomeScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { colors, isDark } = useTheme();
  const [activeTab, setActiveTab] = useState<Tab>("vehicles");

  const agency = useMemo(
    () => agencies.find((a) => a.id === CONNECTED_AGENCY_ID)!,
    [],
  );
  const agencyVehicles = useMemo(
    () => vehicles.filter((v) => v.agencyId === CONNECTED_AGENCY_ID),
    [],
  );
  const agencyReviews = useMemo(
    () => reviews.filter((r) => r.agencyId === CONNECTED_AGENCY_ID),
    [],
  );
  const heroCover = useMemo(() => {
    const withLocal = agencyVehicles.find((v) => v.images?.length);
    return withLocal
      ? getVehicleCover(withLocal)
      : getVehicleCover(agencyVehicles[0]!);
  }, [agencyVehicles]);

  // Hero gradient stays dark so overlay text on the photo is always legible.
  const heroGradientColors: [string, string] = [
    "transparent",
    "rgba(5, 4, 4, 0.9)",
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style="light" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 110 }}
      >
        {/* ── Hero ───────────────────────────────────────────── */}
        <View style={styles.hero}>
          <Image source={heroCover as any} style={styles.heroImage} />
          <LinearGradient
            colors={heroGradientColors}
            locations={[0.3, 1]}
            style={StyleSheet.absoluteFillObject}
          />

          <SafeAreaView style={styles.heroNav} edges={["top"]}>
            <TouchableOpacity
              onPress={() => router.push("/scan")}
              style={styles.heroButton}
              activeOpacity={0.7}
            >
              <ScanLine size={20} color="#EAEAEA" strokeWidth={1.5} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.heroButton} activeOpacity={0.7}>
              <Share2 size={20} color="#EAEAEA" strokeWidth={1.5} />
            </TouchableOpacity>
          </SafeAreaView>

          <View
            style={[
              styles.heroLogo,
              { borderColor: colors.background, backgroundColor: colors.primary },
            ]}
          >
            <Text style={styles.heroLogoText}>{agency.logo}</Text>
          </View>
        </View>

        {/* ── Info section ───────────────────────────────────── */}
        <View style={styles.infoSection}>
          <Text style={[styles.agencyName, { color: colors.text }]}>
            {agency.name}
          </Text>

          <View style={styles.addressRow}>
            <MapPin size={16} color={colors.textSecondary} strokeWidth={1.5} />
            <Text style={[styles.addressText, { color: colors.textSecondary }]}>
              {agency.address}
            </Text>
          </View>

          <View style={styles.metaRow}>
            <View
              style={[
                styles.ratingRow,
                {
                  backgroundColor: isDark
                    ? "rgba(241, 196, 15, 0.1)"
                    : "rgba(241, 196, 15, 0.14)",
                },
              ]}
            >
              <Star size={16} fill="#F1C40F" color="#F1C40F" strokeWidth={1.5} />
              <Text style={[styles.ratingValue, { color: colors.text }]}>
                {agency.rating}
              </Text>
              <Text style={[styles.ratingCount, { color: colors.textMuted }]}>
                {t("agency.reviewsCount", { count: agency.reviews })}
              </Text>
            </View>
            <View style={styles.verifiedBadge}>
              <CheckCircle size={12} color="#2ECC71" strokeWidth={1.5} />
              <Text style={styles.verifiedText}>{t("agency.verified")}</Text>
            </View>
          </View>

          <Text style={[styles.description, { color: colors.textSecondary }]}>
            {agency.description}
          </Text>

          {/* ── Tabs ─────────────────────────────────────────── */}
          <View
            style={[
              styles.tabContainer,
              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
          >
            <TouchableOpacity
              onPress={() => setActiveTab("vehicles")}
              style={[
                styles.tab,
                activeTab === "vehicles" && { backgroundColor: colors.primary },
              ]}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.tabText,
                  {
                    color:
                      activeTab === "vehicles" ? "#FFFFFF" : colors.textSecondary,
                  },
                ]}
              >
                {t("agency.tabVehicles")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setActiveTab("reviews")}
              style={[
                styles.tab,
                activeTab === "reviews" && { backgroundColor: colors.primary },
              ]}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.tabText,
                  {
                    color:
                      activeTab === "reviews" ? "#FFFFFF" : colors.textSecondary,
                  },
                ]}
              >
                {t("agency.tabReviews")}
              </Text>
            </TouchableOpacity>
          </View>

          {/* ── Vehicles Tab ─────────────────────────────────── */}
          {activeTab === "vehicles" && (
            <View>
              <Text style={[styles.vehicleCount, { color: colors.textMuted }]}>
                {agencyVehicles.length === 1
                  ? t("agency.vehicleAvailable", { count: 1 })
                  : t("agency.vehiclesAvailable", { count: agencyVehicles.length })}
              </Text>
              <View style={styles.vehiclesGrid}>
                {agencyVehicles.map((vehicle) => (
                  <TouchableOpacity
                    key={vehicle.id}
                    activeOpacity={0.9}
                    style={[
                      styles.vehicleMiniCard,
                      { borderColor: colors.border },
                    ]}
                    onPress={() =>
                      router.push(`/vehicle/${vehicle.id}` as any)
                    }
                  >
                    <Image
                      source={getVehicleCover(vehicle) as any}
                      style={styles.vehicleMiniImage}
                    />
                    <View
                      style={[
                        styles.vehicleMiniInfo,
                        { backgroundColor: colors.surface },
                      ]}
                    >
                      <Text
                        style={[styles.vehicleMiniName, { color: colors.text }]}
                        numberOfLines={1}
                      >
                        {vehicle.name}
                      </Text>
                      <View style={styles.vehicleMiniPriceRow}>
                        <Text
                          style={[styles.vehicleMiniPrice, { color: colors.text }]}
                        >
                          {t("common.priceEuro", { price: vehicle.price })}
                        </Text>
                        <Text
                          style={[styles.vehicleMiniUnit, { color: colors.textMuted }]}
                        >
                          {" "}
                          {t("common.perDay")}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* ── Reviews Tab ──────────────────────────────────── */}
          {activeTab === "reviews" && (
            <View>
              <View
                style={[
                  styles.ratingSummary,
                  { backgroundColor: colors.surface, borderColor: colors.border },
                ]}
              >
                <View style={styles.ratingSummaryTop}>
                  <Text
                    style={[styles.ratingSummaryBig, { color: colors.text }]}
                  >
                    {agency.rating}
                  </Text>
                  <Text
                    style={[styles.ratingSummaryMax, { color: colors.textMuted }]}
                  >
                    /5
                  </Text>
                </View>
                <View style={styles.starsRow}>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      size={16}
                      fill="#F1C40F"
                      color="#F1C40F"
                      strokeWidth={1.5}
                    />
                  ))}
                </View>
                <Text
                  style={[
                    styles.ratingSummaryCount,
                    { color: colors.textSecondary },
                  ]}
                >
                  {t("agency.reviewsBasedOn", { count: agency.reviews })}
                </Text>
              </View>

              <View style={styles.reviewsList}>
                {agencyReviews.map((review) => (
                  <View
                    key={review.id}
                    style={[
                      styles.reviewCard,
                      { backgroundColor: colors.surface, borderColor: colors.border },
                    ]}
                  >
                    <View style={styles.reviewHeader}>
                      <View style={styles.reviewUser}>
                        <View
                          style={[
                            styles.reviewAvatar,
                            { backgroundColor: colors.primary },
                          ]}
                        >
                          <Text style={styles.reviewAvatarText}>
                            {review.userName[0]}
                          </Text>
                        </View>
                        <Text
                          style={[styles.reviewUserName, { color: colors.text }]}
                        >
                          {review.userName}
                        </Text>
                      </View>
                      <View style={styles.reviewStars}>
                        {[...Array(review.rating)].map((_, i) => (
                          <Star
                            key={i}
                            size={12}
                            fill="#F1C40F"
                            color="#F1C40F"
                            strokeWidth={1.5}
                          />
                        ))}
                      </View>
                    </View>

                    <Text
                      style={[styles.reviewComment, { color: colors.textSecondary }]}
                    >
                      {review.comment}
                    </Text>
                    <Text
                      style={[styles.reviewDate, { color: colors.textMuted }]}
                    >
                      {review.date}
                    </Text>

                    {review.agencyResponse && (
                      <View
                        style={[
                          styles.responseBox,
                          {
                            backgroundColor: isDark
                              ? "rgba(74, 25, 66, 0.25)"
                              : "rgba(74, 25, 66, 0.08)",
                          },
                        ]}
                      >
                        <Text
                          style={[styles.responseLabel, { color: colors.text }]}
                        >
                          {t("agency.agencyResponse")}
                        </Text>
                        <Text
                          style={[styles.responseText, { color: colors.textSecondary }]}
                        >
                          {review.agencyResponse}
                        </Text>
                      </View>
                    )}
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      <BottomNav />
    </View>
  );
}

const GRID_GAP = 12;
const GRID_ITEM_WIDTH = (SCREEN_WIDTH - 32 - GRID_GAP) / 2;

const styles = StyleSheet.create({
  container: { flex: 1 },

  /* Hero */
  hero: { height: 240, position: "relative" },
  heroImage: { width: "100%", height: 240 },
  heroNav: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  heroButton: {
    width: 40,
    height: 40,
    borderRadius: 999,
    backgroundColor: "rgba(46, 28, 43, 0.85)",
    borderWidth: 1,
    borderColor: "rgba(234, 234, 234, 0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  heroLogo: {
    position: "absolute",
    bottom: -24,
    left: 16,
    width: 52,
    height: 52,
    borderRadius: 999,
    borderWidth: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  heroLogoText: {
    fontFamily: "Poppins_700Bold",
    fontSize: 20,
    color: "#FFFFFF",
  },

  /* Info */
  infoSection: { paddingHorizontal: 16, paddingTop: 34, paddingBottom: 20 },
  agencyName: {
    fontFamily: "Poppins_700Bold",
    fontSize: 22,
    marginBottom: 6,
    letterSpacing: -0.3,
  },
  addressRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 10,
  },
  addressText: { fontFamily: "Poppins_400Regular", fontSize: 13 },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 14,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  ratingValue: { fontFamily: "Poppins_600SemiBold", fontSize: 13 },
  ratingCount: { fontFamily: "Poppins_400Regular", fontSize: 11 },
  verifiedBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: "rgba(46, 204, 113, 0.15)",
  },
  verifiedText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    color: "#2ECC71",
  },
  description: {
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 16,
  },

  /* Tab pill */
  tabContainer: {
    flexDirection: "row",
    padding: 4,
    borderRadius: 999,
    borderWidth: 1,
    marginBottom: 18,
  },
  tab: {
    flex: 1,
    height: 36,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  tabText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 12,
    letterSpacing: 0.2,
  },

  /* Vehicles */
  vehicleCount: {
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    marginBottom: 12,
  },
  vehiclesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: GRID_GAP,
  },
  vehicleMiniCard: {
    width: GRID_ITEM_WIDTH,
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
  },
  vehicleMiniImage: { width: GRID_ITEM_WIDTH, height: 110 },
  vehicleMiniInfo: { paddingHorizontal: 10, paddingVertical: 10 },
  vehicleMiniName: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 13,
    marginBottom: 4,
  },
  vehicleMiniPriceRow: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  vehicleMiniPrice: { fontFamily: "Poppins_700Bold", fontSize: 14 },
  vehicleMiniUnit: { fontFamily: "Poppins_400Regular", fontSize: 10 },

  /* Reviews */
  ratingSummary: {
    borderRadius: 28,
    padding: 22,
    alignItems: "center",
    marginBottom: 18,
    borderWidth: 1,
  },
  ratingSummaryTop: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 4,
    marginBottom: 8,
  },
  ratingSummaryBig: { fontFamily: "Poppins_700Bold", fontSize: 40 },
  ratingSummaryMax: { fontFamily: "Poppins_400Regular", fontSize: 20 },
  starsRow: { flexDirection: "row", gap: 4, marginBottom: 8 },
  ratingSummaryCount: { fontFamily: "Poppins_400Regular", fontSize: 13 },
  reviewsList: { gap: 12 },
  reviewCard: {
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
  },
  reviewHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  reviewUser: { flexDirection: "row", alignItems: "center", gap: 8 },
  reviewAvatar: {
    width: 32,
    height: 32,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  reviewAvatarText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    color: "#FFFFFF",
  },
  reviewUserName: { fontFamily: "Poppins_600SemiBold", fontSize: 14 },
  reviewStars: { flexDirection: "row", gap: 2 },
  reviewComment: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  reviewDate: { fontFamily: "Poppins_400Regular", fontSize: 11 },
  responseBox: { marginTop: 12, padding: 12, borderRadius: 18 },
  responseLabel: {
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    marginBottom: 4,
  },
  responseText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
    lineHeight: 19,
  },
});
