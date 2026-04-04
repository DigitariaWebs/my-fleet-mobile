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
              <Text style={[styles.searchPlaceholder, { color: colors.textSecondary }]}>
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
  headerSection: { paddingHorizontal: 20, paddingTop: 32, paddingBottom: 16 },
  headerRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 16 },
  greeting: { fontFamily: "Poppins_600SemiBold", fontSize: 20, color: "#EAEAEA" },
  bellWrapper: { position: "relative" },
  bellDot: { position: "absolute", top: 0, right: 0, width: 8, height: 8, borderRadius: 4, backgroundColor: "#E74C3C" },

  /* Search */
  searchBar: { height: 48, borderRadius: 24, backgroundColor: "#2E1C2B", borderWidth: 1, borderColor: "rgba(234, 234, 234, 0.1)", flexDirection: "row", alignItems: "center", paddingHorizontal: 16, gap: 12, marginBottom: 16 },
  searchPlaceholder: { flex: 1, fontFamily: "Poppins_400Regular", fontSize: 15, color: "rgba(234, 234, 234, 0.6)" },

  /* Filters */
  filtersRow: { flexDirection: "row", gap: 8 },
  filterChip: { flexDirection: "row", alignItems: "center", gap: 8, paddingHorizontal: 16, height: 36, borderRadius: 999, backgroundColor: "#2E1C2B", borderWidth: 1, borderColor: "rgba(234, 234, 234, 0.1)" },
  filterChipActive: { backgroundColor: "rgba(74, 25, 66, 0.3)", borderColor: "#4A1942" },
  filterChipText: { fontFamily: "Poppins_500Medium", fontSize: 13, color: "rgba(234, 234, 234, 0.6)" },
  filterChipTextActive: { fontFamily: "Poppins_500Medium", fontSize: 13, color: "#EAEAEA" },

  /* Sections */
  section: { marginBottom: 32 },
  sectionHeaderPadded: { paddingHorizontal: 20, marginBottom: 16 },
  sectionHeaderRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, marginBottom: 16 },
  sectionTitle: { fontFamily: "Poppins_600SemiBold", fontSize: 18, color: "#EAEAEA" },
  seeAll: { fontFamily: "Poppins_500Medium", fontSize: 13, color: "rgba(234, 234, 234, 0.6)" },

  /* Categories */
  categoriesScroll: { paddingHorizontal: 20, gap: 8 },
  categoryPill: { paddingHorizontal: 20, height: 36, borderRadius: 999, alignItems: "center", justifyContent: "center" },
  categoryPillActive: { backgroundColor: "#4A1942" },
  categoryPillInactive: { backgroundColor: "#2E1C2B", borderWidth: 1, borderColor: "rgba(234, 234, 234, 0.1)" },
  categoryPillText: { fontFamily: "Poppins_500Medium", fontSize: 13 },

  /* Carousels */
  carouselScroll: { paddingHorizontal: 20, gap: 16 },

  /* Agency Card */
  agencyCard: { width: 240, borderRadius: 16, overflow: "hidden", borderWidth: 1, borderColor: "rgba(234, 234, 234, 0.1)" },
  agencyCover: { width: 240, height: 100 },
  agencyInfo: { backgroundColor: "#2E1C2B", paddingHorizontal: 16, paddingTop: 20, paddingBottom: 20, position: "relative" },
  agencyLogo: { position: "absolute", top: -20, left: 16, width: 40, height: 40, borderRadius: 20, backgroundColor: "#4A1942", alignItems: "center", justifyContent: "center", shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 4, elevation: 4 },
  agencyLogoText: { fontFamily: "Poppins_600SemiBold", fontSize: 16, color: "#EAEAEA" },
  agencyDetails: { marginTop: 20 },
  agencyName: { fontFamily: "Poppins_600SemiBold", fontSize: 15, color: "#EAEAEA", marginBottom: 8 },
  agencyMeta: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  agencyCity: { fontFamily: "Poppins_400Regular", fontSize: 13, color: "rgba(234, 234, 234, 0.6)" },
  ratingRow: { flexDirection: "row", alignItems: "center", gap: 4 },
  ratingText: { fontFamily: "Poppins_600SemiBold", fontSize: 13, color: "#EAEAEA" },
  reviewCount: { fontFamily: "Poppins_400Regular", fontSize: 11, color: "rgba(234, 234, 234, 0.6)" },

  /* Vehicle Card */
  vehicleCard: { width: 280, borderRadius: 16, overflow: "hidden", borderWidth: 1, borderColor: "rgba(234, 234, 234, 0.1)" },
  vehicleImage: { width: 280, height: 160 },
  vehicleInfo: { backgroundColor: "#2E1C2B", paddingHorizontal: 16, paddingVertical: 20 },
  vehicleName: { fontFamily: "Poppins_600SemiBold", fontSize: 16, color: "#EAEAEA", marginBottom: 8 },
  vehicleSpecs: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 16 },
  specText: { fontFamily: "Poppins_400Regular", fontSize: 13, color: "rgba(234, 234, 234, 0.6)" },
  specDot: { fontFamily: "Poppins_400Regular", fontSize: 13, color: "rgba(234, 234, 234, 0.6)" },
  vehicleBottom: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  priceRow: { flexDirection: "row", alignItems: "baseline" },
  priceValue: { fontFamily: "Poppins_600SemiBold", fontSize: 18, color: "#EAEAEA" },
  priceUnit: { fontFamily: "Poppins_400Regular", fontSize: 13, color: "rgba(234, 234, 234, 0.6)" },
  agencyBadge: { flexDirection: "row", alignItems: "center", gap: 8 },
  agencyBadgeDot: { width: 24, height: 24, borderRadius: 12, backgroundColor: "#4A1942", alignItems: "center", justifyContent: "center" },
  agencyBadgeLetter: { fontFamily: "Poppins_600SemiBold", fontSize: 10, color: "#EAEAEA" },
  agencyBadgeName: { fontFamily: "Poppins_400Regular", fontSize: 12, color: "rgba(234, 234, 234, 0.6)" },

  /* Empty state */
  emptyState: { paddingHorizontal: 20, paddingVertical: 40, alignItems: "center" },
  emptyText: { fontFamily: "Poppins_400Regular", fontSize: 14, color: "rgba(234, 234, 234, 0.5)" },

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
