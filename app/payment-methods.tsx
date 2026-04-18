import { View, Text, Pressable, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { CreditCard, Plus, Trash2 } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ScreenContainer } from "@/components/ScreenContainer";
import { useTheme } from "@/context/ThemeContext";

interface Card {
  id: string;
  brand: string;
  last4: string;
  expiryMonth: string;
  expiryYear: string;
  primary: boolean;
  gradient: [string, string];
}

const cards: Card[] = [
  {
    id: "1",
    brand: "Visa",
    last4: "4242",
    expiryMonth: "09",
    expiryYear: "27",
    primary: true,
    gradient: ["#4A1942", "#8B3D7E"],
  },
  {
    id: "2",
    brand: "Mastercard",
    last4: "8123",
    expiryMonth: "05",
    expiryYear: "26",
    primary: false,
    gradient: ["#2E1C2B", "#4A1942"],
  },
];

export default function PaymentMethodsScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();

  return (
    <ScreenContainer
      title={t("paymentMethods.title")}
      subtitle={t("paymentMethods.subtitle")}
    >
      <View style={{ gap: 14, marginTop: 6 }}>
        {cards.map((card) => (
          <View key={card.id}>
            <LinearGradient
              colors={card.gradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.card}
            >
              <View style={styles.cardTop}>
                <CreditCard size={22} color="#FFFFFF" strokeWidth={1.6} />
                {card.primary && (
                  <View style={styles.primaryBadge}>
                    <Text style={styles.primaryBadgeText}>
                      {t("paymentMethods.primary").toUpperCase()}
                    </Text>
                  </View>
                )}
              </View>

              <Text style={styles.cardNumber}>•••• •••• •••• {card.last4}</Text>

              <View style={styles.cardBottom}>
                <Text style={styles.cardBrand}>{card.brand}</Text>
                <Text style={styles.cardExpiry}>
                  {t("paymentMethods.expiry", {
                    month: card.expiryMonth,
                    year: card.expiryYear,
                  })}
                </Text>
              </View>
            </LinearGradient>

            <Pressable
              style={[
                styles.removeRow,
                { backgroundColor: colors.surface, borderColor: colors.border },
              ]}
            >
              <Trash2 size={16} color={colors.error} strokeWidth={1.8} />
              <Text style={[styles.removeText, { color: colors.error }]}>
                {t("paymentMethods.remove")}
              </Text>
            </Pressable>
          </View>
        ))}

        <Pressable
          style={[
            styles.addButton,
            { backgroundColor: colors.surface, borderColor: colors.primary },
          ]}
        >
          <Plus size={18} color={colors.primary} strokeWidth={2} />
          <Text style={[styles.addText, { color: colors.primary }]}>
            {t("paymentMethods.addCard")}
          </Text>
        </Pressable>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 22,
    borderRadius: 22,
    gap: 22,
  },
  cardTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  primaryBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: "rgba(255, 255, 255, 0.18)",
  },
  primaryBadgeText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 9.5,
    color: "#FFFFFF",
    letterSpacing: 1,
  },
  cardNumber: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 20,
    color: "#FFFFFF",
    letterSpacing: 2,
  },
  cardBottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardBrand: {
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
    color: "#FFFFFF",
    letterSpacing: 0.5,
  },
  cardExpiry: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.85)",
  },
  removeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    height: 40,
    borderRadius: 999,
    borderWidth: 1,
    marginTop: 8,
    alignSelf: "flex-end",
    paddingHorizontal: 16,
  },
  removeText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 13,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    height: 54,
    borderRadius: 22,
    borderWidth: 1.5,
    borderStyle: "dashed",
    marginTop: 6,
  },
  addText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
  },
});
