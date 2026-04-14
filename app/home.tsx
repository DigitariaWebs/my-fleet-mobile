import { useState, useCallback, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Bell,
  Search,
  SlidersHorizontal,
  Star,
} from "lucide-react-native";
import { BottomNav } from "@/components/BottomNav";
import { useTheme } from "@/context/ThemeContext";
import {
  agencies,
  vehicles,
  categories,
  vehicleImages,
} from "@/data/mockData";

export default function HomeScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState("Toutes");

  // Filter vehicles by category
  const filteredVehicles = useMemo(() => {
    if (selectedCategory === "Toutes") return vehicles;
    if (selectedCategory === "Avec chauffeur")
      return vehicles.filter((v) => v.chauffeurAvailable);
    return vehicles.filter((v) => v.category === selectedCategory);
  }, [selectedCategory]);



  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]} edges={["top"]}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* ─── Header ─── */}
          <View style={styles.headerSection}>
            <View style={styles.headerRow}>
              <Text style={[styles.greeting, { color: colors.text }]}>Bonjour, Jean-Pierre</Text>
              <TouchableOpacity
                style={styles.bellWrapper}
                activeOpacity={0.7}
                onPress={() => router.push("/notifications")}
              >
                <Bell size={24} color="#EAEAEA" strokeWidth={1.5} />
                <View style={styles.bellDot} />
              </TouchableOpacity>
            </View>

            {/* Search Bar */}
            <TouchableOpacity
              style={[styles.searchBar, { backgroundColor: colors.surface, borderColor: colors.border }]}
              activeOpacity={0.85}
              onPress={() => router.push("/search")}
            >
              <Search size={20} color={colors.textSecondary} strokeWidth={1.5} />
              <Text
                style={[styles.searchPlaceholder, { color: colors.textSecondary }]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                Rechercher un véhicule, une agence...
              </Text>
              <SlidersHorizontal size={20} color={colors.textSecondary} strokeWidth={1.5} />
            </TouchableOpacity>

          </View>

          {/* ─── Catégories ─── */}
          <View style={styles.section}>
            <View style={styles.sectionHeaderPadded}>
              <Text style={styles.sectionTitle}>Catégories</Text>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoriesScroll}
            >
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <TouchableOpacity
                    key={cat}
                    onPress={() => setSelectedCategory(cat)}
                    activeOpacity={0.85}
                    style={[
                      styles.categoryPill,
                      isActive ? styles.categoryPillActive : styles.categoryPillInactive,
                    ]}
                  >
                    <Text style={[styles.categoryPillText, { color: "#EAEAEA" }]}>
                      {cat}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          {/* ─── Agences populaires ─── */}
          <View style={styles.section}>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionTitle}>Agences populaires</Text>
              <TouchableOpacity activeOpacity={0.7} onPress={() => router.push("/agencies")}>
                <Text style={styles.seeAll}>Voir tout</Text>
              </TouchableOpacity>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.carouselScroll}
            >
              {agencies.slice(0, 3).map((agency, index) => (
                <TouchableOpacity
                  key={agency.id}
                  activeOpacity={0.9}
                  style={styles.agencyCard}
                  onPress={() => router.push(`/agency/${agency.id}` as any)}
                >
                  <Image source={{ uri: vehicleImages[index] }} style={styles.agencyCover} />
                  <View style={[styles.agencyInfo, { backgroundColor: colors.surface }]}>
                    <View style={styles.agencyLogo}>
                      <Text style={styles.agencyLogoText}>{agency.logo}</Text>
                    </View>
                    <View style={styles.agencyDetails}>
                      <Text style={styles.agencyName} numberOfLines={1}>{agency.name}</Text>
                      <View style={styles.agencyMeta}>
                        <Text style={styles.agencyCity}>{agency.city}</Text>
                        <View style={styles.ratingRow}>
                          <Star size={14} fill="#F1C40F" color="#F1C40F" strokeWidth={1.5} />
                          <Text style={styles.ratingText}>{agency.rating}</Text>
                          <Text style={styles.reviewCount}>({agency.reviews})</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* ─── Véhicules recommandés (filtered) ─── */}
          <View style={styles.section}>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionTitle}>
                {selectedCategory === "Toutes"
                  ? "Véhicules recommandés"
                  : `${selectedCategory}`}
              </Text>
              <TouchableOpacity activeOpacity={0.7} onPress={() => router.push("/agencies")}>
                <Text style={styles.seeAll}>Voir tout</Text>
              </TouchableOpacity>
            </View>
            {filteredVehicles.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyText}>Aucun véhicule dans cette catégorie</Text>
              </View>
            ) : (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.carouselScroll}
              >
                {filteredVehicles.map((vehicle) => {
                  const agency = agencies.find((a) => a.id === vehicle.agencyId);
                  const imgIndex = vehicles.findIndex((v) => v.id === vehicle.id);
                  return (
                    <TouchableOpacity
                      key={vehicle.id}
                      activeOpacity={0.9}
                      style={styles.vehicleCard}
                      onPress={() => router.push(`/vehicle/${vehicle.id}` as any)}
                    >
                      <Image source={{ uri: vehicleImages[imgIndex] }} style={styles.vehicleImage} />
                      <View style={[styles.vehicleInfo, { backgroundColor: colors.surface }]}>
                        <Text style={styles.vehicleName} numberOfLines={1}>{vehicle.name}</Text>
                        <View style={styles.vehicleSpecs}>
                          <Text style={styles.specText}>{vehicle.year}</Text>
                          <Text style={styles.specDot}>•</Text>
                          <Text style={styles.specText}>{vehicle.transmission}</Text>
                          <Text style={styles.specDot}>•</Text>
                          <Text style={styles.specText}>{vehicle.fuel}</Text>
                        </View>
                        <View style={styles.vehicleBottom}>
                          <View style={styles.priceRow}>
                            <Text style={styles.priceValue}>{vehicle.price} €</Text>
                            <Text style={styles.priceUnit}> / jour</Text>
                          </View>
                          <View style={styles.agencyBadge}>
                            <View style={styles.agencyBadgeDot}>
                              <Text style={styles.agencyBadgeLetter}>{agency?.logo}</Text>
                            </View>
                            <Text style={styles.agencyBadgeName}>
                              {vehicle.agencyName.split(" ")[0]}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            )}
          </View>
        </ScrollView>

        <BottomNav />
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#050404" },
  container: { flex: 1, backgroundColor: "#050404" },
  scrollContent: { paddingBottom: 16 },

  /* Header */
  headerSection: { paddingHorizontal: 16, paddingTop: 20, paddingBottom: 12 },
  headerRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 14 },
  greeting: { fontFamily: "Poppins_600SemiBold", fontSize: 18, color: "#EAEAEA" },
  bellWrapper: { width: 40, height: 40, borderRadius: 999, backgroundColor: "#2E1C2B", borderWidth: 1, borderColor: "rgba(234, 234, 234, 0.08)", alignItems: "center", justifyContent: "center", position: "relative" },
  bellDot: { position: "absolute", top: 8, right: 8, width: 8, height: 8, borderRadius: 4, backgroundColor: "#E74C3C" },

  /* Search */
  searchBar: { height: 46, borderRadius: 999, backgroundColor: "#2E1C2B", borderWidth: 1, borderColor: "rgba(234, 234, 234, 0.08)", flexDirection: "row", alignItems: "center", paddingHorizontal: 18, gap: 10, marginBottom: 12 },
  searchPlaceholder: { flex: 1, minWidth: 0, fontFamily: "Poppins_400Regular", fontSize: 13, color: "rgba(234, 234, 234, 0.55)" },

  /* Filters */
  filtersRow: { flexDirection: "row", gap: 8 },
  filterChip: { flexDirection: "row", alignItems: "center", gap: 8, paddingHorizontal: 14, height: 32, borderRadius: 999, backgroundColor: "#2E1C2B", borderWidth: 1, borderColor: "rgba(234, 234, 234, 0.08)" },
  filterChipActive: { backgroundColor: "rgba(74, 25, 66, 0.3)", borderColor: "#4A1942" },
  filterChipText: { fontFamily: "Poppins_500Medium", fontSize: 12, color: "rgba(234, 234, 234, 0.6)" },
  filterChipTextActive: { fontFamily: "Poppins_500Medium", fontSize: 12, color: "#EAEAEA" },

  /* Sections */
  section: { marginBottom: 22 },
  sectionHeaderPadded: { paddingHorizontal: 16, marginBottom: 10 },
  sectionHeaderRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, marginBottom: 10 },
  sectionTitle: { fontFamily: "Poppins_600SemiBold", fontSize: 16, color: "#EAEAEA" },
  seeAll: { fontFamily: "Poppins_500Medium", fontSize: 12, color: "rgba(234, 234, 234, 0.6)" },

  /* Categories */
  categoriesScroll: { paddingHorizontal: 16, gap: 6 },
  categoryPill: { paddingHorizontal: 16, height: 32, borderRadius: 999, alignItems: "center", justifyContent: "center" },
  categoryPillActive: { backgroundColor: "#4A1942" },
  categoryPillInactive: { backgroundColor: "#2E1C2B", borderWidth: 1, borderColor: "rgba(234, 234, 234, 0.08)" },
  categoryPillText: { fontFamily: "Poppins_500Medium", fontSize: 12 },

  /* Carousels */
  carouselScroll: { paddingHorizontal: 16, gap: 12 },

  /* Agency Card */
  agencyCard: { width: 220, borderRadius: 24, overflow: "hidden", borderWidth: 1, borderColor: "rgba(234, 234, 234, 0.08)" },
  agencyCover: { width: 220, height: 92 },
  agencyInfo: { backgroundColor: "#2E1C2B", paddingHorizontal: 14, paddingTop: 18, paddingBottom: 14, position: "relative" },
  agencyLogo: { position: "absolute", top: -18, left: 14, width: 36, height: 36, borderRadius: 999, backgroundColor: "#4A1942", borderWidth: 2, borderColor: "#2E1C2B", alignItems: "center", justifyContent: "center" },
  agencyLogoText: { fontFamily: "Poppins_600SemiBold", fontSize: 14, color: "#EAEAEA" },
  agencyDetails: { marginTop: 14 },
  agencyName: { fontFamily: "Poppins_600SemiBold", fontSize: 14, color: "#EAEAEA", marginBottom: 4 },
  agencyMeta: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  agencyCity: { fontFamily: "Poppins_400Regular", fontSize: 12, color: "rgba(234, 234, 234, 0.55)" },
  ratingRow: { flexDirection: "row", alignItems: "center", gap: 4 },
  ratingText: { fontFamily: "Poppins_600SemiBold", fontSize: 12, color: "#EAEAEA" },
  reviewCount: { fontFamily: "Poppins_400Regular", fontSize: 10, color: "rgba(234, 234, 234, 0.55)" },

  /* Vehicle Card */
  vehicleCard: { width: 260, borderRadius: 24, overflow: "hidden", borderWidth: 1, borderColor: "rgba(234, 234, 234, 0.08)" },
  vehicleImage: { width: 260, height: 150 },
  vehicleInfo: { backgroundColor: "#2E1C2B", paddingHorizontal: 14, paddingVertical: 14 },
  vehicleName: { fontFamily: "Poppins_600SemiBold", fontSize: 15, color: "#EAEAEA", marginBottom: 6 },
  vehicleSpecs: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 12 },
  specText: { fontFamily: "Poppins_400Regular", fontSize: 12, color: "rgba(234, 234, 234, 0.55)" },
  specDot: { fontFamily: "Poppins_400Regular", fontSize: 12, color: "rgba(234, 234, 234, 0.35)" },
  vehicleBottom: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  priceRow: { flexDirection: "row", alignItems: "baseline" },
  priceValue: { fontFamily: "Poppins_700Bold", fontSize: 17, color: "#EAEAEA" },
  priceUnit: { fontFamily: "Poppins_400Regular", fontSize: 12, color: "rgba(234, 234, 234, 0.55)" },
  agencyBadge: { flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 999, backgroundColor: "rgba(74, 25, 66, 0.25)" },
  agencyBadgeDot: { width: 18, height: 18, borderRadius: 999, backgroundColor: "#4A1942", alignItems: "center", justifyContent: "center" },
  agencyBadgeLetter: { fontFamily: "Poppins_600SemiBold", fontSize: 9, color: "#EAEAEA" },
  agencyBadgeName: { fontFamily: "Poppins_500Medium", fontSize: 11, color: "#EAEAEA" },

  /* Empty state */
  emptyState: { paddingHorizontal: 16, paddingVertical: 32, alignItems: "center" },
  emptyText: { fontFamily: "Poppins_400Regular", fontSize: 13, color: "rgba(234, 234, 234, 0.5)" },

  /* ─── Modal ─── */
  modalOverlay: { flex: 1, backgroundColor: "rgba(0, 0, 0, 0.6)", justifyContent: "flex-end" },
  modalSheet: { backgroundColor: "#0d0a0c", borderTopLeftRadius: 24, borderTopRightRadius: 24, paddingBottom: 40 },
  modalDragHandle: { width: 40, height: 4, borderRadius: 2, backgroundColor: "rgba(234, 234, 234, 0.3)", alignSelf: "center", marginTop: 12, marginBottom: 20 },
  modalHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, marginBottom: 16 },
  modalTitle: { fontFamily: "Poppins_600SemiBold", fontSize: 18, color: "#EAEAEA" },
  modalList: { paddingHorizontal: 20, gap: 4 },
  modalRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, paddingVertical: 14, borderRadius: 12 },
  modalRowSelected: { backgroundColor: "rgba(74, 25, 66, 0.15)" },
  modalRowLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  modalRowText: { fontFamily: "Poppins_400Regular", fontSize: 15, color: "rgba(234, 234, 234, 0.7)" },
  modalRowTextSelected: { fontFamily: "Poppins_500Medium", color: "#EAEAEA" },
});
