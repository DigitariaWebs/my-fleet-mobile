import { Pressable, Text, View } from "react-native";
import type { LucideIcon } from "lucide-react-native";

import { useTheme } from "@/context/ThemeContext";

export interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  icon: Icon,
  title,
  subtitle,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  const { colors } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 24,
      }}
    >
      {Icon ? (
        <View style={{ marginBottom: 16 }}>
          <Icon size={64} color={colors.textMuted} strokeWidth={1} />
        </View>
      ) : null}

      <Text
        style={{
          fontFamily: "Poppins_600SemiBold",
          fontSize: 18,
          color: colors.text,
          textAlign: "center",
        }}
      >
        {title}
      </Text>

      {subtitle ? (
        <Text
          style={{
            fontFamily: "Poppins_400Regular",
            fontSize: 14,
            color: colors.textSecondary,
            textAlign: "center",
            marginTop: 8,
          }}
        >
          {subtitle}
        </Text>
      ) : null}

      {actionLabel && onAction ? (
        <Pressable
          onPress={onAction}
          style={({ pressed }) => ({
            backgroundColor: colors.primary,
            borderRadius: 999,
            paddingHorizontal: 24,
            paddingVertical: 12,
            marginTop: 24,
            opacity: pressed ? 0.85 : 1,
          })}
        >
          <Text
            style={{
              fontFamily: "Poppins_600SemiBold",
              fontSize: 14,
              color: "#FFFFFF",
              textAlign: "center",
            }}
          >
            {actionLabel}
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}
