import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Modal,
  Pressable,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ArrowLeft,
  Search as SearchIcon,
  Clock,
  X,
  Star,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Check,
  AlertCircle,
  MapPin,
} from "lucide-react-native";
import {
  vehicles,
  agencies,
  vehicleImages,
  cities,
} from "@/data/mockData";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const MONTHS = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];
const SHORT_MONTHS = ["Jan","Fév","Mars","Avr","Mai","Juin","Juil","Août","Sep","Oct","Nov","Déc"];
const DAYS_OF_WEEK = ["Lu","Ma","Me","Je","Ve","Sa","Di"];
const HOURS = ["08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00"];

function getDaysInMonth(y: number, m: number) { return new Date(y, m + 1, 0).getDate(); }
function getFirstDayOfMonth(y: number, m: number) { const d = new Date(y, m, 1).getDay(); return d === 0 ? 6 : d - 1; }
function formatDateShort(d: Date) { return `${d.getDate()} ${SHORT_MONTHS[d.getMonth()]}`; }
function daysBetween(a: Date, b: Date) { return Math.round((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24)); }
function isSameDay(a: Date, b: Date) { return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate(); }
function isBetween(d: Date, s: Date, e: Date) { return d.getTime() > s.getTime() && d.getTime() < e.getTime(); }

// Simulate unavailability: vehicles with even IDs are unavailable for certain date ranges
function isVehicleUnavailable(vehicleId: string, start: Date, end: Date): boolean {
  const id = Number(vehicleId);
  // IDs 2 and 5 unavailable for June dates
  if ((id === 2 || id === 5) && start.getMonth() === 5) return true;
  // ID 4 unavailable if rental > 4 days
  if (id === 4 && daysBetween(start, end) > 4) return true;
  return false;
}

function getUnavailabilityReason(vehicleId: string, start: Date, end: Date): string {
  const id = Number(vehicleId);
  if ((id === 2 || id === 5) && start.getMonth() === 5) return "Indisponible en Juin — déjà réservé";
  if (id === 4 && daysBetween(start, end) > 4) return "Durée max. 4 jours pour ce véhicule";
  return "";
}

const initialRecentSearches = ["Porsche 911", "Monaco Premium Fleet", "SUV Nice"];

interface PopularCategory { name: string; icon: string; filter: string; }
const popularCategories: PopularCategory[] = [
  { name: "Sportives", icon: "🏎️", filter: "Sportive" },
  { name: "SUV", icon: "🚙", filter: "SUV" },
  { name: "Berlines", icon: "🚗", filter: "Berline" },
  { name: "Cabriolets", icon: "🚗", filter: "Cabriolet" },
  { name: "Électriques", icon: "⚡", filter: "Électrique" },
  { name: "Avec chauffeur", icon: "👔", filter: "chauffeur" },
];

// Extended city list for autocomplete
const ALL_CITIES = [
  { name: "Nice", region: "Côte d'Azur" },
  { name: "Cannes", region: "Côte d'Azur" },
  { name: "Monaco", region: "Principauté" },
  { name: "Antibes", region: "Côte d'Azur" },
  { name: "Marseille", region: "Provence" },
  { name: "Paris", region: "Île-de-France" },
  { name: "Lyon", region: "Rhône-Alpes" },
  { name: "Bordeaux", region: "Nouvelle-Aquitaine" },
  { name: "Toulouse", region: "Occitanie" },
  { name: "Montpellier", region: "Occitanie" },
  { name: "Saint-Tropez", region: "Côte d'Azur" },
  { name: "Menton", region: "Côte d'Azur" },
  { name: "Grasse", region: "Côte d'Azur" },
  { name: "Aix-en-Provence", region: "Provence" },
];

