import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ArrowLeft,
  Search as SearchIcon,
  Clock,
  X,
  Star,
  MapPin,
} from "lucide-react-native";
import {
  vehicles,
  agencies,
  vehicleImages,
  type Vehicle,
  type Agency,
} from "@/data/mockData";

const initialRecentSearches = [
  "Porsche 911",
  "Monaco Premium Fleet",
  "SUV Nice",
];

interface PopularCategory {
  name: string;
  icon: string;
  filter: string;
}

const popularCategories: PopularCategory[] = [
  { name: "Sportives", icon: "🏎️", filter: "Sportive" },
  { name: "SUV", icon: "🚙", filter: "SUV" },
  { name: "Berlines", icon: "🚗", filter: "Berline" },
  { name: "Cabriolets", icon: "🚗", filter: "Cabriolet" },
  { name: "Électriques", icon: "⚡", filter: "Électrique" },
  { name: "Avec chauffeur", icon: "👔", filter: "chauffeur" },
];

type ResultType = "vehicle" | "agency";

interface SearchResult {
  type: ResultType;
  id: string;
  title: string;
  subtitle: string;
  imageUri?: string;
  price?: number;
  rating?: number;
}

function searchAll(query: string): SearchResult[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  const results: SearchResult[] = [];

  // Search vehicles
  vehicles.forEach((v, index) => {
    const match =
      v.name.toLowerCase().includes(q) ||
      v.category.toLowerCase().includes(q) ||
      v.fuel.toLowerCase().includes(q) ||
      v.agencyName.toLowerCase().includes(q) ||
      v.transmission.toLowerCase().includes(q);
    if (match) {
      results.push({
        type: "vehicle",
        id: v.id,
        title: v.name,
        subtitle: `${v.year} • ${v.transmission} • ${v.fuel}`,
        imageUri: vehicleImages[index],
        price: v.price,
      });
    }
  });

  // Search agencies
  agencies.forEach((a, index) => {
    const match =
      a.name.toLowerCase().includes(q) ||
      a.city.toLowerCase().includes(q);
    if (match) {
      results.push({
        type: "agency",
        id: a.id,
        title: a.name,
        subtitle: `${a.city} — ${a.vehicles} véhicules`,
        imageUri: vehicleImages[index % vehicleImages.length],
        rating: a.rating,
      });
    }
  });

  return results;
}

function filterByCategory(cat: string): SearchResult[] {
  const results: SearchResult[] = [];
  vehicles.forEach((v, index) => {
    const match =
      cat === "chauffeur"
        ? v.chauffeurAvailable
        : v.category.toLowerCase() === cat.toLowerCase();
    if (match) {
      results.push({
        type: "vehicle",
        id: v.id,
        title: v.name,
        subtitle: `${v.year} • ${v.transmission} • ${v.fuel}`,
        imageUri: vehicleImages[index],
        price: v.price,
      });
    }
  });
  return results;
}

