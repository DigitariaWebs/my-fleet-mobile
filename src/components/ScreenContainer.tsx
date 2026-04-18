import { type ReactNode } from "react";
import { View, Text, Pressable, ScrollView, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { ArrowLeft } from "lucide-react-native";
import { useTheme } from "@/context/ThemeContext";

interface ScreenContainerProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  /** If true, no ScrollView wraps children (useful for custom scrolling). */
  noScroll?: boolean;
  /** Right-aligned action slot in the header. */
  headerRight?: ReactNode;
}

export function ScreenContainer({
  title,
  subtitle,
  children,
  noScroll,
  headerRight,
}: ScreenContainerProps) {
  const { colors } = useTheme();
  const router = useRouter();

  const content = noScroll ? (
    <View style={styles.body}>{children}</View>
  ) : (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      {children}
    </ScrollView>
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style={colors.statusBarStyle} />
      <SafeAreaView edges={["top"]} style={{ backgroundColor: colors.background }}>
        <View style={styles.header}>
          <Pressable
            onPress={() => router.back()}
            hitSlop={12}
            style={[styles.backBtn, { backgroundColor: colors.surface, borderColor: colors.border }]}
          >
            <ArrowLeft size={20} color={colors.text} strokeWidth={1.8} />
          </Pressable>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>
              {title}
            </Text>
            {subtitle && (
              <Text style={[styles.subtitle, { color: colors.textSecondary }]} numberOfLines={1}>
                {subtitle}
              </Text>
            )}
          </View>
          {headerRight}
        </View>
      </SafeAreaView>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 14,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  title: {
    fontFamily: "Poppins_700Bold",
    fontSize: 22,
    letterSpacing: -0.3,
  },
  subtitle: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    marginTop: 2,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 120,
  },
  body: {
    flex: 1,
    paddingHorizontal: 16,
  },
});