/* ─── City Autocomplete Modal ─── */
function CityAutocompleteModal({
  visible,
  selected,
  onSelect,
  onClose,
}: {
  visible: boolean;
  selected: string;
  onSelect: (city: string) => void;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const cityInputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (visible) {
      setQuery("");
      setTimeout(() => cityInputRef.current?.focus(), 200);
    }
  }, [visible]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return ALL_CITIES;
    return ALL_CITIES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.region.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <Modal visible={visible} transparent animationType="slide">
      <Pressable style={cityStyles.overlay} onPress={onClose}>
        <Pressable style={cityStyles.sheet} onPress={() => {}}>
          <View style={cityStyles.dragHandle} />
          <View style={cityStyles.header}>
            <Text style={cityStyles.title}>Localisation</Text>
            <TouchableOpacity onPress={onClose} activeOpacity={0.7}>
              <X size={24} color="#EAEAEA" strokeWidth={1.5} />
            </TouchableOpacity>
          </View>

          {/* Search input */}
          <View style={cityStyles.inputWrapper}>
            <SearchIcon size={18} color="rgba(234, 234, 234, 0.5)" strokeWidth={1.5} />
            <TextInput
              ref={cityInputRef}
              value={query}
              onChangeText={setQuery}
              placeholder="Rechercher une ville..."
              placeholderTextColor="rgba(234, 234, 234, 0.4)"
              style={cityStyles.input}
              returnKeyType="search"
            />
            {query.length > 0 && (
              <TouchableOpacity onPress={() => setQuery("")} activeOpacity={0.7}>
                <X size={16} color="rgba(234, 234, 234, 0.4)" strokeWidth={1.5} />
              </TouchableOpacity>
            )}
          </View>

          {/* Results */}
          <ScrollView style={cityStyles.listScroll} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
            {filtered.length > 0 ? (
              <View style={cityStyles.list}>
                {filtered.map((city) => {
                  const isSel = selected === city.name;
                  return (
                    <TouchableOpacity
                      key={city.name}
                      style={[cityStyles.row, isSel && cityStyles.rowSelected]}
                      activeOpacity={0.7}
                      onPress={() => onSelect(city.name)}
                    >
                      <View style={cityStyles.rowLeft}>
                        <View style={[cityStyles.iconCircle, isSel && cityStyles.iconCircleActive]}>
                          <MapPin size={16} color={isSel ? "#EAEAEA" : "rgba(234, 234, 234, 0.5)"} strokeWidth={1.5} />
                        </View>
                        <View>
                          <Text style={[cityStyles.cityName, isSel && cityStyles.cityNameSelected]}>
                            {city.name}
                          </Text>
                          <Text style={cityStyles.regionName}>{city.region}, France</Text>
                        </View>
                      </View>
                      {isSel && <Check size={18} color="#4A1942" strokeWidth={2} />}
                    </TouchableOpacity>
                  );
                })}
              </View>
            ) : (
              <View style={cityStyles.empty}>
                <Text style={cityStyles.emptyText}>Aucune ville trouvée</Text>
              </View>
            )}
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const cityStyles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: "rgba(0, 0, 0, 0.6)", justifyContent: "flex-end" },
  sheet: { backgroundColor: "#0d0a0c", borderTopLeftRadius: 24, borderTopRightRadius: 24, maxHeight: "80%", paddingBottom: 32 },
  dragHandle: { width: 40, height: 4, borderRadius: 2, backgroundColor: "rgba(234, 234, 234, 0.3)", alignSelf: "center", marginTop: 12, marginBottom: 20 },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, marginBottom: 16 },
  title: { fontFamily: "Poppins_600SemiBold", fontSize: 18, color: "#EAEAEA" },

  inputWrapper: { marginHorizontal: 20, height: 48, borderRadius: 12, backgroundColor: "#2E1C2B", borderWidth: 1, borderColor: "rgba(234, 234, 234, 0.1)", flexDirection: "row", alignItems: "center", paddingHorizontal: 14, gap: 10, marginBottom: 16 },
  input: { flex: 1, fontFamily: "Poppins_400Regular", fontSize: 15, color: "#EAEAEA", height: 48 },

  listScroll: { maxHeight: 350 },
  list: { paddingHorizontal: 20, gap: 4 },
  row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 12, paddingVertical: 12, borderRadius: 12 },
  rowSelected: { backgroundColor: "rgba(74, 25, 66, 0.15)" },
  rowLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  iconCircle: { width: 36, height: 36, borderRadius: 18, backgroundColor: "rgba(234, 234, 234, 0.06)", alignItems: "center", justifyContent: "center" },
  iconCircleActive: { backgroundColor: "#4A1942" },
  cityName: { fontFamily: "Poppins_500Medium", fontSize: 15, color: "rgba(234, 234, 234, 0.8)" },
  cityNameSelected: { color: "#EAEAEA" },
  regionName: { fontFamily: "Poppins_400Regular", fontSize: 12, color: "rgba(234, 234, 234, 0.4)", marginTop: 2 },

  empty: { alignItems: "center", paddingVertical: 32 },
  emptyText: { fontFamily: "Poppins_400Regular", fontSize: 14, color: "rgba(234, 234, 234, 0.4)" },
});

interface SearchResult {
  type: "vehicle" | "agency";
  id: string;
  title: string;
  subtitle: string;
  imageUri?: string;
  price?: number;
  rating?: number;
  unavailable?: boolean;
  unavailableReason?: string;
}

