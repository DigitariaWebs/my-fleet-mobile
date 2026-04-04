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
import {
  Calendar,
  MapPin,
  ChevronRight,
} from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BottomNav } from "@/components/BottomNav";
import { bookings, vehicleImages } from "@/data/mockData";

type TabKey = "active" | "upcoming" | "history";

interface Tab {
  key: TabKey;
  label: string;
}

const tabs: Tab[] = [
  { key: "active", label: "En cours" },
  { key: "upcoming", label: "À venir" },
  { key: "history", label: "Historique" },
];

const statusConfig: Record<
  string,
  { bg: string; color: string; borderColor: string; label: string }
> = {
  active: {
    bg: "rgba(74, 25, 66, 0.3)",
    color: "#4A1942",
    borderColor: "rgba(74, 25, 66, 0.5)",
    label: "En cours",
  },
  confirmed: {
    bg: "rgba(46, 204, 113, 0.2)",
    color: "#2ECC71",
    borderColor: "rgba(46, 204, 113, 0.4)",
    label: "Confirmée",
  },
  completed: {
    bg: "rgba(234, 234, 234, 0.15)",
    color: "rgba(234, 234, 234, 0.6)",
    borderColor: "rgba(234, 234, 234, 0.2)",
    label: "Terminée",
  },
};

export default function BookingsScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabKey>("active");

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Title */}
          <Text style={styles.pageTitle}>Mes réservations</Text>

          {/* Tabs */}
          <View style={styles.tabContainer}>
            {tabs.map((tab) => {
              const isActive = activeTab === tab.key;
              return (
                <TouchableOpacity
                  key={tab.key}
                  onPress={() => setActiveTab(tab.key)}
                  style={styles.tab}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.tabText,
                      {
                        color: isActive
                          ? "#EAEAEA"
                          : "rgba(234, 234, 234, 0.5)",
                      },
                    ]}
                  >
                    {tab.label}
                  </Text>
                  {isActive && <View style={styles.tabIndicator} />}
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Booking Cards */}
          <View style={styles.cardsList}>
            {bookings.map((booking, index) => {
              const status = statusConfig[booking.status] ?? statusConfig.completed;

              return (
                <TouchableOpacity
                  key={booking.id}
                  activeOpacity={0.95}
                  style={styles.card}
                  onPress={() => router.push(`/tracking/${booking.id}` as any)}
                >
                  {/* Image Section */}
                  <View style={styles.cardImageWrapper}>
                    <Image
                      source={{
                        uri: vehicleImages[index % vehicleImages.length],
                      }}
                      style={styles.cardImage}
                    />
                    {/* Gradient overlay */}
                    <LinearGradient
                      colors={["transparent", "rgba(5, 4, 4, 0.7)"]}
                      locations={[0, 1]}
                      style={StyleSheet.absoluteFillObject}
                    />
                    {/* Status badge */}
                    <View
                      style={[
                        styles.statusBadge,
                        {
                          backgroundColor: status.bg,
                          borderColor: status.borderColor,
                        },
                      ]}
                    >
                      <Text style={[styles.statusText, { color: status.color }]}>
                        {status.label}
                      </Text>
                    </View>
                  </View>

                  {/* Content Section */}
                  <View style={styles.cardContent}>
                    {/* Top row */}
                    <View style={styles.cardTopRow}>
                      <View style={styles.cardTopLeft}>
                        <Text style={styles.vehicleName}>
                          {booking.vehicleName}
                        </Text>
                        <View style={styles.agencyRow}>
                          <MapPin
                            size={12}
                            color="rgba(234, 234, 234, 0.6)"
                            strokeWidth={1.5}
                          />
                          <Text style={styles.agencyName}>
                            {booking.agencyName}
                          </Text>
                        </View>
                      </View>
                      <ChevronRight
                        size={20}
                        color="rgba(234, 234, 234, 0.6)"
                        strokeWidth={1.5}
                      />
                    </View>

                    {/* Date row */}
                    <View style={styles.dateRow}>
                      <Calendar
                        size={16}
                        color="#4A1942"
                        strokeWidth={1.5}
                      />
                      <Text style={styles.dateText}>
                        {booking.startDate} — {booking.endDate}
                      </Text>
                    </View>

                    {/* Footer */}
                    <View style={styles.cardFooter}>
                      <View>
                        <Text style={styles.totalLabel}>Total</Text>
                        <Text style={styles.totalValue}>{booking.total} €</Text>
                      </View>
                      <View style={styles.detailsButton}>
                        <Text style={styles.detailsButtonText}>
                          Voir détails
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
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

  /* Title */
  pageTitle: {
    fontFamily: "Poppins_700Bold",
    fontSize: 22,
    color: "#EAEAEA",
    marginBottom: 24,
  },

  /* Tabs */
  tabContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(234, 234, 234, 0.1)",
    marginBottom: 24,
  },
  tab: {
    flex: 1,
    paddingBottom: 12,
    alignItems: "center",
    position: "relative",
  },
  tabText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 15,
  },
  tabIndicator: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: "#4A1942",
    borderTopLeftRadius: 999,
    borderTopRightRadius: 999,
  },

  /* Cards */
  cardsList: {
    gap: 20,
  },
  card: {
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(74, 25, 66, 0.3)",
    backgroundColor: "#2E1C2B",
  },

  /* Card Image */
  cardImageWrapper: {
    width: "100%",
    height: 180,
    position: "relative",
    overflow: "hidden",
  },
  cardImage: {
    width: "100%",
    height: 180,
  },
  statusBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
  },
  statusText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 12,
  },

  /* Card Content */
  cardContent: {
    padding: 20,
  },
  cardTopRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  cardTopLeft: {
    flex: 1,
  },
  vehicleName: {
    fontFamily: "Poppins_700Bold",
    fontSize: 17,
    color: "#EAEAEA",
    marginBottom: 4,
  },
  agencyRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  agencyName: {
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
    color: "rgba(234, 234, 234, 0.6)",
  },

  /* Date */
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: "rgba(74, 25, 66, 0.15)",
    marginBottom: 16,
  },
  dateText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 13,
    color: "#EAEAEA",
  },

  /* Footer */
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(234, 234, 234, 0.1)",
  },
  totalLabel: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: "rgba(234, 234, 234, 0.6)",
    marginBottom: 2,
  },
  totalValue: {
    fontFamily: "Poppins_700Bold",
    fontSize: 20,
    color: "#EAEAEA",
  },
  detailsButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: "#4A1942",
  },
  detailsButtonText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 13,
    color: "#EAEAEA",
  },
});