export default function SearchScreen() {
  const router = useRouter();
  const inputRef = useRef<TextInput>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searches, setSearches] = useState(initialRecentSearches);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => inputRef.current?.focus(), 100);
    return () => clearTimeout(timer);
  }, []);

  const results = useMemo(() => {
    if (categoryFilter) return filterByCategory(categoryFilter);
    return searchAll(searchQuery);
  }, [searchQuery, categoryFilter]);

  const hasResults = results.length > 0;
  const isSearching = searchQuery.length > 0 || categoryFilter !== null;

  const removeSearch = useCallback((search: string) => {
    setSearches((prev) => prev.filter((s) => s !== search));
  }, []);

  const handleRecentPress = useCallback((search: string) => {
    setSearchQuery(search);
    setCategoryFilter(null);
  }, []);

  const handleCategoryPress = useCallback((filter: string) => {
    setCategoryFilter(filter);
    setSearchQuery("");
  }, []);

  const clearSearch = useCallback(() => {
    setSearchQuery("");
    setCategoryFilter(null);
  }, []);

  const handleResultPress = useCallback(
    (result: SearchResult) => {
      if (result.type === "vehicle") {
        router.push(`/vehicle/${result.id}` as any);
      } else {
        router.push(`/agency/${result.id}` as any);
      }
    },
    [router]
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* ─── Header ─── */}
        <View style={styles.headerRow}>
          <TouchableOpacity
            onPress={() => router.back()}
            activeOpacity={0.7}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <ArrowLeft size={24} color="#EAEAEA" strokeWidth={1.5} />
          </TouchableOpacity>

          <View style={styles.searchInputWrapper}>
            <SearchIcon size={20} color="rgba(234, 234, 234, 0.6)" strokeWidth={1.5} />
            <TextInput
              ref={inputRef}
              value={categoryFilter ? "" : searchQuery}
              onChangeText={(t) => {
                setSearchQuery(t);
                setCategoryFilter(null);
              }}
              placeholder={categoryFilter ? `Catégorie: ${categoryFilter}` : "Rechercher..."}
              placeholderTextColor="rgba(234, 234, 234, 0.4)"
              style={styles.searchInput}
              returnKeyType="search"
            />
            {isSearching && (
              <TouchableOpacity onPress={clearSearch} activeOpacity={0.7}>
                <X size={18} color="rgba(234, 234, 234, 0.5)" strokeWidth={1.5} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* ─── Active Category Badge ─── */}
        {categoryFilter && (
          <View style={styles.activeBadgeRow}>
            <View style={styles.activeBadge}>
              <Text style={styles.activeBadgeText}>{categoryFilter}</Text>
              <TouchableOpacity onPress={clearSearch} activeOpacity={0.7}>
                <X size={14} color="#EAEAEA" strokeWidth={2} />
              </TouchableOpacity>
            </View>
            <Text style={styles.resultCount}>{results.length} résultat{results.length !== 1 ? "s" : ""}</Text>
          </View>
        )}

        {/* ─── Search Results ─── */}
        {isSearching && (
          <View style={styles.section}>
            {hasResults ? (
              <View style={styles.resultsList}>
                {results.map((result) => (
                  <TouchableOpacity
                    key={`${result.type}-${result.id}`}
                    style={styles.resultCard}
                    activeOpacity={0.85}
                    onPress={() => handleResultPress(result)}
                  >
                    <Image
                      source={{ uri: result.imageUri }}
                      style={styles.resultImage}
                    />
                    <View style={styles.resultInfo}>
                      <View style={styles.resultTypeBadge}>
                        <Text style={styles.resultTypeText}>
                          {result.type === "vehicle" ? "Véhicule" : "Agence"}
                        </Text>
                      </View>
                      <Text style={styles.resultTitle} numberOfLines={1}>
                        {result.title}
                      </Text>
                      <Text style={styles.resultSubtitle} numberOfLines={1}>
                        {result.subtitle}
                      </Text>
                      {result.price && (
                        <View style={styles.resultPriceRow}>
                          <Text style={styles.resultPrice}>{result.price} €</Text>
                          <Text style={styles.resultPriceUnit}> / jour</Text>
                        </View>
                      )}
                      {result.rating && (
                        <View style={styles.resultRatingRow}>
                          <Star size={12} fill="#F1C40F" color="#F1C40F" strokeWidth={1.5} />
                          <Text style={styles.resultRating}>{result.rating}</Text>
                        </View>
                      )}
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            ) : (
              <View style={styles.noResults}>
                <Text style={styles.noResultsEmoji}>🔍</Text>
                <Text style={styles.noResultsTitle}>Aucun résultat</Text>
                <Text style={styles.noResultsText}>
                  Essayez un autre terme de recherche
                </Text>
              </View>
            )}
          </View>
        )}

        {/* ─── Default state: recent + categories ─── */}
        {!isSearching && (
          <>
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
                        onPress={() => handleRecentPress(search)}
                      >
                        <Clock size={18} color="rgba(234, 234, 234, 0.4)" strokeWidth={1.5} />
                        <Text style={styles.recentText}>{search}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => removeSearch(search)}
                        activeOpacity={0.7}
                        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                      >
                        <X size={18} color="rgba(234, 234, 234, 0.4)" strokeWidth={1.5} />
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
                    onPress={() => handleCategoryPress(category.filter)}
                  >
                    <Text style={styles.categoryIcon}>{category.icon}</Text>
                    <Text style={styles.categoryName}>{category.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Quick suggestions */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Suggestions</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.suggestionsScroll}>
                {vehicles.slice(0, 4).map((v, i) => (
                  <TouchableOpacity
                    key={v.id}
                    style={styles.suggestionCard}
                    activeOpacity={0.85}
                    onPress={() => router.push(`/vehicle/${v.id}` as any)}
                  >
                    <Image source={{ uri: vehicleImages[i] }} style={styles.suggestionImage} />
                    <View style={styles.suggestionInfo}>
                      <Text style={styles.suggestionName} numberOfLines={1}>{v.name}</Text>
                      <Text style={styles.suggestionPrice}>{v.price} € / jour</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#050404" },
  scrollContent: { paddingHorizontal: 20, paddingTop: 32, paddingBottom: 40 },

  /* Header */
  headerRow: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 24 },
  searchInputWrapper: { flex: 1, height: 52, borderRadius: 26, backgroundColor: "#2E1C2B", borderWidth: 1, borderColor: "rgba(234, 234, 234, 0.1)", flexDirection: "row", alignItems: "center", paddingHorizontal: 16, gap: 12 },
  searchInput: { flex: 1, fontFamily: "Poppins_400Regular", fontSize: 15, color: "#EAEAEA", height: 52 },

  /* Active category badge */
  activeBadgeRow: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 20 },
  activeBadge: { flexDirection: "row", alignItems: "center", gap: 8, backgroundColor: "#4A1942", paddingHorizontal: 14, paddingVertical: 6, borderRadius: 999 },
  activeBadgeText: { fontFamily: "Poppins_500Medium", fontSize: 13, color: "#EAEAEA" },
  resultCount: { fontFamily: "Poppins_400Regular", fontSize: 13, color: "rgba(234, 234, 234, 0.5)" },

  /* Section */
  section: { marginBottom: 24 },
  sectionTitle: { fontFamily: "Poppins_600SemiBold", fontSize: 16, color: "#EAEAEA", marginBottom: 12 },

  /* Recent */
  recentList: { gap: 8 },
  recentRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", height: 44, paddingHorizontal: 16, borderRadius: 12, backgroundColor: "#2E1C2B" },
  recentLeft: { flexDirection: "row", alignItems: "center", gap: 12, flex: 1 },
  recentText: { fontFamily: "Poppins_400Regular", fontSize: 14, color: "rgba(234, 234, 234, 0.7)" },

  /* Categories */
  categoriesGrid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  categoryCard: { width: "48%", height: 60, borderRadius: 12, backgroundColor: "#2E1C2B", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8 },
  categoryIcon: { fontSize: 24 },
  categoryName: { fontFamily: "Poppins_500Medium", fontSize: 14, color: "#EAEAEA" },

  /* Suggestions */
  suggestionsScroll: { gap: 12 },
  suggestionCard: { width: 160, borderRadius: 12, overflow: "hidden", borderWidth: 1, borderColor: "rgba(234, 234, 234, 0.08)" },
  suggestionImage: { width: 160, height: 90 },
  suggestionInfo: { backgroundColor: "#2E1C2B", padding: 10 },
  suggestionName: { fontFamily: "Poppins_600SemiBold", fontSize: 12, color: "#EAEAEA", marginBottom: 4 },
  suggestionPrice: { fontFamily: "Poppins_400Regular", fontSize: 11, color: "rgba(234, 234, 234, 0.6)" },

  /* Results */
  resultsList: { gap: 12 },
  resultCard: { flexDirection: "row", backgroundColor: "#2E1C2B", borderRadius: 12, overflow: "hidden", borderWidth: 1, borderColor: "rgba(234, 234, 234, 0.08)" },
  resultImage: { width: 110, height: 110 },
  resultInfo: { flex: 1, padding: 12, justifyContent: "center" },
  resultTypeBadge: { alignSelf: "flex-start", backgroundColor: "rgba(74, 25, 66, 0.3)", paddingHorizontal: 8, paddingVertical: 2, borderRadius: 999, marginBottom: 6 },
  resultTypeText: { fontFamily: "Poppins_500Medium", fontSize: 10, color: "#4A1942" },
  resultTitle: { fontFamily: "Poppins_600SemiBold", fontSize: 15, color: "#EAEAEA", marginBottom: 4 },
  resultSubtitle: { fontFamily: "Poppins_400Regular", fontSize: 12, color: "rgba(234, 234, 234, 0.6)", marginBottom: 6 },
  resultPriceRow: { flexDirection: "row", alignItems: "baseline" },
  resultPrice: { fontFamily: "Poppins_600SemiBold", fontSize: 16, color: "#EAEAEA" },
  resultPriceUnit: { fontFamily: "Poppins_400Regular", fontSize: 12, color: "rgba(234, 234, 234, 0.5)" },
  resultRatingRow: { flexDirection: "row", alignItems: "center", gap: 4 },
  resultRating: { fontFamily: "Poppins_600SemiBold", fontSize: 13, color: "#EAEAEA" },

  /* No results */
  noResults: { alignItems: "center", paddingVertical: 48 },
  noResultsEmoji: { fontSize: 40, marginBottom: 12 },
  noResultsTitle: { fontFamily: "Poppins_600SemiBold", fontSize: 17, color: "#EAEAEA", marginBottom: 8 },
  noResultsText: { fontFamily: "Poppins_400Regular", fontSize: 14, color: "rgba(234, 234, 234, 0.5)" },
});
