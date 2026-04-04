import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft, Lock, Shield } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Button } from "@/components/ui/Button";

export default function PaymentScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ─── Header ─── */}
        <View style={styles.headerRow}>
          <View style={styles.headerLeft}>
            <TouchableOpacity
              onPress={() => router.back()}
              activeOpacity={0.7}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <ArrowLeft size={24} color="#EAEAEA" strokeWidth={1.5} />
            </TouchableOpacity>
            <Text style={styles.title}>Paiement</Text>
          </View>
          <Text style={styles.stepLabel}>2/3</Text>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: "66%" }]} />
        </View>

        {/* ─── Moyen de paiement ─── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Moyen de paiement</Text>

          {/* Existing Card */}
          <TouchableOpacity activeOpacity={0.9} style={styles.cardWrapper}>
            <LinearGradient
              colors={["#2E1C2B", "#4A1942"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.savedCard}
            >
              <View style={styles.savedCardLeft}>
                <Text style={styles.cardNumber}>**** **** **** 4242</Text>
                <Text style={styles.cardExpiry}>Exp: 09/27</Text>
              </View>
              <Text style={styles.cardBrand}>VISA</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Add Card */}
          <TouchableOpacity style={styles.addCard} activeOpacity={0.7}>
            <Text style={styles.addCardText}>+ Ajouter une carte</Text>
          </TouchableOpacity>
        </View>

        {/* ─── Security Indicators ─── */}
        <View style={styles.securityRow}>
          <View style={styles.securityItem}>
            <Lock size={16} color="rgba(234, 234, 234, 0.4)" strokeWidth={1.5} />
            <Text style={styles.securityText}>Paiement sécurisé</Text>
          </View>
          <View style={styles.securityItem}>
            <Shield size={16} color="rgba(234, 234, 234, 0.4)" strokeWidth={1.5} />
            <Text style={styles.securityText}>Protection garantie</Text>
          </View>
        </View>

        {/* ─── CTA ─── */}
        <Button fullWidth onPress={() => router.push("/confirmation/1" as any)}>
          Confirmer et payer — 1 370 €
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050404",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 32,
    paddingBottom: 40,
  },

  /* Header */
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  title: {
    fontFamily: "Poppins_700Bold",
    fontSize: 20,
    color: "#EAEAEA",
  },
  stepLabel: {
    fontFamily: "Poppins_500Medium",
    fontSize: 13,
    color: "rgba(234, 234, 234, 0.6)",
  },

  /* Progress */
  progressTrack: {
    height: 4,
    borderRadius: 2,
    backgroundColor: "rgba(234, 234, 234, 0.1)",
    marginBottom: 32,
    overflow: "hidden",
  },
  progressFill: {
    height: 4,
    borderRadius: 2,
    backgroundColor: "#4A1942",
  },

  /* Section */
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 17,
    color: "#EAEAEA",
    marginBottom: 12,
  },

  /* Saved Card */
  cardWrapper: {
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#4A1942",
    overflow: "hidden",
  },
  savedCard: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  savedCardLeft: {},
  cardNumber: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "rgba(234, 234, 234, 0.8)",
    marginBottom: 4,
  },
  cardExpiry: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: "rgba(234, 234, 234, 0.5)",
  },
  cardBrand: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    color: "#EAEAEA",
  },

  /* Add Card */
  addCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "rgba(234, 234, 234, 0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  addCardText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    color: "rgba(234, 234, 234, 0.6)",
  },

  /* Security */
  securityRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    marginBottom: 32,
  },
  securityItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  securityText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 11,
    color: "rgba(234, 234, 234, 0.4)",
  },
});
