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
import {
  ArrowLeft,
  Share2,
  MapPin,
  Star,
  CheckCircle,
} from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  agencies,
  vehicles,
  reviews,
  vehicleImages,
} from "@/data/mockData";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

type Tab = "vehicles" | "reviews";

export default function AgencyDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<Tab>("vehicles");

  const agency = agencies.find((a) => a.id === id);
  const agencyVehicles = vehicles.filter((v) => v.agencyId === id);
  const agencyReviews = reviews.filter((r) => r.agencyId === id);

  if (!agency) return null;

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ─── Hero ─── */}
        <View style={styles.hero}>
          <Image
            source={{ uri: vehicleImages[Number(id) - 1] }}
            style={styles.heroImage}
          />
          <LinearGradient
            colors={["transparent", "rgba(5, 4, 4, 0.9)"]}
            locations={[0.3, 1]}
            style={StyleSheet.absoluteFillObject}
          />

          {/* Back */}
          <SafeAreaView style={styles.heroNav} edges={["top"]}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.heroButton}
              activeOpacity={0.7}
            >
              <ArrowLeft size={20} color="#EAEAEA" strokeWidth={1.5} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.heroButton} activeOpacity={0.7}>
              <Share2 size={20} color="#EAEAEA" strokeWidth={1.5} />
            </TouchableOpacity>
          </SafeAreaView>

          {/* Overlapping Logo */}
          <View style={styles.heroLogo}>
            <Text style={styles.heroLogoText}>{agency.logo}</Text>
          </View>
        </View>

        {/* ─── Info ─── */}
        <View style={styles.infoSection}>
          <Text style={styles.agencyName}>{agency.name}</Text>

          <View style={styles.addressRow}>
            <MapPin
              size={16}
              color="rgba(234, 234, 234, 0.6)"
              strokeWidth={1.5}
            />
            <Text style={styles.addressText}>{agency.address}</Text>
          </View>

          <View style={styles.metaRow}>
            <View style={styles.ratingRow}>
              <Star size={16} fill="#F1C40F" color="#F1C40F" strokeWidth={1.5} />
              <Text style={styles.ratingValue}>{agency.rating}</Text>
              <Text style={styles.ratingCount}>({agency.reviews} avis)</Text>
            </View>
            <View style={styles.verifiedBadge}>
              <CheckCircle size={12} color="#2ECC71" strokeWidth={1.5} />
              <Text style={styles.verifiedText}>Agence vérifiée</Text>
            </View>
          </View>

          <Text style={styles.description}>{agency.description}</Text>

          {/* ─── Tabs ─── */}
          <View style={styles.tabContainer}>
            <TouchableOpacity
              onPress={() => setActiveTab("vehicles")}
              style={[styles.tab, activeTab === "vehicles" && styles.tabActive]}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.tabText,
                  {
                    color:
                      activeTab === "vehicles"
                        ? "#EAEAEA"
                        : "rgba(234, 234, 234, 0.5)",
                  },
                ]}
              >
                Véhicules
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setActiveTab("reviews")}
              style={[styles.tab, activeTab === "reviews" && styles.tabActive]}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.tabText,
                  {
                    color:
                      activeTab === "reviews"
                        ? "#EAEAEA"
                        : "rgba(234, 234, 234, 0.5)",
                  },
                ]}
              >
                Avis
              </Text>
            </TouchableOpacity>
          </View>

          {/* ─── Vehicles Tab ─── */}
          {activeTab === "vehicles" && (
            <View>
              <Text style={styles.vehicleCount}>
                {agencyVehicles.length} véhicules disponibles
              </Text>
              <View style={styles.vehiclesGrid}>
                {agencyVehicles.map((vehicle) => (
                  <TouchableOpacity
                    key={vehicle.id}
                    activeOpacity={0.9}
                    style={styles.vehicleMiniCard}
                    onPress={() =>
                      router.push(`/vehicle/${vehicle.id}` as any)
                    }
                  >
                    <Image
                      source={{
                        uri: vehicleImages[Number(vehicle.id) - 1],
                      }}
                      style={styles.vehicleMiniImage}
                    />
                    <View style={styles.vehicleMiniInfo}>
                      <Text style={styles.vehicleMiniName} numberOfLines={1}>
                        {vehicle.name}
                      </Text>
                      <View style={styles.vehicleMiniPriceRow}>
                        <Text style={styles.vehicleMiniPrice}>
                          {vehicle.price} €
                        </Text>
                        <Text style={styles.vehicleMiniUnit}> / jour</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* ─── Reviews Tab ─── */}
          {activeTab === "reviews" && (
            <View>
              {/* Rating Summary */}
              <View style={styles.ratingSummary}>
                <View style={styles.ratingSummaryTop}>
                  <Text style={styles.ratingSummaryBig}>{agency.rating}</Text>
                  <Text style={styles.ratingSummaryMax}>/5</Text>
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
                <Text style={styles.ratingSummaryCount}>
                  Basé sur {agency.reviews} avis
                </Text>
              </View>

              {/* Review Cards */}
              <View style={styles.reviewsList}>
                {agencyReviews.map((review) => (
                  <View key={review.id} style={styles.reviewCard}>
                    {/* Header */}
                    <View style={styles.reviewHeader}>
                      <View style={styles.reviewUser}>
                        <View style={styles.reviewAvatar}>
                          <Text style={styles.reviewAvatarText}>
                            {review.userName[0]}
                          </Text>
                        </View>
                        <Text style={styles.reviewUserName}>
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

                    <Text style={styles.reviewComment}>{review.comment}</Text>
                    <Text style={styles.reviewDate}>{review.date}</Text>

                    {/* Agency Response */}
                    {review.agencyResponse && (
                      <View style={styles.responseBox}>
                        <Text style={styles.responseLabel}>
                          Réponse de l'agence
                        </Text>
                        <Text style={styles.responseText}>
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
    </View>
  );
}

const GRID_GAP = 12;
const GRID_ITEM_WIDTH = (SCREEN_WIDTH - 40 - GRID_GAP) / 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050404",
  },

  /* ─── Hero ─── */
  hero: {
    height: 240,
    position: "relative",
  },
  heroImage: {
    width: "100%",
    height: 240,
  },
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
    borderColor: "rgba(234, 234, 234, 0.08)",
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
    backgroundColor: "#4A1942",
    borderWidth: 3,
    borderColor: "#050404",
    alignItems: "center",
    justifyContent: "center",
  },
  heroLogoText: {
    fontFamily: "Poppins_700Bold",
    fontSize: 20,
    color: "#EAEAEA",
  },

  /* ─── Info ─── */
  infoSection: {
    paddingHorizontal: 16,
    paddingTop: 34,
    paddingBottom: 20,
  },
  agencyName: {
    fontFamily: "Poppins_700Bold",
    fontSize: 20,
    color: "#EAEAEA",
    marginBottom: 6,
  },
  addressRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 10,
  },
  addressText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
    color: "rgba(234, 234, 234, 0.6)",
  },
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
    backgroundColor: "rgba(241, 196, 15, 0.1)",
  },
  ratingValue: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 13,
    color: "#EAEAEA",
  },
  ratingCount: {
    fontFamily: "Poppins_400Regular",
    fontSize: 11,
    color: "rgba(234, 234, 234, 0.5)",
  },
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
    color: "rgba(234, 234, 234, 0.7)",
    lineHeight: 19,
    marginBottom: 16,
  },

  /* ─── Tabs pill ─── */
  tabContainer: {
    flexDirection: "row",
    padding: 4,
    borderRadius: 999,
    backgroundColor: "#2E1C2B",
    borderWidth: 1,
    borderColor: "rgba(234, 234, 234, 0.08)",
    marginBottom: 18,
  },
  tab: {
    flex: 1,
    height: 36,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  tabActive: {
    backgroundColor: "#4A1942",
  },
  tabText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 12,
    letterSpacing: 0.2,
  },
  tabIndicator: {
    display: "none",
    height: 0,
    width: 0,
  },

  /* ─── Vehicles Tab ─── */
  vehicleCount: {
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    color: "rgba(234, 234, 234, 0.55)",
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
    borderColor: "rgba(234, 234, 234, 0.06)",
  },
  vehicleMiniImage: {
    width: GRID_ITEM_WIDTH,
    height: 96,
  },
  vehicleMiniInfo: {
    backgroundColor: "#2E1C2B",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  vehicleMiniName: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 13,
    color: "#EAEAEA",
    marginBottom: 4,
  },
  vehicleMiniPriceRow: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  vehicleMiniPrice: {
    fontFamily: "Poppins_700Bold",
    fontSize: 14,
    color: "#EAEAEA",
  },
  vehicleMiniUnit: {
    fontFamily: "Poppins_400Regular",
    fontSize: 10,
    color: "rgba(234, 234, 234, 0.5)",
  },

  /* ─── Reviews Tab ─── */
  ratingSummary: {
    backgroundColor: "#2E1C2B",
    borderRadius: 28,
    padding: 22,
    alignItems: "center",
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "rgba(234, 234, 234, 0.06)",
  },
  ratingSummaryTop: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 4,
    marginBottom: 8,
  },
  ratingSummaryBig: {
    fontFamily: "Poppins_700Bold",
    fontSize: 40,
    color: "#EAEAEA",
  },
  ratingSummaryMax: {
    fontFamily: "Poppins_400Regular",
    fontSize: 20,
    color: "rgba(234, 234, 234, 0.5)",
  },
  starsRow: {
    flexDirection: "row",
    gap: 4,
    marginBottom: 8,
  },
  ratingSummaryCount: {
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
    color: "rgba(234, 234, 234, 0.6)",
  },

  /* Review Cards */
  reviewsList: {
    gap: 12,
  },
  reviewCard: {
    backgroundColor: "#2E1C2B",
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(234, 234, 234, 0.06)",
  },
  reviewHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  reviewUser: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  reviewAvatar: {
    width: 32,
    height: 32,
    borderRadius: 999,
    backgroundColor: "#4A1942",
    alignItems: "center",
    justifyContent: "center",
  },
  reviewAvatarText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    color: "#EAEAEA",
  },
  reviewUserName: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    color: "#EAEAEA",
  },
  reviewStars: {
    flexDirection: "row",
    gap: 2,
  },
  reviewComment: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "rgba(234, 234, 234, 0.7)",
    lineHeight: 20,
    marginBottom: 8,
  },
  reviewDate: {
    fontFamily: "Poppins_400Regular",
    fontSize: 11,
    color: "rgba(234, 234, 234, 0.4)",
  },
  responseBox: {
    marginTop: 12,
    padding: 12,
    borderRadius: 18,
    backgroundColor: "rgba(74, 25, 66, 0.25)",
  },
  responseLabel: {
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    color: "rgba(234, 234, 234, 0.8)",
    marginBottom: 4,
  },
  responseText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
    color: "rgba(234, 234, 234, 0.7)",
    lineHeight: 19,
  },
});
