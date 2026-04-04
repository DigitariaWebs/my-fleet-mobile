import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter, usePathname } from "expo-router";
import { Home, Calendar, User } from "lucide-react-native";
import type { LucideIcon } from "lucide-react-native";

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

  return (
    <View style={styles.container}>
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
            {isActive && <View style={styles.activeDot} />}
            <Icon
              size={24}
              strokeWidth={1.5}
              color={isActive ? "#EAEAEA" : "rgba(234, 234, 234, 0.6)"}
            />
            <Text
              style={[
                styles.label,
                {
                  color: isActive ? "#EAEAEA" : "rgba(234, 234, 234, 0.6)",
                },
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
    height: 64,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#2E1C2B",
    borderTopWidth: 1,
    borderTopColor: "rgba(234, 234, 234, 0.1)",
  },
  tab: {
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    minWidth: 60,
    position: "relative",
  },
  activeDot: {
    position: "absolute",
    top: -8,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#4A1942",
  },
  label: {
    fontFamily: "Poppins_500Medium",
    fontSize: 10,
  },
});
