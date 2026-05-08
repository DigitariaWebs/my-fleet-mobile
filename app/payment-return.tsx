import { useMemo } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { CheckCircle2, XCircle } from "lucide-react-native";
import { useTheme } from "@/context/ThemeContext";

/**
 * Landing screen for the deep link triggered after Stripe Checkout.
 *
 * The status shown here is the one Stripe redirected with — useful for
 * immediate feedback, but the source of truth for whether the payment
 * actually settled is the server webhook updating the booking. We tell the
 * user to check their booking for the final state.
 */
export default function PaymentReturnScreen() {
  const router = useRouter();
  const { colors, isDark } = useTheme();
  const params = useLocalSearchParams<{
    status?: string;
    session_id?: string;
  }>();
  const isSuccess = params.status === "success";
  const styles = useMemo(() => makeStyles(colors, isDark), [colors, isDark]);

  return (
    <View style={styles.container}>
      <StatusBar style={colors.statusBarStyle} />
      <SafeAreaView edges={["top", "bottom"]} style={styles.safe}>
        <View style={styles.center}>
          {isSuccess ? (
            <CheckCircle2 size={72} color="#22c55e" strokeWidth={1.5} />
          ) : (
            <XCircle size={72} color="#f97316" strokeWidth={1.5} />
          )}
          <Text style={styles.title}>
            {isSuccess ? "Payment received" : "Payment cancelled"}
          </Text>
          <Text style={styles.body}>
            {isSuccess
              ? "Thanks — we'll confirm your booking once the payment settles. This usually takes a few seconds."
              : "No payment was taken. You can try again from your booking at any time."}
          </Text>

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => router.replace("/bookings")}
            style={styles.primary}
          >
            <Text style={styles.primaryText}>View my bookings</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => router.replace("/home")}
            style={styles.secondary}
          >
            <Text style={styles.secondaryText}>Back to home</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

function makeStyles(
  colors: ReturnType<typeof useTheme>["colors"],
  _isDark: boolean,
) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    safe: { flex: 1 },
    center: {
      flex: 1,
      paddingHorizontal: 24,
      alignItems: "center",
      justifyContent: "center",
      gap: 16,
    },
    title: {
      fontSize: 24,
      fontWeight: "700",
      color: colors.text,
      marginTop: 8,
      textAlign: "center",
    },
    body: {
      fontSize: 15,
      color: colors.textSecondary,
      textAlign: "center",
      lineHeight: 22,
      paddingHorizontal: 8,
    },
    primary: {
      marginTop: 16,
      backgroundColor: colors.primary,
      paddingVertical: 14,
      paddingHorizontal: 32,
      borderRadius: 12,
      minWidth: 220,
      alignItems: "center",
    },
    primaryText: {
      color: "#FFFFFF",
      fontWeight: "600",
      fontSize: 16,
    },
    secondary: {
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
    secondaryText: {
      color: colors.textSecondary,
      fontSize: 14,
      fontWeight: "500",
    },
  });
}
