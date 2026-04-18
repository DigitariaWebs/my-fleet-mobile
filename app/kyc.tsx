import { useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ArrowLeft,
  CheckCircle,
  Camera,
  X,
  Upload,
} from "lucide-react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
} from "react-native-reanimated";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/Button";

interface Uploads {
  idFront: boolean;
  idBack: boolean;
  licenseFront: boolean;
  licenseBack: boolean;
}

type UploadKey = keyof Uploads;

export default function KYCScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [uploads, setUploads] = useState<Uploads>({
    idFront: false,
    idBack: false,
    licenseFront: false,
    licenseBack: false,
  });

  const progress = (step / 3) * 100;

  const handleBack = useCallback(() => {
    if (step === 1) {
      router.back();
    } else {
      setStep((s) => s - 1);
    }
  }, [step, router]);

  const handleSkip = useCallback(() => {
    router.replace("/home");
  }, [router]);

  const handleContinue = useCallback(() => {
    if (step < 3) {
      setStep((s) => s + 1);
    } else {
      router.replace("/home");
    }
  }, [step, router]);

  const toggleUpload = useCallback(
    (key: UploadKey) => {
      setUploads((prev) => ({ ...prev, [key]: !prev[key] }));
    },
    []
  );

  const allUploaded = Object.values(uploads).every(Boolean);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Row */}
        <View style={styles.headerRow}>
          <TouchableOpacity
            onPress={handleBack}
            activeOpacity={0.7}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <ArrowLeft size={24} color="#EAEAEA" strokeWidth={1.5} />
          </TouchableOpacity>
          <Text style={styles.stepLabel}>{t("kyc.stepLabel", { current: step, total: 3 })}</Text>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>

        {/* Step 1: Introduction */}
        {step === 1 && <Step1 onContinue={handleContinue} onSkip={handleSkip} />}

        {/* Step 2: Document Upload */}
        {step === 2 && (
          <Step2
            uploads={uploads}
            onToggle={toggleUpload}
            onContinue={handleContinue}
            allUploaded={allUploaded}
          />
        )}

        {/* Step 3: Verification Pending */}
        {step === 3 && <Step3 onContinue={handleContinue} />}
      </ScrollView>
    </SafeAreaView>
  );
}

/* ─── Step 1: Introduction ─── */

function Step1({
  onContinue,
  onSkip,
}: {
  onContinue: () => void;
  onSkip: () => void;
}) {
  const { t } = useTranslation();
  const benefits = [
    t("kyc.step1.benefit1"),
    t("kyc.step1.benefit2"),
    t("kyc.step1.benefit3"),
  ];

  return (
    <>
      <Text style={styles.title}>{t("kyc.step1.title")}</Text>
      <Text style={styles.description}>
        {t("kyc.step1.description")}
      </Text>

      {/* Icon Card */}
      <View style={styles.iconCard}>
        <View style={styles.iconCircle}>
          <CheckCircle size={48} color="#4A1942" strokeWidth={1.5} />
        </View>
      </View>

      {/* Benefits */}
      <View style={styles.benefitsList}>
        {benefits.map((benefit, index) => (
          <View key={index} style={styles.benefitRow}>
            <CheckCircle size={20} color="#4A1942" strokeWidth={1.5} />
            <Text style={styles.benefitText}>{benefit}</Text>
          </View>
        ))}
      </View>

      <Button fullWidth onPress={onContinue}>
        {t("kyc.step1.startButton")}
      </Button>

      <TouchableOpacity
        onPress={onSkip}
        style={styles.skipButton}
        activeOpacity={0.7}
      >
        <Text style={styles.skipText}>{t("kyc.step1.laterButton")}</Text>
      </TouchableOpacity>
    </>
  );
}

/* ─── Step 2: Document Upload ─── */

function UploadBox({
  uploaded,
  label,
  icon,
  onToggle,
}: {
  uploaded: boolean;
  label: string;
  icon: "camera" | "upload";
  onToggle: () => void;
}) {
  const IconComponent = icon === "camera" ? Camera : Upload;

  return (
    <TouchableOpacity
      onPress={onToggle}
      activeOpacity={0.85}
      style={[
        styles.uploadBox,
        {
          backgroundColor: uploaded ? "#2E1C2B" : "transparent",
          borderColor: uploaded
            ? "#4A1942"
            : "rgba(234, 234, 234, 0.15)",
        },
      ]}
    >
      {uploaded ? (
        <>
          <CheckCircle size={24} color="#2ECC71" strokeWidth={1.5} />
          <TouchableOpacity
            onPress={onToggle}
            style={styles.removeButton}
            activeOpacity={0.7}
            hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
          >
            <X size={14} color="#EAEAEA" strokeWidth={1.5} />
          </TouchableOpacity>
        </>
      ) : (
        <>
          <IconComponent
            size={24}
            color="rgba(234, 234, 234, 0.4)"
            strokeWidth={1.5}
          />
          <Text style={styles.uploadLabel}>{label}</Text>
        </>
      )}
    </TouchableOpacity>
  );
}

