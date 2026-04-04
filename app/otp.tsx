import { useState, useRef, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft } from "lucide-react-native";
import { Button } from "@/components/ui/Button";

const OTP_LENGTH = 6;

export default function OTPScreen() {
  const router = useRouter();
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [countdown, setCountdown] = useState(60);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  // Countdown timer
  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleChange = useCallback(
    (index: number, value: string) => {
      // Take only the last character typed
      const digit = value.slice(-1);

      const newOtp = [...otp];
      newOtp[index] = digit;
      setOtp(newOtp);

      // Auto-advance to next input
      if (digit && index < OTP_LENGTH - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    },
    [otp]
  );

  const handleKeyPress = useCallback(
    (
      index: number,
      e: NativeSyntheticEvent<TextInputKeyPressEventData>
    ) => {
      if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    },
    [otp]
  );

  const handleVerify = useCallback(() => {
    router.push("/kyc");
  }, [router]);

  const handleResend = useCallback(() => {
    setCountdown(60);
  }, []);

  const isComplete = otp.every((d) => d !== "");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Back Button */}
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
          activeOpacity={0.7}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <ArrowLeft size={24} color="#EAEAEA" strokeWidth={1.5} />
        </TouchableOpacity>

        {/* Header */}
        <Text style={styles.title}>Vérifiez votre numéro</Text>
        <Text style={styles.subtitle}>
          Un code a été envoyé au +33 6 ** ** **42
        </Text>

        {/* OTP Inputs */}
        <View style={styles.otpRow}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              value={digit}
              onChangeText={(text) => handleChange(index, text)}
              onKeyPress={(e) => handleKeyPress(index, e)}
              keyboardType="number-pad"
              maxLength={1}
              style={[
                styles.otpInput,
                digit
                  ? styles.otpInputFilled
                  : styles.otpInputEmpty,
              ]}
              selectionColor="#4A1942"
              caretHidden
            />
          ))}
        </View>

        {/* Resend Code */}
        <View style={styles.resendContainer}>
          <TouchableOpacity
            onPress={handleResend}
            disabled={countdown > 0}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.resendText,
                {
                  color:
                    countdown > 0
                      ? "rgba(234, 234, 234, 0.3)"
                      : "#EAEAEA",
                },
              ]}
            >
              Renvoyer le code{countdown > 0 ? ` (${countdown}s)` : ""}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Verify Button */}
        <Button fullWidth onPress={handleVerify} disabled={!isComplete}>
          Vérifier
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050404",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 32,
  },

  // Back
  backButton: {
    marginBottom: 32,
    alignSelf: "flex-start",
  },

  // Header
  title: {
    fontFamily: "Poppins_700Bold",
    fontSize: 22,
    color: "#EAEAEA",
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "rgba(234, 234, 234, 0.6)",
    marginBottom: 32,
  },

  // OTP
  otpRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    marginBottom: 24,
  },
  otpInput: {
    width: 48,
    height: 52,
    borderRadius: 12,
    backgroundColor: "#2E1C2B",
    textAlign: "center",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 24,
    color: "#EAEAEA",
  },
  otpInputFilled: {
    borderWidth: 2,
    borderColor: "#4A1942",
  },
  otpInputEmpty: {
    borderWidth: 1,
    borderColor: "rgba(234, 234, 234, 0.1)",
  },

  // Resend
  resendContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  resendText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
  },
});
