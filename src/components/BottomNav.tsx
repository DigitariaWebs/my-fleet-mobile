import { useEffect } from "react";
import { Pressable, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useRouter, usePathname } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import { Home, Calendar, User, Settings } from "lucide-react-native";
import type { LucideIcon } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/context/ThemeContext";

interface Tab {
  icon: LucideIcon;
  labelKey: string;
  path: string;
}

const tabs: Tab[] = [
  { icon: Home, labelKey: "bottomNav.home", path: "/home" },
  { icon: Calendar, labelKey: "bottomNav.bookings", path: "/bookings" },
  { icon: User, labelKey: "bottomNav.profile", path: "/profile" },
  { icon: Settings, labelKey: "bottomNav.settings", path: "/settings" },
];

// ── Single Tab ────────────────────────────────────────────────────────────

interface TabButtonProps {
  tab: Tab;
  label: string;
  isActive: boolean;
  onPress: () => void;
}

function TabButton({ tab, label, isActive, onPress }: TabButtonProps) {
  const { colors } = useTheme();
  const scale = useSharedValue(1);
  const indicator = useSharedValue(isActive ? 1 : 0);

  useEffect(() => {
    indicator.value = withTiming(isActive ? 1 : 0, { duration: 250 });
    scale.value = withSpring(isActive ? 1.04 : 1, {
      damping: 14,
      stiffness: 260,
    });
  }, [isActive, indicator, scale]);

  const circleStyle = useAnimatedStyle(() => ({
    opacity: indicator.value,
    transform: [{ scale: 0.6 + indicator.value * 0.4 }],
  }));

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const Icon = tab.icon;
  const activeIconColor = "#FFFFFF";

  return (
    <Pressable
      onPress={() => {
        void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onPress();
      }}
      hitSlop={8}
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 6,
      }}
    >
      <View
        style={{
          width: 40,
          height: 40,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Animated.View
          style={[
            circleStyle,
            {
              position: "absolute",
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: colors.primary,
              shadowColor: colors.primary,
              shadowOffset: { width: 0, height: 3 },
              shadowOpacity: 0.35,
              shadowRadius: 8,
              elevation: 4,
            },
          ]}
        />
        <Animated.View style={iconStyle}>
          <Icon
            size={20}
            color={isActive ? activeIconColor : colors.textSecondary}
            strokeWidth={isActive ? 2.2 : 1.8}
          />
        </Animated.View>
      </View>

      <Animated.Text
        style={{
          fontFamily: isActive ? "Poppins_600SemiBold" : "Poppins_400Regular",
          fontSize: 10,
          color: isActive ? colors.primary : colors.textMuted,
          marginTop: 2,
          letterSpacing: 0.2,
        }}
        numberOfLines={1}
      >
        {label}
      </Animated.Text>
    </Pressable>
  );
}

// ── Floating Tab Bar ──────────────────────────────────────────────────────

export function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const { t } = useTranslation();

  return (
    <View
      style={{
        position: "absolute",
        bottom: Math.max(insets.bottom, 14),
        left: 14,
        right: 14,
      }}
      pointerEvents="box-none"
    >
      <View
        style={{
          backgroundColor: colors.surface,
          borderRadius: 9999,
          borderWidth: 1,
          borderColor: colors.border,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.25,
          shadowRadius: 20,
          elevation: 12,
          overflow: "hidden",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 8,
            paddingVertical: 8,
          }}
        >
          {tabs.map((tab) => (
            <TabButton
              key={tab.path}
              tab={tab}
              label={t(tab.labelKey)}
              isActive={pathname === tab.path}
              onPress={() => router.push(tab.path as never)}
            />
          ))}
        </View>
      </View>
    </View>
  );
}