function Step2({
  uploads,
  onToggle,
  onContinue,
  allUploaded,
}: {
  uploads: Uploads;
  onToggle: (key: UploadKey) => void;
  onContinue: () => void;
  allUploaded: boolean;
}) {
  const { t } = useTranslation();
  return (
    <>
      <Text style={styles.title}>{t("kyc.step2.title")}</Text>
      <Text style={styles.description}>
        {t("kyc.step2.description")}
      </Text>

      {/* ID Card */}
      <View style={styles.uploadSection}>
        <Text style={styles.uploadSectionLabel}>{t("kyc.step2.idCardLabel")}</Text>
        <View style={styles.uploadGrid}>
          <UploadBox
            uploaded={uploads.idFront}
            label={t("kyc.step2.front")}
            icon="camera"
            onToggle={() => onToggle("idFront")}
          />
          <UploadBox
            uploaded={uploads.idBack}
            label={t("kyc.step2.back")}
            icon="camera"
            onToggle={() => onToggle("idBack")}
          />
        </View>
      </View>

      {/* Driver's License */}
      <View style={styles.uploadSection}>
        <Text style={styles.uploadSectionLabel}>{t("kyc.step2.licenseLabel")}</Text>
        <View style={styles.uploadGrid}>
          <UploadBox
            uploaded={uploads.licenseFront}
            label={t("kyc.step2.front")}
            icon="upload"
            onToggle={() => onToggle("licenseFront")}
          />
          <UploadBox
            uploaded={uploads.licenseBack}
            label={t("kyc.step2.back")}
            icon="upload"
            onToggle={() => onToggle("licenseBack")}
          />
        </View>
      </View>

      {/* Tip */}
      <View style={styles.tipBox}>
        <Text style={styles.tipText}>
          {t("kyc.step2.tip")}
        </Text>
      </View>

      <Button fullWidth onPress={onContinue} disabled={!allUploaded}>
        {t("common.continue")}
      </Button>
    </>
  );
}

/* ─── Step 3: Verification Pending ─── */

function PulsingCircle() {
  const opacity = useSharedValue(1);

  // Start pulse animation
  opacity.value = withRepeat(
    withSequence(
      withTiming(0.4, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
      withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.ease) })
    ),
    -1,
    false
  );

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[styles.pulsingCircle, animatedStyle]}>
      <CheckCircle size={64} color="#4A1942" strokeWidth={1.5} />
    </Animated.View>
  );
}

function Step3({ onContinue }: { onContinue: () => void }) {
  const { t } = useTranslation();
  return (
    <>
      <Text style={[styles.title, styles.textCenter]}>
        {t("kyc.step3.title")}
      </Text>
      <Text style={[styles.description, styles.textCenter]}>
        {t("kyc.step3.description")}
      </Text>

      {/* Pulsing Icon Card */}
      <View style={styles.pendingCard}>
        <PulsingCircle />
      </View>

      {/* Status Badge */}
      <View style={styles.badgeContainer}>
        <View style={styles.statusBadge}>
          <Text style={styles.statusBadgeText}>{t("kyc.step3.statusBadge")}</Text>
        </View>
      </View>

      <Button fullWidth onPress={onContinue}>
        {t("kyc.step3.homeButton")}
      </Button>
    </>
  );
}

/* ─── Styles ─── */

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

  // Header
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  stepLabel: {
    fontFamily: "Poppins_500Medium",
    fontSize: 13,
    color: "rgba(234, 234, 234, 0.6)",
  },

  // Progress
  progressTrack: {
    height: 4,
    borderRadius: 2,
    backgroundColor: "rgba(234, 234, 234, 0.1)",
    marginBottom: 24,
    overflow: "hidden",
  },
  progressFill: {
    height: 4,
    borderRadius: 2,
    backgroundColor: "#4A1942",
  },

  // Shared
  title: {
    fontFamily: "Poppins_700Bold",
    fontSize: 22,
    color: "#EAEAEA",
    marginBottom: 8,
  },
  description: {
    fontFamily: "Poppins_400Regular",
    fontSize: 15,
    color: "rgba(234, 234, 234, 0.7)",
    lineHeight: 22,
    marginBottom: 24,
  },
  textCenter: {
    textAlign: "center",
  },

  // Step 1
  iconCard: {
    borderRadius: 16,
    padding: 24,
    backgroundColor: "#2E1C2B",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  iconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "rgba(74, 25, 66, 0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  benefitsList: {
    gap: 12,
    marginBottom: 32,
  },
  benefitRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  benefitText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 15,
    color: "#EAEAEA",
  },
  skipButton: {
    paddingVertical: 16,
    alignItems: "center",
  },
  skipText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 15,
    color: "rgba(234, 234, 234, 0.5)",
  },

  // Step 2
  uploadSection: {
    marginBottom: 16,
  },
  uploadSectionLabel: {
    fontFamily: "Poppins_500Medium",
    fontSize: 13,
    color: "rgba(234, 234, 234, 0.8)",
    marginBottom: 8,
  },
  uploadGrid: {
    flexDirection: "row",
    gap: 12,
  },
  uploadBox: {
    flex: 1,
    height: 120,
    borderRadius: 16,
    borderWidth: 2,
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    position: "relative",
  },
  uploadLabel: {
    fontFamily: "Poppins_400Regular",
    fontSize: 11,
    color: "rgba(234, 234, 234, 0.5)",
    textAlign: "center",
  },
  removeButton: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(234, 234, 234, 0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  tipBox: {
    borderRadius: 12,
    padding: 12,
    backgroundColor: "rgba(74, 25, 66, 0.1)",
    marginBottom: 24,
  },
  tipText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: "rgba(234, 234, 234, 0.5)",
    lineHeight: 18,
  },

  // Step 3
  pendingCard: {
    borderRadius: 16,
    padding: 32,
    backgroundColor: "#2E1C2B",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  pulsingCircle: {
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: "rgba(74, 25, 66, 0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  badgeContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  statusBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "rgba(243, 156, 18, 0.15)",
  },
  statusBadgeText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 13,
    color: "#F39C12",
  },
});
