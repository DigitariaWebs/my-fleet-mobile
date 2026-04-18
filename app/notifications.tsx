import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ArrowLeft,
  Calendar,
  Truck,
  Gift,
  Shield,
  Star,
  Receipt,
} from "lucide-react-native";
import type { LucideIcon } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { notifications, type NotificationType } from "@/data/mockData";

const iconMap: Record<NotificationType, LucideIcon> = {
  booking: Calendar,
  delivery: Truck,
  loyalty: Gift,
  kyc: Shield,
  review: Star,
  return_summary_ready: Receipt,
};

const colorMap: Record<NotificationType, string> = {
  booking: "rgba(46, 204, 113, 0.15)",
  delivery: "rgba(74, 25, 66, 0.2)",
  loyalty: "rgba(241, 196, 15, 0.15)",
  kyc: "rgba(243, 156, 18, 0.15)",
  review: "rgba(234, 234, 234, 0.1)",
  return_summary_ready: "rgba(74, 25, 66, 0.25)",
};

export default function NotificationsScreen() {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity
            onPress={() => router.back()}
            activeOpacity={0.7}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <ArrowLeft size={24} color="#EAEAEA" strokeWidth={1.5} />
          </TouchableOpacity>
          <Text style={styles.title}>{t("notifications.title")}</Text>
        </View>

        {/* Notification List */}
        <View style={styles.list}>
          {notifications.map((notif) => {
            const Icon = iconMap[notif.type];
            const bgColor = colorMap[notif.type];

            return (
              <TouchableOpacity
                key={notif.id}
                style={[
                  styles.notifRow,
                  {
                    backgroundColor: notif.read ? "#050404" : "#2E1C2B",
                  },
                ]}
                activeOpacity={0.85}
                onPress={() => {
                  if (notif.route) router.push(notif.route as never);
                }}
              >
                {/* Icon */}
                <View
                  style={[styles.iconCircle, { backgroundColor: bgColor }]}
                >
                  <Icon size={18} color="#EAEAEA" strokeWidth={1.5} />
                </View>

                {/* Text */}
                <View style={styles.notifTextWrapper}>
                  <Text style={styles.notifTitle}>{notif.title}</Text>
                  <Text style={styles.notifTime}>{t("notifications.agoPrefix", { time: notif.time })}</Text>
                </View>

                {/* Unread dot */}
                {!notif.read && <View style={styles.unreadDot} />}
              </TouchableOpacity>
            );
          })}
        </View>
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
    gap: 16,
    marginBottom: 24,
  },
  title: {
    fontFamily: "Poppins_700Bold",
    fontSize: 22,
    color: "#EAEAEA",
  },

  /* List */
  list: {
    gap: 8,
  },
  notifRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 999,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  notifTextWrapper: {
    flex: 1,
  },
  notifTitle: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "#EAEAEA",
    lineHeight: 20,
  },
  notifTime: {
    fontFamily: "Poppins_400Regular",
    fontSize: 11,
    color: "rgba(234, 234, 234, 0.4)",
    marginTop: 4,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#4A1942",
    flexShrink: 0,
  },
});
