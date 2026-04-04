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
import { vehicles, agencies, vehicleImages } from "@/data/mockData";
import { Button } from "@/components/ui/Button";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const GRID_GAP = 8;
const GRID_ITEM_WIDTH = (SCREEN_WIDTH - 40 - GRID_GAP) / 2;

interface Spec {
  icon: LucideIcon;
  label: string;
  value: string;
}

const vehicleImagesHQ = vehicleImages.map((u) =>
  u.replace("w=400", "w=1080")
);

export default function VehicleDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [withChauffeur, setWithChauffeur] = useState(false);

  const vehicle = vehicles.find((v) => v.id === id);
  const agency = agencies.find((a) => a.id === vehicle?.agencyId);

  if (!vehicle || !agency) return null;

  const specs: Spec[] = [
    { icon: Gauge, label: "Transmission", value: vehicle.transmission },
    { icon: Fuel, label: "Carburant", value: vehicle.fuel },
    { icon: Gauge, label: "Puissance", value: vehicle.power },
    { icon: Users, label: "Places", value: `${vehicle.seats} places` },
    { icon: DoorClosed, label: "Portes", value: `${vehicle.doors} portes` },
    { icon: Package, label: "Coffre", value: vehicle.trunk },
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ─── Hero Image ─── */}
        <View style={styles.hero}>
          <Image
            source={{ uri: vehicleImagesHQ[Number(id) - 1] }}
            style={styles.heroImage}
          />

          {/* Nav buttons */}
          <SafeAreaView style={styles.heroNavRow} edges={["top"]}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.heroBtn}
              activeOpacity={0.7}
            >
              <ArrowLeft size={20} color="#EAEAEA" strokeWidth={1.5} />
            </TouchableOpacity>

            <View style={styles.heroRightBtns}>
              <TouchableOpacity style={styles.heroBtn} activeOpacity={0.7}>
                <Share2 size={20} color="#EAEAEA" strokeWidth={1.5} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.heroBtn} activeOpacity={0.7}>
                <Heart size={20} color="#EAEAEA" strokeWidth={1.5} />
              </TouchableOpacity>
            </View>
          </SafeAreaView>

          {/* Image counter */}
          <View style={styles.imageCounter}>
            <Text style={styles.imageCounterText}>1/8</Text>
          </View>
        </View>

        <View style={styles.body}>
          {/* ─── Header ─── */}
          <View style={styles.headerBlock}>
            <Text style={styles.vehicleName}>{vehicle.name}</Text>
            <Text style={styles.vehicleYear}>{vehicle.year}</Text>

            <View style={styles.pricePill}>
              <Text style={styles.priceValue}>{vehicle.price} €</Text>
              <Text style={styles.priceUnit}> / jour</Text>
            </View>

            <TouchableOpacity
              style={styles.agencyLink}
              activeOpacity={0.7}
              onPress={() => router.push(`/agency/${agency.id}` as any)}
            >
              <View style={styles.agencyDot}>
                <Text style={styles.agencyDotText}>{agency.logo}</Text>
              </View>
              <Text style={styles.agencyLinkName}>{agency.name}</Text>
              <Check size={14} color="#2ECC71" strokeWidth={1.5} />
            </TouchableOpacity>
          </View>

          {/* ─── Specifications ─── */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Spécifications</Text>
            <View style={styles.specsGrid}>
              {specs.map((spec, index) => {
                const Icon = spec.icon;
                return (
                  <View key={index} style={styles.specCard}>
                    <Icon
                      size={24}
                      color="rgba(234, 234, 234, 0.6)"
                      strokeWidth={1.5}
                    />
                    <Text style={styles.specLabel}>{spec.label}</Text>
                    <Text style={styles.specValue}>{spec.value}</Text>
                  </View>
                );
              })}
            </View>
          </View>

          {/* ─── Équipements ─── */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Équipements</Text>
            <View style={styles.featuresWrap}>
              {vehicle.features.map((feature, index) => (
                <View key={index} style={styles.featurePill}>
                  <Text style={styles.featurePillText}>{feature}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* ─── Description ─── */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.descriptionText}>{vehicle.description}</Text>
          </View>

          {/* ─── Chauffeur Option ─── */}
          {vehicle.chauffeurAvailable && (
            <View style={styles.chauffeurCard}>
              <Car size={24} color="#EAEAEA" strokeWidth={1.5} />
              <View style={styles.chauffeurInfo}>
                <Text style={styles.chauffeurTitle}>
                  Avec chauffeur privé
                </Text>
                <Text style={styles.chauffeurPrice}>
                  +{vehicle.chauffeurPrice} € / jour
                </Text>
                <Text style={styles.chauffeurSub}>
                  Chauffeur professionnel bilingue français-anglais
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
                  style={[
                    styles.toggleThumb,
                    { left: withChauffeur ? 24 : 4 },
                  ]}
                />
              </TouchableOpacity>
            </View>
          )}

          {/* ─── Conditions ─── */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Conditions de location</Text>
            <View style={styles.conditionsList}>
              {[
                `Age minimum : ${vehicle.conditions.minAge} ans`,
                `Permis de conduire valide depuis ${vehicle.conditions.licenseYears} ans`,
                `Caution : ${vehicle.conditions.deposit.toLocaleString()} €`,
                `Kilométrage : ${vehicle.conditions.kmPerDay} km/jour inclus`,
              ].map((text, index) => (
                <View key={index} style={styles.conditionRow}>
                  <Check
                    size={16}
                    color="rgba(234, 234, 234, 0.5)"
                    strokeWidth={1.5}
                  />
                  <Text style={styles.conditionText}>{text}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* ─── Sticky Bottom Bar ─── */}
      <View style={styles.bottomBar}>
        <View style={styles.bottomPriceRow}>
          <Text style={styles.bottomPrice}>{vehicle.price} €</Text>
          <Text style={styles.bottomUnit}> / jour</Text>
        </View>
        <Button onPress={() => router.push(`/booking/${vehicle.id}` as any)}>Réserver</Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050404",
  },
  scrollContent: {
    paddingBottom: 100,
  },

  /* ─── Hero ─── */
  hero: {
    height: 300,
    position: "relative",
  },
  heroImage: {
    width: "100%",
    height: 300,
  },
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
    borderRadius: 20,
    backgroundColor: "rgba(46, 28, 43, 0.9)",
    alignItems: "center",
    justifyContent: "center",
  },
  heroRightBtns: {
    flexDirection: "row",
    gap: 8,
  },
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
    color: "#EAEAEA",
  },

  /* ─── Body ─── */
  body: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },

  /* Header */
  headerBlock: {
    marginBottom: 24,
  },
  vehicleName: {
    fontFamily: "Poppins_700Bold",
    fontSize: 22,
    color: "#EAEAEA",
    marginBottom: 4,
  },
  vehicleYear: {
    fontFamily: "Poppins_400Regular",
    fontSize: 15,
    color: "rgba(234, 234, 234, 0.6)",
    marginBottom: 12,
  },
  pricePill: {
    flexDirection: "row",
    alignItems: "baseline",
    alignSelf: "flex-start",
    backgroundColor: "#4A1942",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    marginBottom: 12,
  },
  priceValue: {
    fontFamily: "Poppins_700Bold",
    fontSize: 24,
    color: "#EAEAEA",
  },
  priceUnit: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "rgba(234, 234, 234, 0.8)",
  },
  agencyLink: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  agencyDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#4A1942",
    alignItems: "center",
    justifyContent: "center",
  },
  agencyDotText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 11,
    color: "#EAEAEA",
  },
  agencyLinkName: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "rgba(234, 234, 234, 0.7)",
  },

  /* Sections */
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 17,
    color: "#EAEAEA",
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
    backgroundColor: "#2E1C2B",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    gap: 8,
  },
  specLabel: {
    fontFamily: "Poppins_400Regular",
    fontSize: 11,
    color: "rgba(234, 234, 234, 0.5)",
  },
  specValue: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 13,
    color: "#EAEAEA",
  },

  /* Features */
  featuresWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  featurePill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "#2E1C2B",
    borderWidth: 1,
    borderColor: "rgba(234, 234, 234, 0.1)",
  },
  featurePillText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: "#EAEAEA",
  },

  /* Description */
  descriptionText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "rgba(234, 234, 234, 0.7)",
    lineHeight: 21,
  },

  /* Chauffeur */
  chauffeurCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#2E1C2B",
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#4A1942",
    marginBottom: 24,
  },
  chauffeurInfo: {
    flex: 1,
  },
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
  chauffeurSub: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: "rgba(234, 234, 234, 0.5)",
    marginTop: 4,
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

  /* Conditions */
  conditionsList: {
    gap: 8,
  },
  conditionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  conditionText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "rgba(234, 234, 234, 0.7)",
  },

  /* ─── Sticky Bottom ─── */
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#2E1C2B",
    borderTopWidth: 1,
    borderTopColor: "rgba(234, 234, 234, 0.05)",
  },
  bottomPriceRow: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  bottomPrice: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    color: "#EAEAEA",
  },
  bottomUnit: {
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
    color: "rgba(234, 234, 234, 0.6)",
  },
});
