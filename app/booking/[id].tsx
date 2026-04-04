import { useState, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Home,
  Truck,
} from "lucide-react-native";
import { vehicles } from "@/data/mockData";
import { Button } from "@/components/ui/Button";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const HALF_WIDTH = (SCREEN_WIDTH - 40 - 12) / 2;

const DAYS = 3;

export default function BookingScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [pickupMethod, setPickupMethod] = useState<"agency" | "delivery">("agency");
  const [withChauffeur, setWithChauffeur] = useState(false);

  const vehicle = vehicles.find((v) => v.id === id);
  if (!vehicle) return null;

  const vehicleTotal = vehicle.price * DAYS;
  const deliveryFee = pickupMethod === "delivery" ? 50 : 0;
  const chauffeurFee = withChauffeur ? (vehicle.chauffeurPrice || 0) * DAYS : 0;
  const total = vehicleTotal + deliveryFee + chauffeurFee;

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
            <Text style={styles.title}>Réservation</Text>
          </View>
          <Text style={styles.stepLabel}>1/3</Text>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: "33%" }]} />
        </View>

        {/* ─── Dates de location ─── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dates de location</Text>
          <View style={styles.dateCard}>
            <Calendar size={40} color="#4A1942" strokeWidth={1.5} />
            <Text style={styles.dateText}>12 Juin — 15 Juin (3 jours)</Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.modifyLink}>Modifier</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ─── Time Selection ─── */}
        <View style={styles.timeRow}>
          <View style={{ width: HALF_WIDTH }}>
            <Text style={styles.timeLabel}>Heure de prise en charge</Text>
            <View style={styles.timeBox}>
              <Clock size={18} color="rgba(234, 234, 234, 0.6)" strokeWidth={1.5} />
              <Text style={styles.timeValue}>10:00</Text>
            </View>
          </View>
          <View style={{ width: HALF_WIDTH }}>
            <Text style={styles.timeLabel}>Heure de retour</Text>
            <View style={styles.timeBox}>
              <Clock size={18} color="rgba(234, 234, 234, 0.6)" strokeWidth={1.5} />
              <Text style={styles.timeValue}>18:00</Text>
            </View>
          </View>
        </View>

        {/* ─── Pickup Method ─── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mode de récupération</Text>
          <View style={styles.pickupRow}>
            <TouchableOpacity
              onPress={() => setPickupMethod("agency")}
              activeOpacity={0.85}
              style={[
                styles.pickupCard,
                {
                  borderWidth: pickupMethod === "agency" ? 2 : 1,
                  borderColor:
                    pickupMethod === "agency"
                      ? "#4A1942"
                      : "rgba(234, 234, 234, 0.1)",
                },
              ]}
            >
              <Home
                size={28}
                color={pickupMethod === "agency" ? "#4A1942" : "rgba(234, 234, 234, 0.6)"}
                strokeWidth={1.5}
              />
              <Text style={styles.pickupLabel}>En agence</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setPickupMethod("delivery")}
              activeOpacity={0.85}
              style={[
                styles.pickupCard,
                {
                  borderWidth: pickupMethod === "delivery" ? 2 : 1,
                  borderColor:
                    pickupMethod === "delivery"
                      ? "#4A1942"
                      : "rgba(234, 234, 234, 0.1)",
                },
              ]}
            >
              <Truck
                size={28}
                color={pickupMethod === "delivery" ? "#4A1942" : "rgba(234, 234, 234, 0.6)"}
                strokeWidth={1.5}
              />
              <Text style={styles.pickupLabel}>Livraison</Text>
              <Text style={styles.pickupExtra}>+50 €</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ─── Chauffeur Option ─── */}
        <View style={styles.chauffeurRow}>
          <View style={styles.chauffeurInfo}>
            <Text style={styles.chauffeurTitle}>Ajouter un chauffeur privé</Text>
            <Text style={styles.chauffeurPrice}>
              +{vehicle.chauffeurPrice} € / jour
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => setWithChauffeur(!withChauffeur)}
            activeOpacity={0.7}
            style={[
              styles.toggle,
              {
                backgroundColor: withChauffeur
                  ? "#4A1942"
                  : "rgba(234, 234, 234, 0.15)",
              },
            ]}
          >
            <View
              style={[styles.toggleThumb, { left: withChauffeur ? 24 : 4 }]}
            />
          </TouchableOpacity>
        </View>

        {/* ─── Order Summary ─── */}
        <View style={styles.summaryCard}>
          <Text style={styles.sectionTitle}>Récapitulatif</Text>

          {/* Vehicle info */}
          <View style={styles.summaryVehicle}>
            <View style={styles.summaryThumb} />
            <View style={styles.summaryVehicleText}>
              <Text style={styles.summaryVehicleName}>{vehicle.name}</Text>
              <Text style={styles.summaryAgency}>{vehicle.agencyName}</Text>
            </View>
          </View>

          {/* Line items */}
          <View style={styles.lineItems}>
            <View style={styles.lineItem}>
              <Text style={styles.lineItemLabel}>Location ({DAYS} jours)</Text>
              <Text style={styles.lineItemValue}>{vehicleTotal} €</Text>
            </View>
            {deliveryFee > 0 && (
              <View style={styles.lineItem}>
                <Text style={styles.lineItemLabel}>Livraison à domicile</Text>
                <Text style={styles.lineItemValue}>{deliveryFee} €</Text>
              </View>
            )}
            {chauffeurFee > 0 && (
              <View style={styles.lineItem}>
                <Text style={styles.lineItemLabel}>Chauffeur ({DAYS} jours)</Text>
                <Text style={styles.lineItemValue}>{chauffeurFee} €</Text>
              </View>
            )}
          </View>

          {/* Total */}
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>{total} €</Text>
          </View>
        </View>

        {/* CTA */}
        <Button fullWidth onPress={() => router.push("/payment")}>
          Continuer vers le paiement
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

  /* Dates */
  dateCard: {
    backgroundColor: "#2E1C2B",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    gap: 12,
  },
  dateText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    color: "#EAEAEA",
  },
  modifyLink: {
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
    color: "#4A1942",
  },

  /* Time */
  timeRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
  },
  timeLabel: {
    fontFamily: "Poppins_500Medium",
    fontSize: 13,
    color: "rgba(234, 234, 234, 0.8)",
    marginBottom: 8,
  },
  timeBox: {
    backgroundColor: "#2E1C2B",
    borderWidth: 1,
    borderColor: "rgba(234, 234, 234, 0.1)",
    borderRadius: 12,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  timeValue: {
    fontFamily: "Poppins_400Regular",
    fontSize: 15,
    color: "#EAEAEA",
  },

  /* Pickup */
  pickupRow: {
    flexDirection: "row",
    gap: 12,
  },
  pickupCard: {
    flex: 1,
    backgroundColor: "#2E1C2B",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    gap: 8,
  },
  pickupLabel: {
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    color: "#EAEAEA",
  },
  pickupExtra: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: "rgba(234, 234, 234, 0.5)",
  },

  /* Chauffeur */
  chauffeurRow: {
    backgroundColor: "#2E1C2B",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  chauffeurInfo: {},
  chauffeurTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 15,
    color: "#EAEAEA",
    marginBottom: 4,
  },
  chauffeurPrice: {
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
    color: "rgba(234, 234, 234, 0.6)",
  },
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

  /* Summary */
  summaryCard: {
    backgroundColor: "#2E1C2B",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  summaryVehicle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingBottom: 16,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(234, 234, 234, 0.1)",
  },
  summaryThumb: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: "#4A1942",
  },
  summaryVehicleText: {},
  summaryVehicleName: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    color: "#EAEAEA",
  },
  summaryAgency: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: "rgba(234, 234, 234, 0.6)",
  },
  lineItems: {
    gap: 8,
    marginBottom: 16,
  },
  lineItem: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  lineItemLabel: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "rgba(234, 234, 234, 0.7)",
  },
  lineItemValue: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "#EAEAEA",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "rgba(234, 234, 234, 0.1)",
  },
  totalLabel: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 18,
    color: "#EAEAEA",
  },
  totalValue: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 18,
    color: "#EAEAEA",
  },
});