export default function SearchScreen() {
  const router = useRouter();
  const inputRef = useRef<TextInput>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searches, setSearches] = useState(initialRecentSearches);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  // Date & time filters
  const [startDate, setStartDate] = useState(new Date(2026, 5, 12));
  const [endDate, setEndDate] = useState(new Date(2026, 5, 15));
  const [pickupTime, setPickupTime] = useState("10:00");
  const [returnTime, setReturnTime] = useState("18:00");
  const [datesSelected, setDatesSelected] = useState(false);

  // Modal states
  const [showDateModal, setShowDateModal] = useState(false);
  const [showTimeModal, setShowTimeModal] = useState<"pickup" | "return" | null>(null);
  const [selectedCity, setSelectedCity] = useState("Nice");
  const [showCityModal, setShowCityModal] = useState(false);
  const [calMonth, setCalMonth] = useState(5);
  const [calYear, setCalYear] = useState(2026);
  const [selectingEnd, setSelectingEnd] = useState(false);
  const [tempStart, setTempStart] = useState(new Date(2026, 5, 12));
  const [tempEnd, setTempEnd] = useState(new Date(2026, 5, 15));

  useEffect(() => {
    const timer = setTimeout(() => inputRef.current?.focus(), 100);
    return () => clearTimeout(timer);
  }, []);

  const results = useMemo(() => {
    const out: SearchResult[] = [];
    const q = searchQuery.toLowerCase().trim();

    if (categoryFilter) {
      vehicles.forEach((v, i) => {
        const match = categoryFilter === "chauffeur" ? v.chauffeurAvailable : v.category.toLowerCase() === categoryFilter.toLowerCase();
        if (match) {
          const unavailable = datesSelected && isVehicleUnavailable(v.id, startDate, endDate);
          out.push({ type: "vehicle", id: v.id, title: v.name, subtitle: `${v.year} • ${v.transmission} • ${v.fuel}`, imageUri: vehicleImages[i], price: v.price, unavailable, unavailableReason: unavailable ? getUnavailabilityReason(v.id, startDate, endDate) : undefined });
        }
      });
    } else if (q) {
      vehicles.forEach((v, i) => {
        if (v.name.toLowerCase().includes(q) || v.category.toLowerCase().includes(q) || v.fuel.toLowerCase().includes(q) || v.agencyName.toLowerCase().includes(q)) {
          const unavailable = datesSelected && isVehicleUnavailable(v.id, startDate, endDate);
          out.push({ type: "vehicle", id: v.id, title: v.name, subtitle: `${v.year} • ${v.transmission} • ${v.fuel}`, imageUri: vehicleImages[i], price: v.price, unavailable, unavailableReason: unavailable ? getUnavailabilityReason(v.id, startDate, endDate) : undefined });
        }
      });
      agencies.forEach((a, i) => {
        if (a.name.toLowerCase().includes(q) || a.city.toLowerCase().includes(q)) {
          out.push({ type: "agency", id: a.id, title: a.name, subtitle: `${a.city} — ${a.vehicles} véhicules`, imageUri: vehicleImages[i % vehicleImages.length], rating: a.rating });
        }
      });
    }
    // Sort: available first, unavailable last
    out.sort((a, b) => (a.unavailable ? 1 : 0) - (b.unavailable ? 1 : 0));
    return out;
  }, [searchQuery, categoryFilter, datesSelected, startDate, endDate]);

  const isSearching = searchQuery.length > 0 || categoryFilter !== null;

  // Calendar helpers
  const openDateModal = useCallback(() => {
    setTempStart(startDate); setTempEnd(endDate); setSelectingEnd(false);
    setCalMonth(startDate.getMonth()); setCalYear(startDate.getFullYear());
    setShowDateModal(true);
  }, [startDate, endDate]);

  const handleDayPress = useCallback((day: number) => {
    const selected = new Date(calYear, calMonth, day);
    const today = new Date(); today.setHours(0, 0, 0, 0);
    if (selected < today) return;
    if (!selectingEnd) { setTempStart(selected); setTempEnd(selected); setSelectingEnd(true); }
    else { if (selected <= tempStart) { setTempStart(selected); setSelectingEnd(true); } else { setTempEnd(selected); setSelectingEnd(false); } }
  }, [calYear, calMonth, selectingEnd, tempStart]);

  const confirmDates = useCallback(() => {
    if (tempEnd > tempStart) { setStartDate(tempStart); setEndDate(tempEnd); setDatesSelected(true); }
    setShowDateModal(false);
  }, [tempStart, tempEnd]);

  const prevMonth = () => { if (calMonth === 0) { setCalMonth(11); setCalYear(calYear - 1); } else setCalMonth(calMonth - 1); };
  const nextMonth = () => { if (calMonth === 11) { setCalMonth(0); setCalYear(calYear + 1); } else setCalMonth(calMonth + 1); };

  const daysInMonth = getDaysInMonth(calYear, calMonth);
  const firstDay = getFirstDayOfMonth(calYear, calMonth);
  const calendarDays = Array.from({ length: firstDay }, () => 0).concat(Array.from({ length: daysInMonth }, (_, i) => i + 1));

  const dateLabel = datesSelected ? `${formatDateShort(startDate)} — ${formatDateShort(endDate)}` : "Choisir les dates";
  const timeLabel = `${pickupTime} — ${returnTime}`;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        {/* ─── Header ─── */}
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <ArrowLeft size={24} color="#EAEAEA" strokeWidth={1.5} />
          </TouchableOpacity>
          <View style={styles.searchInputWrapper}>
            <SearchIcon size={20} color="rgba(234, 234, 234, 0.6)" strokeWidth={1.5} />
            <TextInput ref={inputRef} value={categoryFilter ? "" : searchQuery} onChangeText={(t) => { setSearchQuery(t); setCategoryFilter(null); }} placeholder={categoryFilter ? `Catégorie: ${categoryFilter}` : "Nom du véhicule..."} placeholderTextColor="rgba(234, 234, 234, 0.4)" style={styles.searchInput} returnKeyType="search" />
            {isSearching && <TouchableOpacity onPress={() => { setSearchQuery(""); setCategoryFilter(null); }} activeOpacity={0.7}><X size={18} color="rgba(234, 234, 234, 0.5)" strokeWidth={1.5} /></TouchableOpacity>}
          </View>
        </View>

        {/* ─── Date & Time Filter Bar ─── */}
        {/* ─── Filter Bar ─── */}
        <TouchableOpacity style={[styles.locationBtn, styles.filterBtnActive]} activeOpacity={0.85} onPress={() => setShowCityModal(true)}>
          <MapPin size={16} color="#EAEAEA" strokeWidth={1.5} />
          <Text style={styles.filterBtnTextActive}>{selectedCity}, France</Text>
        </TouchableOpacity>
        <View style={styles.filterBar}>
          <TouchableOpacity style={[styles.filterBtn, datesSelected && styles.filterBtnActive]} activeOpacity={0.85} onPress={openDateModal}>
            <Calendar size={16} color={datesSelected ? "#EAEAEA" : "rgba(234, 234, 234, 0.5)"} strokeWidth={1.5} />
            <Text style={[styles.filterBtnText, datesSelected && styles.filterBtnTextActive]} numberOfLines={1}>{dateLabel}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.filterBtn, datesSelected && styles.filterBtnActive]} activeOpacity={0.85} onPress={() => setShowTimeModal("pickup")}>
            <Clock size={16} color={datesSelected ? "#EAEAEA" : "rgba(234, 234, 234, 0.5)"} strokeWidth={1.5} />
            <Text style={[styles.filterBtnText, datesSelected && styles.filterBtnTextActive]}>{timeLabel}</Text>
          </TouchableOpacity>
        </View>

        {/* ─── Category Badge ─── */}
        {categoryFilter && (
          <View style={styles.activeBadgeRow}>
            <View style={styles.activeBadge}><Text style={styles.activeBadgeText}>{categoryFilter}</Text><TouchableOpacity onPress={() => setCategoryFilter(null)} activeOpacity={0.7}><X size={14} color="#EAEAEA" strokeWidth={2} /></TouchableOpacity></View>
            <Text style={styles.resultCount}>{results.length} résultat{results.length !== 1 ? "s" : ""}</Text>
          </View>
        )}

        {/* ─── Results ─── */}
        {isSearching && (
          <View style={styles.section}>
            {results.length > 0 ? (
              <View style={styles.resultsList}>
                {results.map((result) => (
                  <TouchableOpacity
                    key={`${result.type}-${result.id}`}
                    style={[styles.resultCard, result.unavailable && styles.resultCardUnavailable]}
                    activeOpacity={result.unavailable ? 1 : 0.85}
                    onPress={() => !result.unavailable && (result.type === "vehicle" ? router.push(`/vehicle/${result.id}` as any) : router.push(`/agency/${result.id}` as any))}
                  >
                    <View style={styles.resultImageWrapper}>
                      <Image source={{ uri: result.imageUri }} style={[styles.resultImage, result.unavailable && styles.resultImageGrayed]} />
                      {result.unavailable && (
                        <View style={styles.unavailableOverlay}>
                          <AlertCircle size={20} color="#E74C3C" strokeWidth={1.5} />
                        </View>
                      )}
                    </View>
                    <View style={styles.resultInfo}>
                      <View style={styles.resultTypeBadge}>
                        <Text style={styles.resultTypeText}>{result.type === "vehicle" ? "Véhicule" : "Agence"}</Text>
                      </View>
                      <Text style={[styles.resultTitle, result.unavailable && styles.resultTitleGrayed]} numberOfLines={1}>{result.title}</Text>
                      <Text style={styles.resultSubtitle} numberOfLines={1}>{result.subtitle}</Text>
                      {result.unavailable ? (
                        <View style={styles.unavailableBadge}>
                          <Text style={styles.unavailableBadgeText}>{result.unavailableReason}</Text>
                        </View>
                      ) : (
                        <>
                          {result.price != null && <View style={styles.resultPriceRow}><Text style={styles.resultPrice}>{result.price} €</Text><Text style={styles.resultPriceUnit}> / jour</Text></View>}
                          {result.rating != null && <View style={styles.resultRatingRow}><Star size={12} fill="#F1C40F" color="#F1C40F" strokeWidth={1.5} /><Text style={styles.resultRating}>{result.rating}</Text></View>}
                        </>
                      )}
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            ) : (
              <View style={styles.noResults}><Text style={styles.noResultsEmoji}>🔍</Text><Text style={styles.noResultsTitle}>Aucun résultat</Text><Text style={styles.noResultsText}>Essayez un autre terme de recherche</Text></View>
            )}
          </View>
        )}

        {/* ─── Default: recents + categories + suggestions ─── */}
        {!isSearching && (
          <>
            {searches.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Recherches récentes</Text>
                <View style={styles.recentList}>
                  {searches.map((s) => (
                    <View key={s} style={styles.recentRow}>
                      <TouchableOpacity style={styles.recentLeft} activeOpacity={0.7} onPress={() => { setSearchQuery(s); setCategoryFilter(null); }}><Clock size={18} color="rgba(234, 234, 234, 0.4)" strokeWidth={1.5} /><Text style={styles.recentText}>{s}</Text></TouchableOpacity>
                      <TouchableOpacity onPress={() => setSearches((p) => p.filter((x) => x !== s))} activeOpacity={0.7} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}><X size={18} color="rgba(234, 234, 234, 0.4)" strokeWidth={1.5} /></TouchableOpacity>
                    </View>
                  ))}
                </View>
              </View>
            )}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Catégories populaires</Text>
              <View style={styles.categoriesGrid}>
                {popularCategories.map((c) => (
                  <TouchableOpacity key={c.name} style={styles.categoryCard} activeOpacity={0.85} onPress={() => { setCategoryFilter(c.filter); setSearchQuery(""); }}>
                    <Text style={styles.categoryIcon}>{c.icon}</Text><Text style={styles.categoryName}>{c.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Suggestions</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.suggestionsScroll}>
                {vehicles.slice(0, 4).map((v, i) => (
                  <TouchableOpacity key={v.id} style={styles.suggestionCard} activeOpacity={0.85} onPress={() => router.push(`/vehicle/${v.id}` as any)}>
                    <Image source={{ uri: vehicleImages[i] }} style={styles.suggestionImage} />
                    <View style={styles.suggestionInfo}><Text style={styles.suggestionName} numberOfLines={1}>{v.name}</Text><Text style={styles.suggestionPrice}>{v.price} € / jour</Text></View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </>
        )}
      </ScrollView>

      {/* ═══ Date Modal ═══ */}
      <Modal visible={showDateModal} transparent animationType="slide">
        <Pressable style={styles.modalOverlay} onPress={() => setShowDateModal(false)}>
          <Pressable style={styles.modalSheet} onPress={() => {}}>
            <View style={styles.modalDragHandle} />
            <View style={styles.modalHeader}><Text style={styles.modalTitle}>Choisir les dates</Text><TouchableOpacity onPress={() => setShowDateModal(false)} activeOpacity={0.7}><X size={24} color="#EAEAEA" strokeWidth={1.5} /></TouchableOpacity></View>
            <View style={styles.calSummary}>
              <View style={styles.calSummaryItem}><Text style={styles.calSummaryLabel}>Début</Text><Text style={styles.calSummaryValue}>{formatDateShort(tempStart)}</Text></View>
              <View style={styles.calSummaryDivider} />
              <View style={styles.calSummaryItem}><Text style={styles.calSummaryLabel}>Fin</Text><Text style={styles.calSummaryValue}>{tempEnd > tempStart ? formatDateShort(tempEnd) : "—"}</Text></View>
              <View style={styles.calSummaryDivider} />
              <View style={styles.calSummaryItem}><Text style={styles.calSummaryLabel}>Durée</Text><Text style={styles.calSummaryValue}>{tempEnd > tempStart ? `${daysBetween(tempStart, tempEnd)}j` : "—"}</Text></View>
            </View>
            <View style={styles.calMonthNav}>
              <TouchableOpacity onPress={prevMonth} activeOpacity={0.7} style={styles.calNavBtn}><ChevronLeft size={20} color="#EAEAEA" strokeWidth={1.5} /></TouchableOpacity>
              <Text style={styles.calMonthLabel}>{MONTHS[calMonth]} {calYear}</Text>
              <TouchableOpacity onPress={nextMonth} activeOpacity={0.7} style={styles.calNavBtn}><ChevronRight size={20} color="#EAEAEA" strokeWidth={1.5} /></TouchableOpacity>
            </View>
            <View style={styles.calWeekRow}>{DAYS_OF_WEEK.map((d) => <Text key={d} style={styles.calWeekDay}>{d}</Text>)}</View>
            <View style={styles.calGrid}>
              {calendarDays.map((day, i) => {
                if (day === 0) return <View key={`e-${i}`} style={styles.calCell} />;
                const date = new Date(calYear, calMonth, day);
                const today = new Date(); today.setHours(0, 0, 0, 0);
                const isPast = date < today;
                const isStart = isSameDay(date, tempStart);
                const isEnd = tempEnd > tempStart && isSameDay(date, tempEnd);
                const inRange = tempEnd > tempStart && isBetween(date, tempStart, tempEnd);
                return (
                  <TouchableOpacity key={`d-${day}`} style={[styles.calCell, inRange && styles.calCellRange, (isStart || isEnd) && styles.calCellSelected]} activeOpacity={isPast ? 1 : 0.7} onPress={() => !isPast && handleDayPress(day)}>
                    <Text style={[styles.calDayText, isPast && styles.calDayPast, (isStart || isEnd) && styles.calDaySelected, inRange && styles.calDayRange]}>{day}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <View style={styles.calFooter}>
              <TouchableOpacity style={styles.confirmBtn} activeOpacity={0.85} onPress={confirmDates}><Text style={styles.confirmBtnText}>Confirmer</Text></TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      </Modal>

      {/* ═══ Time Modal ═══ */}
      <Modal visible={showTimeModal !== null} transparent animationType="slide">
        <Pressable style={styles.modalOverlay} onPress={() => setShowTimeModal(null)}>
          <Pressable style={styles.modalSheet} onPress={() => {}}>
            <View style={styles.modalDragHandle} />
            <View style={styles.modalHeader}><Text style={styles.modalTitle}>{showTimeModal === "pickup" ? "Heure de prise en charge" : "Heure de retour"}</Text><TouchableOpacity onPress={() => setShowTimeModal(null)} activeOpacity={0.7}><X size={24} color="#EAEAEA" strokeWidth={1.5} /></TouchableOpacity></View>
            <View style={styles.timeGrid}>
              {HOURS.map((h) => {
                const sel = showTimeModal === "pickup" ? pickupTime === h : returnTime === h;
                return (
                  <TouchableOpacity key={h} style={[styles.timeChip, sel && styles.timeChipSelected]} activeOpacity={0.7} onPress={() => {
                    if (showTimeModal === "pickup") { setPickupTime(h); setShowTimeModal("return"); }
                    else { setReturnTime(h); setShowTimeModal(null); }
                  }}><Text style={[styles.timeChipText, sel && styles.timeChipTextSelected]}>{h}</Text></TouchableOpacity>
                );
              })}
            </View>
          </Pressable>
        </Pressable>
      </Modal>

      {/* ═══ City Modal with Autocomplete ═══ */}
      <CityAutocompleteModal
        visible={showCityModal}
        selected={selectedCity}
        onSelect={(city) => { setSelectedCity(city); setShowCityModal(false); }}
        onClose={() => setShowCityModal(false)}
      />
    </SafeAreaView>
  );
}

const CELL_SIZE = (SCREEN_WIDTH - 80) / 7;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#050404" },
  scrollContent: { paddingHorizontal: 20, paddingTop: 32, paddingBottom: 40 },

  headerRow: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 16 },
  searchInputWrapper: { flex: 1, height: 52, borderRadius: 26, backgroundColor: "#2E1C2B", borderWidth: 1, borderColor: "rgba(234, 234, 234, 0.1)", flexDirection: "row", alignItems: "center", paddingHorizontal: 16, gap: 12 },
  searchInput: { flex: 1, fontFamily: "Poppins_400Regular", fontSize: 15, color: "#EAEAEA", height: 52 },

  /* Filter bar */
  locationBtn: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, height: 40, borderRadius: 12, backgroundColor: "#2E1C2B", borderWidth: 1, borderColor: "rgba(234, 234, 234, 0.1)", marginBottom: 10 },
  filterBar: { flexDirection: "row", gap: 8, marginBottom: 20 },
  filterBtn: { flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6, height: 40, borderRadius: 12, backgroundColor: "#2E1C2B", borderWidth: 1, borderColor: "rgba(234, 234, 234, 0.1)" },
  filterBtnActive: { backgroundColor: "rgba(74, 25, 66, 0.3)", borderColor: "#4A1942" },
  filterBtnText: { fontFamily: "Poppins_500Medium", fontSize: 12, color: "rgba(234, 234, 234, 0.5)" },
  filterBtnTextActive: { color: "#EAEAEA" },

  activeBadgeRow: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 16 },
  activeBadge: { flexDirection: "row", alignItems: "center", gap: 8, backgroundColor: "#4A1942", paddingHorizontal: 14, paddingVertical: 6, borderRadius: 999 },
  activeBadgeText: { fontFamily: "Poppins_500Medium", fontSize: 13, color: "#EAEAEA" },
  resultCount: { fontFamily: "Poppins_400Regular", fontSize: 13, color: "rgba(234, 234, 234, 0.5)" },

  section: { marginBottom: 24 },
  sectionTitle: { fontFamily: "Poppins_600SemiBold", fontSize: 16, color: "#EAEAEA", marginBottom: 12 },

  recentList: { gap: 8 },
  recentRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", height: 44, paddingHorizontal: 16, borderRadius: 12, backgroundColor: "#2E1C2B" },
  recentLeft: { flexDirection: "row", alignItems: "center", gap: 12, flex: 1 },
  recentText: { fontFamily: "Poppins_400Regular", fontSize: 14, color: "rgba(234, 234, 234, 0.7)" },

  categoriesGrid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  categoryCard: { width: "48%", height: 60, borderRadius: 12, backgroundColor: "#2E1C2B", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8 },
  categoryIcon: { fontSize: 24 },
  categoryName: { fontFamily: "Poppins_500Medium", fontSize: 14, color: "#EAEAEA" },

  suggestionsScroll: { gap: 12 },
  suggestionCard: { width: 160, borderRadius: 12, overflow: "hidden", borderWidth: 1, borderColor: "rgba(234, 234, 234, 0.08)" },
  suggestionImage: { width: 160, height: 90 },
  suggestionInfo: { backgroundColor: "#2E1C2B", padding: 10 },
  suggestionName: { fontFamily: "Poppins_600SemiBold", fontSize: 12, color: "#EAEAEA", marginBottom: 4 },
  suggestionPrice: { fontFamily: "Poppins_400Regular", fontSize: 11, color: "rgba(234, 234, 234, 0.6)" },

  /* Results */
  resultsList: { gap: 12 },
  resultCard: { flexDirection: "row", backgroundColor: "#2E1C2B", borderRadius: 12, overflow: "hidden", borderWidth: 1, borderColor: "rgba(234, 234, 234, 0.08)" },
  resultCardUnavailable: { opacity: 0.55, borderColor: "rgba(231, 76, 60, 0.2)" },
  resultImageWrapper: { position: "relative" },
  resultImage: { width: 110, height: 120 },
  resultImageGrayed: { opacity: 0.4 },
  unavailableOverlay: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, alignItems: "center", justifyContent: "center", backgroundColor: "rgba(0,0,0,0.3)" },
  resultInfo: { flex: 1, padding: 12, justifyContent: "center" },
  resultTypeBadge: { alignSelf: "flex-start", backgroundColor: "rgba(74, 25, 66, 0.3)", paddingHorizontal: 8, paddingVertical: 2, borderRadius: 999, marginBottom: 4 },
  resultTypeText: { fontFamily: "Poppins_500Medium", fontSize: 10, color: "#4A1942" },
  resultTitle: { fontFamily: "Poppins_600SemiBold", fontSize: 15, color: "#EAEAEA", marginBottom: 2 },
  resultTitleGrayed: { color: "rgba(234, 234, 234, 0.5)" },
  resultSubtitle: { fontFamily: "Poppins_400Regular", fontSize: 12, color: "rgba(234, 234, 234, 0.6)", marginBottom: 6 },
  resultPriceRow: { flexDirection: "row", alignItems: "baseline" },
  resultPrice: { fontFamily: "Poppins_600SemiBold", fontSize: 16, color: "#EAEAEA" },
  resultPriceUnit: { fontFamily: "Poppins_400Regular", fontSize: 12, color: "rgba(234, 234, 234, 0.5)" },
  resultRatingRow: { flexDirection: "row", alignItems: "center", gap: 4 },
  resultRating: { fontFamily: "Poppins_600SemiBold", fontSize: 13, color: "#EAEAEA" },

  /* Unavailable badge */
  unavailableBadge: { backgroundColor: "rgba(231, 76, 60, 0.12)", paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, alignSelf: "flex-start" },
  unavailableBadgeText: { fontFamily: "Poppins_500Medium", fontSize: 10, color: "#E74C3C", lineHeight: 14 },

  noResults: { alignItems: "center", paddingVertical: 48 },
  noResultsEmoji: { fontSize: 40, marginBottom: 12 },
  noResultsTitle: { fontFamily: "Poppins_600SemiBold", fontSize: 17, color: "#EAEAEA", marginBottom: 8 },
  noResultsText: { fontFamily: "Poppins_400Regular", fontSize: 14, color: "rgba(234, 234, 234, 0.5)" },

  /* Modal */
  modalOverlay: { flex: 1, backgroundColor: "rgba(0, 0, 0, 0.6)", justifyContent: "flex-end" },
  modalSheet: { backgroundColor: "#0d0a0c", borderTopLeftRadius: 24, borderTopRightRadius: 24, paddingBottom: 32 },
  modalDragHandle: { width: 40, height: 4, borderRadius: 2, backgroundColor: "rgba(234, 234, 234, 0.3)", alignSelf: "center", marginTop: 12, marginBottom: 20 },
  modalHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, marginBottom: 16 },
  modalTitle: { fontFamily: "Poppins_600SemiBold", fontSize: 18, color: "#EAEAEA" },

  calSummary: { flexDirection: "row", marginHorizontal: 20, backgroundColor: "#2E1C2B", borderRadius: 12, padding: 16, marginBottom: 20 },
  calSummaryItem: { flex: 1, alignItems: "center" },
  calSummaryLabel: { fontFamily: "Poppins_400Regular", fontSize: 11, color: "rgba(234, 234, 234, 0.5)", marginBottom: 4 },
  calSummaryValue: { fontFamily: "Poppins_600SemiBold", fontSize: 15, color: "#EAEAEA" },
  calSummaryDivider: { width: 1, backgroundColor: "rgba(234, 234, 234, 0.1)" },

  calMonthNav: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, marginBottom: 16 },
  calNavBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: "rgba(234, 234, 234, 0.08)", alignItems: "center", justifyContent: "center" },
  calMonthLabel: { fontFamily: "Poppins_600SemiBold", fontSize: 16, color: "#EAEAEA" },

  calWeekRow: { flexDirection: "row", paddingHorizontal: 20, marginBottom: 8 },
  calWeekDay: { width: CELL_SIZE, textAlign: "center", fontFamily: "Poppins_500Medium", fontSize: 12, color: "rgba(234, 234, 234, 0.4)" },

  calGrid: { flexDirection: "row", flexWrap: "wrap", paddingHorizontal: 20 },
  calCell: { width: CELL_SIZE, height: CELL_SIZE, alignItems: "center", justifyContent: "center" },
  calCellRange: { backgroundColor: "rgba(74, 25, 66, 0.15)" },
  calCellSelected: { backgroundColor: "#4A1942", borderRadius: CELL_SIZE / 2 },
  calDayText: { fontFamily: "Poppins_400Regular", fontSize: 14, color: "#EAEAEA" },
  calDayPast: { color: "rgba(234, 234, 234, 0.2)" },
  calDaySelected: { fontFamily: "Poppins_600SemiBold", color: "#EAEAEA" },
  calDayRange: { color: "#EAEAEA" },

  calFooter: { paddingHorizontal: 20, paddingTop: 20 },
  confirmBtn: { height: 52, borderRadius: 12, backgroundColor: "#4A1942", alignItems: "center", justifyContent: "center" },
  confirmBtnText: { fontFamily: "Poppins_600SemiBold", fontSize: 15, color: "#EAEAEA" },

  timeGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10, paddingHorizontal: 20, paddingBottom: 8 },
  timeChip: { paddingHorizontal: 18, paddingVertical: 10, borderRadius: 10, backgroundColor: "#2E1C2B", borderWidth: 1, borderColor: "rgba(234, 234, 234, 0.1)" },
  timeChipSelected: { backgroundColor: "#4A1942", borderColor: "#4A1942" },
  timeChipText: { fontFamily: "Poppins_500Medium", fontSize: 14, color: "rgba(234, 234, 234, 0.7)" },
  timeChipTextSelected: { color: "#EAEAEA" },

});
