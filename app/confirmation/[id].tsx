import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Receipt,
  CheckCircle,
} from "lucide-react-native";
import { vehicles, agencies, bookings } from "@/data/mockData";
import { Button } from "@/components/ui/Button";

export default function ConfirmationScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const booking = bookings.find((b) => b.id === id);
  const vehicle = vehicles.find((v) => v.id === (booking?.vehicleId ?? id));
  const agency = agencies.find((a) => a.id === vehicle?.agencyId);

  const vehicleName = booking?.vehicleName ?? vehicle?.name ?? "Véhicule";
  const agencyName = booking?.agencyName ?? agency?.name ?? "Agence";
  const reference = booking?.reference ?? `MF-2026-0${847 + Number(id || 0)}`;
  const total = booking?.total ?? (vehicle ? vehicle.price * 3 : 0);
  const startDate = booking?.startDate ?? "2026-06-12";
  const endDate = booking?.endDate ?? "2026-06-15";
  const startTime = booking?.startTime ?? "10:00";
  const endTime = booking?.endTime ?? "18:00";
  const deliveryAddress = booking?.deliveryAddress ?? "14 Rue de France, Nice";
  const withChauffeur = booking?.withChauffeur ?? false;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Step Label */}
        <Text style={styles.stepLabel}>3/3</Text>

        {/* Progress Bar */}
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: "100%" }]} />
        </View>

        {/* ─── Success Icon ─── */}
        <View style={styles.successCircle}>
          <CheckCircle size={40} color="#2ECC71" strokeWidth={1.5} />
        </View>

        {/* ─── Title ─── */}
        <Text style={styles.title}>Réservation confirmée</Text>
        <Text style={styles.subtitle}>
          Votre véhicule est réservé. Vous recevrez un e-mail de confirmation.
        </Text>

        {/* ─── Reference Badge ─── */}
        <View style={styles.refBadge}>
          <Text style={styles.refText}>Réf. #{reference}</Text>
        </View>

        {/* ─── Booking Summary Card ─── */}
        <View style={styles.summaryCard}>
          {/* Vehicle row */}
          <View style={styles.vehicleRow}>
            <View style={styles.vehicleThumb}>
              <Text style={styles.vehicleEmoji}>🏎️</Text>
            </View>
            <View>
              <Text style={styles.vehicleName}>{vehicleName}</Text>
              <Text style={styles.agencyName}>{agencyName}</Text>
            </View>
          </View>

          {/* Details */}
          <View style={styles.detailsList}>
            <View style={styles.detailRow}>
              <Calendar
                size={18}
                color="rgba(234, 234, 234, 0.6)"
                strokeWidth={1.5}
              />
              <Text style={styles.detailText}>
                {formatDate(startDate)} – {formatDate(endDate)}
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Clock
                size={18}
                color="rgba(234, 234, 234, 0.6)"
                strokeWidth={1.5}
              />
              <Text style={styles.detailText}>
                {startTime} – {endTime}
              </Text>
            </View>
            <View style={styles.detailRow}>
              <MapPin
                size={18}
                color="rgba(234, 234, 234, 0.6)"
                strokeWidth={1.5}
              />
              <Text style={styles.detailText}>
                Livraison : {deliveryAddress}
              </Text>
            </View>
            {withChauffeur && (
              <View style={styles.detailRow}>
                <User
                  size={18}
                  color="rgba(234, 234, 234, 0.6)"
                  strokeWidth={1.5}
                />
                <Text style={styles.detailText}>Avec chauffeur</Text>
              </View>
            )}

            {/* Total */}
            <View style={styles.totalRow}>
              <Receipt
                size={18}
                color="rgba(234, 234, 234, 0.6)"
                strokeWidth={1.5}
              />
              <Text style={styles.totalText}>
                Total : {total.toLocaleString()} €
              </Text>
            </View>
          </View>
        </View>

        {/* ─── CTAs ─── */}
        <Button fullWidth onPress={() => router.push(`/tracking/${id}` as any)}>
          Suivre ma réservation
        </Button>
        <TouchableOpacity
          style={styles.homeButton}
          activeOpacity={0.7}
          onPress={() => router.replace("/home")}
        >
          <Text style={styles.homeButtonText}>Retour à l'accueil</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

function formatDate(dateStr: string): string {
  const months = [
    "Jan", "Fév", "Mars", "Avr", "Mai", "Juin",
    "Juil", "Août", "Sep", "Oct", "Nov", "Déc",
  ];
  const parts = dateStr.split("-");
  if (parts.length < 3) return dateStr;
  const day = parseInt(parts[2], 10);
  const month = months[parseInt(parts[1], 10) - 1];
  const year = parts[0];
  return `${day} ${month} ${year}`;
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
    alignItems: "center",
  },

  /* Step */
  stepLabel: {
    fontFamily: "Poppins_500Medium",
    fontSize: 13,
    color: "rgba(234, 234, 234, 0.6)",
    marginBottom: 24,
  },

  /* Progress */
  progressTrack: {
    height: 4,
    borderRadius: 2,
    backgroundColor: "rgba(234, 234, 234, 0.1)",
    marginBottom: 32,
    overflow: "hidden",
    width: 200,
  },
  progressFill: {
    height: 4,
    borderRadius: 2,
    backgroundColor: "#4A1942",
  },

  /* Success */
  successCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(46, 204, 113, 0.15)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },

  /* Title */
  title: {
    fontFamily: "Poppins_700Bold",
    fontSize: 24,
    color: "#EAEAEA",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontFamily: "Poppins_400Regular",
    fontSize: 15,
    color: "rgba(234, 234, 234, 0.6)",
    textAlign: "center",
    maxWidth: 300,
    marginBottom: 24,
    lineHeight: 22,
  },

  /* Reference */
  refBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "rgba(74, 25, 66, 0.2)",
    marginBottom: 32,
  },
  refText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    color: "#4A1942",
  },

  /* Summary Card */
  summaryCard: {
    backgroundColor: "#2E1C2B",
    borderRadius: 16,
    padding: 20,
    width: "100%",
    marginBottom: 24,
  },
  vehicleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingBottom: 16,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(234, 234, 234, 0.1)",
  },
  vehicleThumb: {
    width: 64,
    height: 64,
    borderRadius: 12,
    backgroundColor: "#4A1942",
    alignItems: "center",
    justifyContent: "center",
  },
  vehicleEmoji: {
    fontSize: 20,
  },
  vehicleName: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    color: "#EAEAEA",
    marginBottom: 4,
  },
  agencyName: {
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
    color: "rgba(234, 234, 234, 0.6)",
  },

  /* Details */
  detailsList: {
    gap: 12,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  detailText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "#EAEAEA",
  },
  totalRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(234, 234, 234, 0.1)",
  },
  totalText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    color: "#EAEAEA",
  },

  /* CTAs */
  homeButton: {
    paddingVertical: 16,
    width: "100%",
    alignItems: "center",
  },
  homeButtonText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 15,
    color: "rgba(234, 234, 234, 0.6)",
  },
});
