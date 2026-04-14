import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter, usePathname } from "expo-router";
import { Home, Calendar, User } from "lucide-react-native";
import type { LucideIcon } from "lucide-react-native";
import { useTheme } from "@/context/ThemeContext";

interface Tab {
  icon: LucideIcon;
  label: string;
  path: string;
}

const tabs: Tab[] = [
  { icon: Home, label: "Accueil", path: "/home" },
  { icon: Calendar, label: "Réservations", path: "/bookings" },
  { icon: User, label: "Profil", path: "/profile" },
];

export function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.surface, borderTopColor: colors.border }]}>
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = pathname === tab.path;

        return (
          <TouchableOpacity
            key={tab.path}
            onPress={() => router.push(tab.path as any)}
            style={styles.tab}
            activeOpacity={0.7}
          >
            {isActive && <View style={[styles.activeDot, { backgroundColor: colors.primary }]} />}
            <Icon
              size={24}
              strokeWidth={1.5}
              color={isActive ? colors.text : colors.textSecondary}
            />
            <Text
              style={[
                styles.label,
                { color: isActive ? colors.text : colors.textSecondary },
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderWidth: 1,
    borderBottomWidth: 0,
  },
  tab: {
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
    minWidth: 60,
    position: "relative",
  },
  activeDot: {
    position: "absolute",
    top: -6,
    width: 4,
    height: 4,
    borderRadius: 999,
  },
  label: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 10,
    letterSpacing: 0.2,
  },
});
