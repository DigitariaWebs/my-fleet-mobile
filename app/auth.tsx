import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Mail,
  Lock,
  User,
  Phone,
  Eye,
  EyeOff,
} from "lucide-react-native";
import Svg, { Path } from "react-native-svg";
import { Button } from "@/components/ui/Button";

type Tab = "login" | "signup";

interface FormData {
  name: string;
  email: string;
  phone: string;
  password: string;
}

function GoogleIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20">
      <Path
        fill="#4285F4"
        d="M19.6 10.23c0-.82-.1-1.42-.25-2.05H10v3.72h5.5c-.15.96-.74 2.31-2.04 3.22v2.45h3.16c1.89-1.73 2.98-4.3 2.98-7.34z"
      />
      <Path
        fill="#34A853"
        d="M13.46 15.13c-.83.59-1.96 1-3.46 1-2.64 0-4.88-1.74-5.68-4.15H1.07v2.52C2.72 17.75 6.09 20 10 20c2.7 0 4.96-.89 6.62-2.42l-3.16-2.45z"
      />
      <Path
        fill="#FBBC05"
        d="M3.99 10c0-.69.12-1.35.32-1.97V5.51H1.07A9.973 9.973 0 000 10c0 1.61.39 3.14 1.07 4.49l3.24-2.52c-.2-.62-.32-1.28-.32-1.97z"
      />
      <Path
        fill="#EA4335"
        d="M10 3.88c1.88 0 3.13.81 3.85 1.48l2.84-2.76C14.96.99 12.7 0 10 0 6.09 0 2.72 2.25 1.07 5.51l3.24 2.52C5.12 5.62 7.36 3.88 10 3.88z"
      />
    </Svg>
  );
}

function AppleIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="#EAEAEA">
      <Path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.32 2.32-2.14 4.56-3.74 4.25z" />
    </Svg>
  );
}

