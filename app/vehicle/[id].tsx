import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import {
  ArrowLeft,
  Share2,
  Heart,
  Gauge,
  Fuel,
  Users,
  DoorClosed,
  Package,
  Check,
  Car,
} from "lucide-react-native";
import type { LucideIcon } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { vehicles, agencies, getVehicleCover } from "@/data/mockData";
import { useTheme } from "@/context/ThemeContext";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const GRID_GAP = 8;
const GRID_ITEM_WIDTH = (SCREEN_WIDTH - 40 - GRID_GAP) / 2;

interface Spec {
  icon: LucideIcon;
  label: string;
  value: string;
}

export default function VehicleDetailScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { colors, isDark } = useTheme();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [withChauffeur, setWithChauffeur] = useState(false);

  const vehicle = vehicles.find((v) => v.id === id);
  const agency = agencies.find((a) => a.id === vehicle?.agencyId);

  if (!vehicle || !agency) return null;

  const specs: Spec[] = [
    { icon: Gauge, label: t("vehicle.specs.transmission"), value: vehicle.transmission },
    { icon: Fuel, label: t("vehicle.specs.fuel"), value: vehicle.fuel },
    { icon: Gauge, label: t("vehicle.specs.power"), value: vehicle.power },
    { icon: Users, label: t("vehicle.specs.seats"), value: t("vehicle.specs.seatsValue", { count: vehicle.seats }) },
    { icon: DoorClosed, label: t("vehicle.specs.doors"), value: t("vehicle.specs.doorsValue", { count: vehicle.doors }) },
    { icon: Package, label: t("vehicle.specs.trunk"), value: vehicle.trunk },
  ];

  const totalImages = vehicle.images?.length ?? 1;
  const accentSoft = isDark ? "rgba(74, 25, 66, 0.25)" : "rgba(74, 25, 66, 0.08)";

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style="light" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 110 }}
      >
        {/* ─── Hero Image ─── */}
        <View style={styles.hero}>
          <Image
            source={getVehicleCover(vehicle) as any}
            style={styles.heroImage}
          />

          <SafeAreaView style={styles.heroNavRow} edges={["top"]}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.heroBtn}
              activeOpacity={0.7}
            >
              <ArrowLeft size={20} color="#FFFFFF" strokeWidth={1.8} />
            </TouchableOpacity>

            <View style={styles.heroRightBtns}>
              <TouchableOpacity style={styles.heroBtn} activeOpacity={0.7}>
                <Share2 size={20} color="#FFFFFF" strokeWidth={1.8} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.heroBtn} activeOpacity={0.7}>
                <Heart size={20} color="#FFFFFF" strokeWidth={1.8} />
              </TouchableOpacity>
            </View>
          </SafeAreaView>

          <View style={styles.imageCounter}>
            <Text style={styles.imageCounterText}>
              {t("vehicle.imageCounter", { current: 1, total: totalImages })}
            </Text>
          </View>
        </View>

        <View style={styles.body}>
          {/* ─── Header ─── */}
          <View style={styles.headerBlock}>
            <Text style={[styles.vehicleName, { color: colors.text }]}>
              {vehicle.name}
            </Text>
            <Text style={[styles.vehicleYear, { color: colors.textSecondary }]}>
              {vehicle.year}
            </Text>

            <View style={[styles.pricePill, { backgroundColor: colors.primary }]}>
              <Text style={styles.priceValue}>
                {t("common.priceEuro", { price: vehicle.price })}
              </Text>
              <Text style={styles.priceUnit}> {t("common.perDay")}</Text>
            </View>

            <TouchableOpacity
              style={styles.agencyLink}
              activeOpacity={0.7}
              onPress={() => router.push(`/agency/${agency.id}` as any)}
            >
              <View style={[styles.agencyDot, { backgroundColor: colors.primary }]}>
                <Text style={styles.agencyDotText}>{agency.logo}</Text>
              </View>
              <Text style={[styles.agencyLinkName, { color: colors.textSecondary }]}>
                {agency.name}
              </Text>
              <Check size={14} color="#2ECC71" strokeWidth={1.8} />
            </TouchableOpacity>
          </View>

          {/* ─── Specs ─── */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              {t("vehicle.specsTitle")}
            </Text>
            <View style={styles.specsGrid}>
              {specs.map((spec, index) => {
                const Icon = spec.icon;
                return (
                  <View
                    key={index}
                    style={[
                      styles.specCard,
                      { backgroundColor: colors.surface, borderColor: colors.border },
                    ]}
                  >
                    <Icon size={24} color={colors.textSecondary} strokeWidth={1.5} />
                    <Text style={[styles.specLabel, { color: colors.textMuted }]}>
                      {spec.label}
                    </Text>
                    <Text style={[styles.specValue, { color: colors.text }]}>
                      {spec.value}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>

          {/* ─── Features ─── */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              {t("vehicle.featuresTitle")}
            </Text>
            <View style={styles.featuresWrap}>
              {vehicle.features.map((feature, index) => (
                <View
                  key={index}
                  style={[
                    styles.featurePill,
                    { backgroundColor: colors.surface, borderColor: colors.border },
                  ]}
                >
                  <Text style={[styles.featurePillText, { color: colors.text }]}>
                    {feature}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* ─── Description ─── */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              {t("vehicle.descriptionTitle")}
            </Text>
            <Text style={[styles.descriptionText, { color: colors.textSecondary }]}>
              {vehicle.description}
            </Text>
          </View>

          {/* ─── Chauffeur Option ─── */}
          {vehicle.chauffeurAvailable && (
            <View
              style={[
                styles.chauffeurCard,
                {
                  backgroundColor: colors.surface,
                  borderColor: isDark
                    ? "rgba(74, 25, 66, 0.6)"
                    : "rgba(74, 25, 66, 0.35)",
                },
              ]}
            >
              <Car size={24} color={colors.primary} strokeWidth={1.8} />
              <View style={styles.chauffeurInfo}>
                <Text style={[styles.chauffeurTitle, { color: colors.text }]}>
                  {t("vehicle.chauffeur.title")}
                </Text>
                <Text style={[styles.chauffeurPrice, { color: colors.primary }]}>
                  {t("vehicle.chauffeur.price", { price: vehicle.chauffeurPrice })}
                </Text>
                <Text style={[styles.chauffeurSub, { color: colors.textMuted }]}>
                  {t("vehicle.chauffeur.sub")}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => setWithChauffeur(!withChauffeur)}
                activeOpacity={0.7}
                style={[
                  styles.toggle,
                  {
                    backgroundColor: withChauffeur
                      ? colors.primary
                      : isDark
                        ? "rgba(234, 234, 234, 0.15)"
                        : "rgba(0, 0, 0, 0.1)",
                  },
                ]}
              >
                <View
                  style={[styles.toggleThumb, { left: withChauffeur ? 24 : 4 }]}
                />
              </TouchableOpacity>
            </View>
          )}

          {/* ─── Conditions ─── */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              {t("vehicle.conditionsTitle")}
            </Text>
            <View
              style={[
                styles.conditionsCard,
                { backgroundColor: colors.surface, borderColor: colors.border },
              ]}
            >
              {[
                t("vehicle.conditions.minAge", { age: vehicle.conditions.minAge }),
                t("vehicle.conditions.license", { years: vehicle.conditions.licenseYears }),
                t("vehicle.conditions.deposit", {
                  amount: vehicle.conditions.deposit.toLocaleString(),
                }),
                t("vehicle.conditions.km", { km: vehicle.conditions.kmPerDay }),
              ].map((text, index) => (
                <View key={index} style={styles.conditionRow}>
                  <View
                    style={[
                      styles.conditionCheck,
                      { backgroundColor: accentSoft },
                    ]}
                  >
                    <Check size={13} color={colors.primary} strokeWidth={2.2} />
                  </View>
                  <Text style={[styles.conditionText, { color: colors.textSecondary }]}>
                    {text}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* ─── Sticky Bottom Bar ─── */}
      <View
        style={[
          styles.bottomBar,
          { backgroundColor: colors.surface, borderColor: colors.border },
        ]}
      >
        <View style={styles.bottomPriceRow}>
          <Text style={[styles.bottomPrice, { color: colors.text }]}>
            {t("common.priceEuro", { price: vehicle.price })}
          </Text>
          <Text style={[styles.bottomUnit, { color: colors.textSecondary }]}>
            {" "}
            {t("common.perDay")}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => router.push(`/booking/${vehicle.id}` as any)}
          style={[styles.bookBtn, { backgroundColor: colors.primary }]}
          activeOpacity={0.9}
        >
          <Text style={styles.bookBtnText}>{t("vehicle.bookButton")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  /* Hero */
  hero: { height: 320, position: "relative" },
  heroImage: { width: "100%", height: 320 },
  heroNavRow: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  heroBtn: {
    width: 40,
    height: 40,
    borderRadius: 999,
    backgroundColor: "rgba(5, 4, 4, 0.55)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  heroRightBtns: { flexDirection: "row", gap: 8 },
  imageCounter: {
    position: "absolute",
    top: 56,
    alignSelf: "center",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: "rgba(5, 4, 4, 0.7)",
  },
  imageCounterText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 13,
    color: "#FFFFFF",
  },

  /* Body */
  body: { paddingHorizontal: 20, paddingTop: 24 },
  headerBlock: { marginBottom: 24 },
  vehicleName: {
    fontFamily: "Poppins_700Bold",
    fontSize: 22,
    marginBottom: 4,
    letterSpacing: -0.3,
  },
  vehicleYear: { fontFamily: "Poppins_400Regular", fontSize: 15, marginBottom: 12 },
  pricePill: {
    flexDirection: "row",
    alignItems: "baseline",
    alignSelf: "flex-start",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    marginBottom: 12,
  },
  priceValue: {
    fontFamily: "Poppins_700Bold",
    fontSize: 24,
    color: "#FFFFFF",
  },
  priceUnit: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.85)",
  },
  agencyLink: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  agencyDot: {
    width: 24,
    height: 24,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  agencyDotText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 11,
    color: "#FFFFFF",
  },
  agencyLinkName: { fontFamily: "Poppins_500Medium", fontSize: 14 },

  /* Sections */
  section: { marginBottom: 24 },
  sectionTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 17,
    marginBottom: 12,
  },

  /* Specs */
  specsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: GRID_GAP,
  },
  specCard: {
    width: GRID_ITEM_WIDTH,
    borderRadius: 22,
    padding: 14,
    alignItems: "center",
    gap: 6,
    borderWidth: 1,
  },
  specLabel: { fontFamily: "Poppins_400Regular", fontSize: 11 },
  specValue: { fontFamily: "Poppins_600SemiBold", fontSize: 13 },

  /* Features */
  featuresWrap: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  featurePill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
  },
  featurePillText: { fontFamily: "Poppins_500Medium", fontSize: 12 },

  /* Description */
  descriptionText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    lineHeight: 21,
  },

  /* Chauffeur */
  chauffeurCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderRadius: 24,
    padding: 14,
    paddingLeft: 18,
    borderWidth: 1,
    marginBottom: 18,
  },
  chauffeurInfo: { flex: 1 },
  chauffeurTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 15,
    marginBottom: 4,
  },
  chauffeurPrice: { fontFamily: "Poppins_600SemiBold", fontSize: 13 },
  chauffeurSub: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    marginTop: 4,
  },
  toggle: {
    width: 48,
    height: 28,
    borderRadius: 999,
    position: "relative",
    justifyContent: "center",
  },
  toggleThumb: {
    position: "absolute",
    width: 20,
    height: 20,
    borderRadius: 999,
    backgroundColor: "#FFFFFF",
  },

  /* Conditions */
  conditionsCard: {
    borderRadius: 22,
    padding: 16,
    borderWidth: 1,
    gap: 10,
  },
  conditionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  conditionCheck: {
    width: 22,
    height: 22,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  conditionText: {
    flex: 1,
    fontFamily: "Poppins_400Regular",
    fontSize: 13.5,
  },

  /* Bottom bar */
  bottomBar: {
    position: "absolute",
    bottom: 12,
    left: 12,
    right: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 18,
    paddingRight: 6,
    paddingVertical: 6,
    borderWidth: 1,
    borderRadius: 999,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },
  bottomPriceRow: { flexDirection: "row", alignItems: "baseline" },
  bottomPrice: { fontFamily: "Poppins_700Bold", fontSize: 17 },
  bottomUnit: { fontFamily: "Poppins_400Regular", fontSize: 13 },
  bookBtn: {
    height: 44,
    paddingHorizontal: 24,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  bookBtnText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    color: "#FFFFFF",
    letterSpacing: 0.3,
  },
});
