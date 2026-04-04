import { useState, useCallback, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ArrowLeft,
  Search as SearchIcon,
  Clock,
  X,
} from "lucide-react-native";

const initialRecentSearches = [
  "Porsche 911",
  "Monaco Premium Fleet",
  "SUV Nice",
];

interface PopularCategory {
  name: string;
  icon: string;
}

const popularCategories: PopularCategory[] = [
  { name: "Sportives", icon: "🏎️" },
  { name: "SUV", icon: "🚙" },
  { name: "Berlines", icon: "🚗" },
  { name: "Cabriolets", icon: "🚗" },
  { name: "Électriques", icon: "⚡" },
  { name: "Avec chauffeur", icon: "👔" },
];

export default function SearchScreen() {
  const router = useRouter();
  const inputRef = useRef<TextInput>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searches, setSearches] = useState(initialRecentSearches);

  useEffect(() => {
    // Auto-focus the search input
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const removeSearch = useCallback((search: string) => {
    setSearches((prev) => prev.filter((s) => s !== search));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header: Back + Search Input */}
        <View style={styles.headerRow}>
          <TouchableOpacity
            onPress={() => router.back()}
            activeOpacity={0.7}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <ArrowLeft size={24} color="#EAEAEA" strokeWidth={1.5} />
          </TouchableOpacity>

          <View style={styles.searchInputWrapper}>
            <SearchIcon
              size={20}
              color="rgba(234, 234, 234, 0.6)"
              strokeWidth={1.5}
            />
            <TextInput
              ref={inputRef}
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Rechercher..."
              placeholderTextColor="rgba(234, 234, 234, 0.4)"
              style={styles.searchInput}
              returnKeyType="search"
            />
          </View>
        </View>

        {/* Recent Searches */}
        {searches.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recherches récentes</Text>
            <View style={styles.recentList}>
              {searches.map((search) => (
                <View key={search} style={styles.recentRow}>
                  <TouchableOpacity
                    style={styles.recentLeft}
                    activeOpacity={0.7}
                  >
                    <Clock
                      size={18}
                      color="rgba(234, 234, 234, 0.4)"
                      strokeWidth={1.5}
                    />
                    <Text style={styles.recentText}>{search}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => removeSearch(search)}
                    activeOpacity={0.7}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  >
                    <X
                      size={18}
                      color="rgba(234, 234, 234, 0.4)"
                      strokeWidth={1.5}
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Popular Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Catégories populaires</Text>
          <View style={styles.categoriesGrid}>
            {popularCategories.map((category) => (
              <TouchableOpacity
                key={category.name}
                style={styles.categoryCard}
                activeOpacity={0.85}
              >
                <Text style={styles.categoryIcon}>{category.icon}</Text>
                <Text style={styles.categoryName}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
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
    gap: 12,
    marginBottom: 24,
  },
  searchInputWrapper: {
    flex: 1,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#2E1C2B",
    borderWidth: 1,
    borderColor: "rgba(234, 234, 234, 0.1)",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontFamily: "Poppins_400Regular",
    fontSize: 15,
    color: "#EAEAEA",
    height: 52,
  },

  /* Section */
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    color: "#EAEAEA",
    marginBottom: 12,
  },

  /* Recent Searches */
  recentList: {
    gap: 8,
  },
  recentRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 44,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: "#2E1C2B",
  },
  recentLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  recentText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "rgba(234, 234, 234, 0.7)",
  },

  /* Popular Categories */
  categoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  categoryCard: {
    width: "48%",
    height: 60,
    borderRadius: 12,
    backgroundColor: "#2E1C2B",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  categoryIcon: {
    fontSize: 24,
  },
  categoryName: {
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    color: "#EAEAEA",
  },
});