export default function AuthScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("signup");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleSubmit = () => {
    router.push("/otp");
  };

  const iconColor = "rgba(234, 234, 234, 0.6)";

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.flex}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Tab Toggle */}
          <View style={styles.tabContainer}>
            <TouchableOpacity
              onPress={() => setActiveTab("login")}
              style={styles.tab}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.tabText,
                  {
                    color:
                      activeTab === "login"
                        ? "#EAEAEA"
                        : "rgba(234, 234, 234, 0.5)",
                  },
                ]}
              >
                Connexion
              </Text>
              {activeTab === "login" && <View style={styles.tabIndicator} />}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setActiveTab("signup")}
              style={styles.tab}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.tabText,
                  {
                    color:
                      activeTab === "signup"
                        ? "#EAEAEA"
                        : "rgba(234, 234, 234, 0.5)",
                  },
                ]}
              >
                Inscription
              </Text>
              {activeTab === "signup" && <View style={styles.tabIndicator} />}
            </TouchableOpacity>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {activeTab === "signup" && (
              <>
                {/* Name Input */}
                <View style={styles.inputRow}>
                  <User size={20} color={iconColor} strokeWidth={1.5} />
                  <TextInput
                    placeholder="Nom complet"
                    placeholderTextColor="rgba(234, 234, 234, 0.4)"
                    value={formData.name}
                    onChangeText={(text) =>
                      setFormData({ ...formData, name: text })
                    }
                    style={styles.input}
                    autoCapitalize="words"
                  />
                </View>

                {/* Email Input */}
                <View style={styles.inputRow}>
                  <Mail size={20} color={iconColor} strokeWidth={1.5} />
                  <TextInput
                    placeholder="Adresse e-mail"
                    placeholderTextColor="rgba(234, 234, 234, 0.4)"
                    value={formData.email}
                    onChangeText={(text) =>
                      setFormData({ ...formData, email: text })
                    }
                    style={styles.input}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>

                {/* Phone Input */}
                <View style={styles.inputRow}>
                  <Phone size={20} color={iconColor} strokeWidth={1.5} />
                  <Text style={styles.phonePrefix}>+33</Text>
                  <TextInput
                    placeholder="6 12 34 56 78"
                    placeholderTextColor="rgba(234, 234, 234, 0.4)"
                    value={formData.phone}
                    onChangeText={(text) =>
                      setFormData({ ...formData, phone: text })
                    }
                    style={styles.input}
                    keyboardType="phone-pad"
                  />
                </View>
              </>
            )}

            {activeTab === "login" && (
              <View style={styles.inputRow}>
                <Mail size={20} color={iconColor} strokeWidth={1.5} />
                <TextInput
                  placeholder="E-mail ou téléphone"
                  placeholderTextColor="rgba(234, 234, 234, 0.4)"
                  value={formData.email}
                  onChangeText={(text) =>
                    setFormData({ ...formData, email: text })
                  }
                  style={styles.input}
                  autoCapitalize="none"
                />
              </View>
            )}

            {/* Password Input */}
            <View style={styles.inputRow}>
              <Lock size={20} color={iconColor} strokeWidth={1.5} />
              <TextInput
                placeholder="Mot de passe"
                placeholderTextColor="rgba(234, 234, 234, 0.4)"
                value={formData.password}
                onChangeText={(text) =>
                  setFormData({ ...formData, password: text })
                }
                style={styles.input}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                activeOpacity={0.7}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                {showPassword ? (
                  <EyeOff size={20} color={iconColor} strokeWidth={1.5} />
                ) : (
                  <Eye size={20} color={iconColor} strokeWidth={1.5} />
                )}
              </TouchableOpacity>
            </View>

            {/* Forgot Password */}
            {activeTab === "login" && (
              <TouchableOpacity style={styles.forgotRow} activeOpacity={0.7}>
                <Text style={styles.forgotText}>Mot de passe oublié ?</Text>
              </TouchableOpacity>
            )}

            {/* Submit Button */}
            <View style={styles.submitContainer}>
              <Button fullWidth onPress={handleSubmit}>
                {activeTab === "signup" ? "Créer mon compte" : "Se connecter"}
              </Button>
            </View>

            {/* Social Divider */}
            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>ou continuer avec</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Social Buttons */}
            <View style={styles.socialRow}>
              <TouchableOpacity style={styles.socialButton} activeOpacity={0.85}>
                <GoogleIcon />
                <Text style={styles.socialText}>Google</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.socialButton} activeOpacity={0.85}>
                <AppleIcon />
                <Text style={styles.socialText}>Apple</Text>
              </TouchableOpacity>
            </View>

            {/* Bottom Link */}
            <View style={styles.bottomLink}>
              <Text style={styles.bottomLinkSecondary}>
                {activeTab === "signup"
                  ? "Déjà un compte ? "
                  : "Pas encore de compte ? "}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  setActiveTab(activeTab === "signup" ? "login" : "signup")
                }
                activeOpacity={0.7}
              >
                <Text style={styles.bottomLinkPrimary}>
                  {activeTab === "signup" ? "Se connecter" : "S'inscrire"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050404",
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 32,
    paddingBottom: 40,
  },

  // Tabs
  tabContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(234, 234, 234, 0.1)",
    marginBottom: 32,
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

  // Form
  form: {
    gap: 12,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    height: 48,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: "#2E1C2B",
    borderWidth: 1,
    borderColor: "rgba(234, 234, 234, 0.1)",
    gap: 12,
  },
  input: {
    flex: 1,
    fontFamily: "Poppins_400Regular",
    fontSize: 15,
    color: "#EAEAEA",
    height: 48,
  },
  phonePrefix: {
    fontFamily: "Poppins_400Regular",
    fontSize: 15,
    color: "rgba(234, 234, 234, 0.6)",
  },

  // Forgot password
  forgotRow: {
    alignItems: "flex-end",
  },
  forgotText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 13,
    color: "rgba(234, 234, 234, 0.6)",
  },

  // Submit
  submitContainer: {
    paddingTop: 8,
  },

  // Social divider
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingTop: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(234, 234, 234, 0.1)",
  },
  dividerText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
    color: "rgba(234, 234, 234, 0.5)",
  },

  // Social buttons
  socialRow: {
    flexDirection: "row",
    gap: 12,
    paddingTop: 16,
  },
  socialButton: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#2E1C2B",
    borderWidth: 1,
    borderColor: "rgba(234, 234, 234, 0.1)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  socialText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 15,
    color: "#EAEAEA",
  },

  // Bottom link
  bottomLink: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 16,
  },
  bottomLinkSecondary: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "rgba(234, 234, 234, 0.6)",
  },
  bottomLinkPrimary: {
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    color: "#EAEAEA",
    textDecorationLine: "underline",
  },
});
