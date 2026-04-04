import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  User,
  ChevronRight,
  CreditCard,
  FileText,
  Bell,
  Globe,
  Moon,
  LogOut,
  Gift,
  TrendingUp,
  TrendingDown,
} from "lucide-react-native";
import type { LucideIcon } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BottomNav } from "@/components/BottomNav";
import { loyaltyTiers, loyaltyHistory } from "@/data/mockData";

const currentPoints = 2480;
const currentTier = loyaltyTiers[1]; // Argent
const nextTier = loyaltyTiers[2]; // Or

interface AccountItem {
  icon: LucideIcon;
  label: string;
}

const accountItems: AccountItem[] = [
  { icon: User, label: "Mes informations personnelles" },
  { icon: CreditCard, label: "Mes cartes bancaires" },
  { icon: FileText, label: "Mes documents" },
];

export default function ProfileScreen() {
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* ─── Header Card ─── */}
          <View style={styles.headerCard}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>JD</Text>
            </View>
            <Text style={styles.userName}>Jean-Pierre Dupont</Text>
            <Text style={styles.memberSince}>
              Membre depuis Janvier 2024
            </Text>
            <View style={styles.verifiedBadge}>
              <Text style={styles.verifiedText}>Vérifié</Text>
            </View>
          </View>

          <View style={styles.body}>
            {/* ─── Loyalty Card ─── */}
            <LinearGradient
              colors={["#2E1C2B", "#4A1942"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.loyaltyCard}
            >
              <View style={styles.loyaltyHeader}>
                <Gift size={20} color="#EAEAEA" strokeWidth={1.5} />
                <Text style={styles.loyaltyTitle}>Programme MyFleet</Text>
              </View>
              <Text style={styles.loyaltyPoints}>
                {currentPoints.toLocaleString()} points
              </Text>
              <Text style={styles.loyaltyNext}>
                Prochain palier : {nextTier.name} —{" "}
                {nextTier.points.toLocaleString()} points
              </Text>

              {/* Benefits Box */}
              <View style={styles.benefitsBox}>
                <Text style={styles.benefitsTitle}>
                  Vos avantages — {currentTier.name}
                </Text>
                {currentTier.benefits.map((benefit, index) => (
                  <View key={index} style={styles.benefitRow}>
                    <View style={styles.benefitDot} />
                    <Text style={styles.benefitText}>{benefit}</Text>
                  </View>
                ))}
              </View>
            </LinearGradient>

            {/* ─── Loyalty History ─── */}
            <View style={styles.sectionBlock}>
              <Text style={styles.sectionTitle}>Historique fidélité</Text>
              <View style={styles.historyList}>
                {loyaltyHistory.slice(0, 3).map((item) => (
                  <View key={item.id} style={styles.historyRow}>
                    <View style={styles.historyLeft}>
                      {item.type === "earned" ? (
                        <TrendingUp
                          size={20}
                          color="#2ECC71"
                          strokeWidth={1.5}
                        />
                      ) : (
                        <TrendingDown
                          size={20}
                          color="#E74C3C"
                          strokeWidth={1.5}
                        />
                      )}
                      <View>
                        <Text style={styles.historyDescription}>
                          {item.description}
                        </Text>
                        <Text style={styles.historyDate}>{item.date}</Text>
                      </View>
                    </View>
                    <Text
                      style={[
                        styles.historyAmount,
                        {
                          color:
                            item.type === "earned" ? "#2ECC71" : "#E74C3C",
                        },
                      ]}
                    >
                      {item.amount > 0 ? "+" : ""}
                      {item.amount}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            {/* ─── Mon compte ─── */}
            <View style={styles.menuGroup}>
              {accountItems.map((item, index) => {
                const Icon = item.icon;
                const isLast = index === accountItems.length - 1;
                return (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.menuRow,
                      !isLast && styles.menuRowBorder,
                    ]}
                    activeOpacity={0.7}
                  >
                    <View style={styles.menuLeft}>
                      <Icon
                        size={20}
                        color="rgba(234, 234, 234, 0.6)"
                        strokeWidth={1.5}
                      />
                      <Text style={styles.menuLabel}>{item.label}</Text>
                    </View>
                    <ChevronRight
                      size={20}
                      color="rgba(234, 234, 234, 0.6)"
                      strokeWidth={1.5}
                    />
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* ─── Préférences ─── */}
            <View style={styles.menuGroup}>
              {/* Notifications */}
              <View style={[styles.menuRow, styles.menuRowBorder]}>
                <View style={styles.menuLeft}>
                  <Bell
                    size={20}
                    color="rgba(234, 234, 234, 0.6)"
                    strokeWidth={1.5}
                  />
                  <Text style={styles.menuLabel}>Notifications</Text>
                </View>
                <TouchableOpacity
                  onPress={() => setNotifications(!notifications)}
                  activeOpacity={0.7}
                  style={[
                    styles.toggle,
                    {
                      backgroundColor: notifications
                        ? "#4A1942"
                        : "rgba(234, 234, 234, 0.15)",
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.toggleThumb,
                      { left: notifications ? 24 : 4 },
                    ]}
                  />
                </TouchableOpacity>
              </View>

              {/* Language */}
              <TouchableOpacity
                style={[styles.menuRow, styles.menuRowBorder]}
                activeOpacity={0.7}
              >
                <View style={styles.menuLeft}>
                  <Globe
                    size={20}
                    color="rgba(234, 234, 234, 0.6)"
                    strokeWidth={1.5}
                  />
                  <Text style={styles.menuLabel}>Langue</Text>
                </View>
                <View style={styles.menuRight}>
                  <Text style={styles.menuValue}>Français</Text>
                  <ChevronRight
                    size={20}
                    color="rgba(234, 234, 234, 0.6)"
                    strokeWidth={1.5}
                  />
                </View>
              </TouchableOpacity>

              {/* Dark Mode */}
              <View style={styles.menuRow}>
                <View style={styles.menuLeft}>
                  <Moon
                    size={20}
                    color="rgba(234, 234, 234, 0.6)"
                    strokeWidth={1.5}
                  />
                  <Text style={styles.menuLabel}>Mode sombre</Text>
                </View>
                <TouchableOpacity
                  onPress={() => setDarkMode(!darkMode)}
                  activeOpacity={0.7}
                  style={[
                    styles.toggle,
                    {
                      backgroundColor: darkMode
                        ? "#4A1942"
                        : "rgba(234, 234, 234, 0.15)",
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.toggleThumb,
                      { left: darkMode ? 24 : 4 },
                    ]}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* ─── Log Out ─── */}
            <TouchableOpacity style={styles.logoutButton} activeOpacity={0.7}>
              <LogOut size={20} color="#E74C3C" strokeWidth={1.5} />
              <Text style={styles.logoutText}>Se déconnecter</Text>
            </TouchableOpacity>
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
    backgroundColor: "#2E1C2B",
  },
  container: {
    flex: 1,
    backgroundColor: "#050404",
  },
  scrollContent: {
    paddingBottom: 16,
  },

  /* ─── Header Card ─── */
  headerCard: {
    backgroundColor: "#2E1C2B",
    paddingTop: 48,
    paddingBottom: 32,
    paddingHorizontal: 20,
    alignItems: "center",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#4A1942",
    borderWidth: 3,
    borderColor: "rgba(234, 234, 234, 0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  avatarText: {
    fontFamily: "Poppins_700Bold",
    fontSize: 28,
    color: "#EAEAEA",
  },
  userName: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 18,
    color: "#EAEAEA",
    marginBottom: 4,
  },
  memberSince: {
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
    color: "rgba(234, 234, 234, 0.6)",
    marginBottom: 12,
  },
  verifiedBadge: {
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

  /* ─── Body ─── */
  body: {
    paddingHorizontal: 20,
    paddingTop: 24,
    gap: 24,
  },

  /* ─── Loyalty Card ─── */
  loyaltyCard: {
    padding: 24,
    borderRadius: 16,
  },
  loyaltyHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  loyaltyTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    color: "#EAEAEA",
  },
  loyaltyPoints: {
    fontFamily: "Poppins_700Bold",
    fontSize: 32,
    color: "#EAEAEA",
    marginBottom: 8,
  },
  loyaltyNext: {
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
    color: "rgba(234, 234, 234, 0.8)",
    marginBottom: 16,
  },
  benefitsBox: {
    backgroundColor: "rgba(5, 4, 4, 0.3)",
    borderRadius: 12,
    padding: 16,
  },
  benefitsTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    color: "#EAEAEA",
    marginBottom: 12,
  },
  benefitRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 6,
  },
  benefitDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#EAEAEA",
  },
  benefitText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
    color: "rgba(234, 234, 234, 0.9)",
  },

  /* ─── Loyalty History ─── */
  sectionBlock: {},
  sectionTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 17,
    color: "#EAEAEA",
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  historyList: {
    gap: 8,
  },
  historyRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#2E1C2B",
    borderRadius: 12,
    padding: 16,
  },
  historyLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  historyDescription: {
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    color: "#EAEAEA",
  },
  historyDate: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: "rgba(234, 234, 234, 0.6)",
  },
  historyAmount: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
  },

  /* ─── Menu Groups ─── */
  menuGroup: {
    backgroundColor: "#2E1C2B",
    borderRadius: 12,
    overflow: "hidden",
  },
  menuRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  menuRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "rgba(234, 234, 234, 0.1)",
  },
  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  menuLabel: {
    fontFamily: "Poppins_400Regular",
    fontSize: 15,
    color: "#EAEAEA",
  },
  menuRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  menuValue: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "rgba(234, 234, 234, 0.6)",
  },

  /* Toggle */
  toggle: {
    width: 48,
    height: 28,
    borderRadius: 14,
    position: "relative",
    justifyContent: "center",
  },
  toggleThumb: {
    position: "absolute",
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#EAEAEA",
  },

  /* ─── Logout ─── */
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 16,
  },
  logoutText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 15,
    color: "#E74C3C",
  },
});
