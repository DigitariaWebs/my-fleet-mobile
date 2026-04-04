import { useState } from "react";
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
import { ArrowLeft, Star } from "lucide-react-native";
import { BottomNav } from "@/components/BottomNav";
import { agencies, vehicleImages } from "@/data/mockData";

const cityFilters = ["Toutes", "Nice", "Cannes", "Monaco", "Antibes"];

export default function AgencyListScreen() {
  const router = useRouter();
  const [selectedCity, setSelectedCity] = useState("Toutes");

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Header */}
          <View style={styles.headerRow}>
            <TouchableOpacity
              onPress={() => router.back()}
              activeOpacity={0.7}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <ArrowLeft size={24} color="#EAEAEA" strokeWidth={1.5} />
            </TouchableOpacity>
            <Text style={styles.title}>Agences</Text>
          </View>

          {/* City Filter Chips */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filtersScroll}
          >
            {cityFilters.map((city) => {
              const isActive = selectedCity === city;
              return (
                <TouchableOpacity
                  key={city}
                  onPress={() => setSelectedCity(city)}
                  activeOpacity={0.85}
                  style={[
                    styles.filterPill,
                    isActive ? styles.filterPillActive : styles.filterPillInactive,
                  ]}
                >
                  <Text style={styles.filterPillText}>{city}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Agency Cards */}
          <View style={styles.cardsList}>
            {agencies.map((agency, index) => (
              <TouchableOpacity
                key={agency.id}
                activeOpacity={0.9}
                style={styles.card}
                onPress={() => router.push(`/agency/${agency.id}` as any)}
              >
                {/* Cover Image */}
                <Image
                  source={{ uri: vehicleImages[index % vehicleImages.length] }}
                  style={styles.cardImage}
                />

                {/* Info Section */}
                <View style={styles.cardInfo}>
                  {/* Overlapping Logo */}
                  <View style={styles.logoCircle}>
                    <Text style={styles.logoText}>{agency.logo}</Text>
                  </View>

                  <View style={styles.cardDetails}>
                    <View style={styles.cardTopRow}>
                      <View style={styles.cardTopLeft}>
                        <Text style={styles.agencyName}>{agency.name}</Text>
                        <Text style={styles.agencySub}>
                          {agency.city} — {agency.vehicles} véhicules
                        </Text>
                      </View>
                      <View style={styles.ratingRow}>
                        <Star
                          size={14}
                          fill="#F1C40F"
                          color="#F1C40F"
                          strokeWidth={1.5}
                        />
                        <Text style={styles.ratingText}>{agency.rating}</Text>
                        <Text style={styles.reviewCount}>
                          ({agency.reviews} avis)
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <BottomNav />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#050404",
  },
  container: {
    flex: 1,
    backgroundColor: "#050404",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 32,
    paddingBottom: 16,
  },

  /* Header */
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginBottom: 24,
  },
  title: {
    fontFamily: "Poppins_700Bold",
    fontSize: 20,
    color: "#EAEAEA",
  },

  /* Filters */
  filtersScroll: {
    gap: 8,
    marginBottom: 24,
  },
  filterPill: {
    paddingHorizontal: 16,
    height: 36,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  filterPillActive: {
    backgroundColor: "#4A1942",
  },
  filterPillInactive: {
    backgroundColor: "#2E1C2B",
    borderWidth: 1,
    borderColor: "rgba(234, 234, 234, 0.1)",
  },
  filterPillText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 13,
    color: "#EAEAEA",
  },

  /* Cards */
  cardsList: {
    gap: 12,
  },
  card: {
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(234, 234, 234, 0.08)",
  },
  cardImage: {
    width: "100%",
    height: 100,
  },
  cardInfo: {
    backgroundColor: "#2E1C2B",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    position: "relative",
  },

  /* Logo */
  logoCircle: {
    position: "absolute",
    top: -24,
    left: 16,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#4A1942",
    borderWidth: 3,
    borderColor: "#2E1C2B",
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    color: "#EAEAEA",
  },

  /* Details */
  cardDetails: {
    marginTop: 24,
  },
  cardTopRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  cardTopLeft: {
    flex: 1,
    marginRight: 8,
  },
  agencyName: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    color: "#EAEAEA",
    marginBottom: 4,
  },
  agencySub: {
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
    color: "rgba(234, 234, 234, 0.6)",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ratingText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    color: "#EAEAEA",
  },
  reviewCount: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: "rgba(234, 234, 234, 0.5)",
  },
});
