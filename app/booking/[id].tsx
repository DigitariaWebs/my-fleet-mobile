import { useState, useMemo, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  Modal,
  Pressable,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Home,
  Truck,
  ChevronLeft,
  ChevronRight,
  X,
  Check,
} from "lucide-react-native";
import { vehicles } from "@/data/mockData";
import { Button } from "@/components/ui/Button";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const HALF_WIDTH = (SCREEN_WIDTH - 40 - 12) / 2;

const MONTHS = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre",
];
const SHORT_MONTHS = [
  "Jan", "Fév", "Mars", "Avr", "Mai", "Juin",
  "Juil", "Août", "Sep", "Oct", "Nov", "Déc",
];
const DAYS_OF_WEEK = ["Lu", "Ma", "Me", "Je", "Ve", "Sa", "Di"];
const HOURS = [
  "08:00", "09:00", "10:00", "11:00", "12:00",
  "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00",
];

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  const d = new Date(year, month, 1).getDay();
  return d === 0 ? 6 : d - 1; // Monday-based
}

function formatDateShort(d: Date): string {
  return `${d.getDate()} ${SHORT_MONTHS[d.getMonth()]}`;
}

function daysBetween(a: Date, b: Date): number {
  return Math.round((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24));
}

function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function isBetween(d: Date, start: Date, end: Date): boolean {
  return d.getTime() > start.getTime() && d.getTime() < end.getTime();
}

export default function BookingScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const [startDate, setStartDate] = useState(new Date(2026, 5, 12));
  const [endDate, setEndDate] = useState(new Date(2026, 5, 15));
  const [pickupTime, setPickupTime] = useState("10:00");
  const [returnTime, setReturnTime] = useState("18:00");
  const [pickupMethod, setPickupMethod] = useState<"agency" | "delivery">("agency");
  const [withChauffeur, setWithChauffeur] = useState(false);

  const [showDateModal, setShowDateModal] = useState(false);
  const [showPickupTimeModal, setShowPickupTimeModal] = useState(false);
  const [showReturnTimeModal, setShowReturnTimeModal] = useState(false);

  // Calendar state
  const [calMonth, setCalMonth] = useState(startDate.getMonth());
  const [calYear, setCalYear] = useState(startDate.getFullYear());
  const [selectingEnd, setSelectingEnd] = useState(false);
  const [tempStart, setTempStart] = useState<Date>(startDate);
  const [tempEnd, setTempEnd] = useState<Date>(endDate);

  const vehicle = vehicles.find((v) => v.id === id);
  if (!vehicle) return null;

  const days = daysBetween(startDate, endDate);
  const vehicleTotal = vehicle.price * days;
  const deliveryFee = pickupMethod === "delivery" ? 50 : 0;
  const chauffeurFee = withChauffeur ? (vehicle.chauffeurPrice || 0) * days : 0;
  const total = vehicleTotal + deliveryFee + chauffeurFee;

  const dateLabel = `${formatDateShort(startDate)} — ${formatDateShort(endDate)} (${days} jour${days > 1 ? "s" : ""})`;

  // ─── Calendar helpers ───
  const openDateModal = useCallback(() => {
    setTempStart(startDate);
    setTempEnd(endDate);
    setSelectingEnd(false);
    setCalMonth(startDate.getMonth());
    setCalYear(startDate.getFullYear());
    setShowDateModal(true);
  }, [startDate, endDate]);

  const handleDayPress = useCallback((day: number) => {
    const selected = new Date(calYear, calMonth, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selected < today) return;

    if (!selectingEnd) {
      setTempStart(selected);
      setTempEnd(selected);
      setSelectingEnd(true);
    } else {
      if (selected <= tempStart) {
        setTempStart(selected);
        setSelectingEnd(true);
      } else {
        setTempEnd(selected);
        setSelectingEnd(false);
      }
    }
  }, [calYear, calMonth, selectingEnd, tempStart]);

  const confirmDates = useCallback(() => {
    if (tempEnd > tempStart) {
      setStartDate(tempStart);
      setEndDate(tempEnd);
    }
    setShowDateModal(false);
  }, [tempStart, tempEnd]);

  const prevMonth = () => {
    if (calMonth === 0) { setCalMonth(11); setCalYear(calYear - 1); }
    else setCalMonth(calMonth - 1);
  };
  const nextMonth = () => {
    if (calMonth === 11) { setCalMonth(0); setCalYear(calYear + 1); }
    else setCalMonth(calMonth + 1);
  };

  const daysInMonth = getDaysInMonth(calYear, calMonth);
  const firstDay = getFirstDayOfMonth(calYear, calMonth);
  const calendarDays = Array.from({ length: firstDay }, () => 0).concat(
    Array.from({ length: daysInMonth }, (_, i) => i + 1)
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.headerRow}>
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <ArrowLeft size={24} color="#EAEAEA" strokeWidth={1.5} />
            </TouchableOpacity>
            <Text style={styles.title}>Réservation</Text>
          </View>
          <Text style={styles.stepLabel}>1/3</Text>
        </View>

        <View style={styles.progressTrack}><View style={[styles.progressFill, { width: "33%" }]} /></View>

        {/* ─── Dates ─── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dates de location</Text>
          <TouchableOpacity style={styles.dateCard} activeOpacity={0.85} onPress={openDateModal}>
            <Calendar size={40} color="#4A1942" strokeWidth={1.5} />
            <Text style={styles.dateText}>{dateLabel}</Text>
            <Text style={styles.modifyLink}>Modifier</Text>
          </TouchableOpacity>
        </View>

        {/* ─── Time ─── */}
        <View style={styles.timeRow}>
          <View style={{ width: HALF_WIDTH }}>
            <Text style={styles.timeLabel}>Heure de prise en charge</Text>
            <TouchableOpacity style={styles.timeBox} activeOpacity={0.85} onPress={() => setShowPickupTimeModal(true)}>
              <Clock size={18} color="rgba(234, 234, 234, 0.6)" strokeWidth={1.5} />
              <Text style={styles.timeValue}>{pickupTime}</Text>
            </TouchableOpacity>
          </View>
          <View style={{ width: HALF_WIDTH }}>
            <Text style={styles.timeLabel}>Heure de retour</Text>
            <TouchableOpacity style={styles.timeBox} activeOpacity={0.85} onPress={() => setShowReturnTimeModal(true)}>
              <Clock size={18} color="rgba(234, 234, 234, 0.6)" strokeWidth={1.5} />
              <Text style={styles.timeValue}>{returnTime}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ─── Pickup ─── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mode de récupération</Text>
          <View style={styles.pickupRow}>
            <TouchableOpacity onPress={() => setPickupMethod("agency")} activeOpacity={0.85} style={[styles.pickupCard, { borderWidth: pickupMethod === "agency" ? 2 : 1, borderColor: pickupMethod === "agency" ? "#4A1942" : "rgba(234, 234, 234, 0.1)" }]}>
              <Home size={28} color={pickupMethod === "agency" ? "#4A1942" : "rgba(234, 234, 234, 0.6)"} strokeWidth={1.5} />
              <Text style={styles.pickupLabel}>En agence</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setPickupMethod("delivery")} activeOpacity={0.85} style={[styles.pickupCard, { borderWidth: pickupMethod === "delivery" ? 2 : 1, borderColor: pickupMethod === "delivery" ? "#4A1942" : "rgba(234, 234, 234, 0.1)" }]}>
              <Truck size={28} color={pickupMethod === "delivery" ? "#4A1942" : "rgba(234, 234, 234, 0.6)"} strokeWidth={1.5} />
              <Text style={styles.pickupLabel}>Livraison</Text>
              <Text style={styles.pickupExtra}>+50 €</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ─── Chauffeur ─── */}
        <View style={styles.chauffeurRow}>
          <View>
            <Text style={styles.chauffeurTitle}>Ajouter un chauffeur privé</Text>
            <Text style={styles.chauffeurPrice}>+{vehicle.chauffeurPrice} € / jour</Text>
          </View>
          <TouchableOpacity onPress={() => setWithChauffeur(!withChauffeur)} activeOpacity={0.7} style={[styles.toggle, { backgroundColor: withChauffeur ? "#4A1942" : "rgba(234, 234, 234, 0.15)" }]}>
            <View style={[styles.toggleThumb, { left: withChauffeur ? 24 : 4 }]} />
          </TouchableOpacity>
        </View>

        {/* ─── Summary ─── */}
        <View style={styles.summaryCard}>
          <Text style={styles.sectionTitle}>Récapitulatif</Text>
          <View style={styles.summaryVehicle}>
            <View style={styles.summaryThumb} />
            <View>
              <Text style={styles.summaryVehicleName}>{vehicle.name}</Text>
              <Text style={styles.summaryAgency}>{vehicle.agencyName}</Text>
            </View>
          </View>
          <View style={styles.lineItems}>
            <View style={styles.lineItem}><Text style={styles.lineItemLabel}>Location ({days} jour{days > 1 ? "s" : ""})</Text><Text style={styles.lineItemValue}>{vehicleTotal} €</Text></View>
            {deliveryFee > 0 && <View style={styles.lineItem}><Text style={styles.lineItemLabel}>Livraison à domicile</Text><Text style={styles.lineItemValue}>{deliveryFee} €</Text></View>}
            {chauffeurFee > 0 && <View style={styles.lineItem}><Text style={styles.lineItemLabel}>Chauffeur ({days} jour{days > 1 ? "s" : ""})</Text><Text style={styles.lineItemValue}>{chauffeurFee} €</Text></View>}
          </View>
          <View style={styles.totalRow}><Text style={styles.totalLabel}>Total</Text><Text style={styles.totalValue}>{total} €</Text></View>
        </View>

        <Button fullWidth onPress={() => router.push("/payment")}>Continuer vers le paiement</Button>
      </ScrollView>

      {/* ═══ Date Picker Modal ═══ */}
      <Modal visible={showDateModal} transparent animationType="slide">
        <Pressable style={styles.modalOverlay} onPress={() => setShowDateModal(false)}>
          <Pressable style={styles.modalSheet} onPress={() => {}}>
            <View style={styles.modalDragHandle} />
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Choisir les dates</Text>
              <TouchableOpacity onPress={() => setShowDateModal(false)} activeOpacity={0.7}><X size={24} color="#EAEAEA" strokeWidth={1.5} /></TouchableOpacity>
            </View>

            {/* Selection summary */}
            <View style={styles.calSummary}>
              <View style={styles.calSummaryItem}>
                <Text style={styles.calSummaryLabel}>Début</Text>
                <Text style={styles.calSummaryValue}>{formatDateShort(tempStart)}</Text>
              </View>
              <View style={styles.calSummaryDivider} />
              <View style={styles.calSummaryItem}>
                <Text style={styles.calSummaryLabel}>Fin</Text>
                <Text style={styles.calSummaryValue}>{tempEnd > tempStart ? formatDateShort(tempEnd) : "—"}</Text>
              </View>
              <View style={styles.calSummaryDivider} />
              <View style={styles.calSummaryItem}>
                <Text style={styles.calSummaryLabel}>Durée</Text>
                <Text style={styles.calSummaryValue}>{tempEnd > tempStart ? `${daysBetween(tempStart, tempEnd)}j` : "—"}</Text>
              </View>
            </View>

            {/* Month nav */}
            <View style={styles.calMonthNav}>
              <TouchableOpacity onPress={prevMonth} activeOpacity={0.7} style={styles.calNavBtn}><ChevronLeft size={20} color="#EAEAEA" strokeWidth={1.5} /></TouchableOpacity>
              <Text style={styles.calMonthLabel}>{MONTHS[calMonth]} {calYear}</Text>
              <TouchableOpacity onPress={nextMonth} activeOpacity={0.7} style={styles.calNavBtn}><ChevronRight size={20} color="#EAEAEA" strokeWidth={1.5} /></TouchableOpacity>
            </View>

            {/* Day of week headers */}
            <View style={styles.calWeekRow}>
              {DAYS_OF_WEEK.map((d) => (<Text key={d} style={styles.calWeekDay}>{d}</Text>))}
            </View>

            {/* Calendar grid */}
            <View style={styles.calGrid}>
              {calendarDays.map((day, i) => {
                if (day === 0) return <View key={`e-${i}`} style={styles.calCell} />;
                const date = new Date(calYear, calMonth, day);
                const today = new Date(); today.setHours(0, 0, 0, 0);
                const isPast = date < today;
                const isStart = isSameDay(date, tempStart);
                const isEnd = tempEnd > tempStart && isSameDay(date, tempEnd);
                const isInRange = tempEnd > tempStart && isBetween(date, tempStart, tempEnd);

                return (
                  <TouchableOpacity
                    key={`d-${day}`}
                    style={[
                      styles.calCell,
                      isInRange && styles.calCellRange,
                      (isStart || isEnd) && styles.calCellSelected,
                    ]}
                    activeOpacity={isPast ? 1 : 0.7}
                    onPress={() => !isPast && handleDayPress(day)}
                  >
                    <Text style={[
                      styles.calDayText,
                      isPast && styles.calDayPast,
                      (isStart || isEnd) && styles.calDaySelected,
                      isInRange && styles.calDayRange,
                    ]}>{day}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <View style={styles.calFooter}>
              <Button fullWidth onPress={confirmDates}>Confirmer</Button>
            </View>
          </Pressable>
        </Pressable>
      </Modal>

      {/* ═══ Time Picker Modals ═══ */}
      {[
        { visible: showPickupTimeModal, setVisible: setShowPickupTimeModal, title: "Heure de prise en charge", selected: pickupTime, onSelect: setPickupTime },
        { visible: showReturnTimeModal, setVisible: setShowReturnTimeModal, title: "Heure de retour", selected: returnTime, onSelect: setReturnTime },
      ].map((modal) => (
        <Modal key={modal.title} visible={modal.visible} transparent animationType="slide">
          <Pressable style={styles.modalOverlay} onPress={() => modal.setVisible(false)}>
            <Pressable style={styles.modalSheet} onPress={() => {}}>
              <View style={styles.modalDragHandle} />
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>{modal.title}</Text>
                <TouchableOpacity onPress={() => modal.setVisible(false)} activeOpacity={0.7}><X size={24} color="#EAEAEA" strokeWidth={1.5} /></TouchableOpacity>
              </View>
              <View style={styles.timeGrid}>
                {HOURS.map((hour) => {
                  const isSelected = modal.selected === hour;
                  return (
                    <TouchableOpacity
                      key={hour}
                      style={[styles.timeChip, isSelected && styles.timeChipSelected]}
                      activeOpacity={0.7}
                      onPress={() => { modal.onSelect(hour); modal.setVisible(false); }}
                    >
                      <Text style={[styles.timeChipText, isSelected && styles.timeChipTextSelected]}>{hour}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </Pressable>
          </Pressable>
        </Modal>
      ))}
    </SafeAreaView>
  );
}

const CELL_SIZE = (SCREEN_WIDTH - 80) / 7;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#050404" },
  scrollContent: { paddingHorizontal: 20, paddingTop: 32, paddingBottom: 40 },

  headerRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 16 },
  headerLeft: { flexDirection: "row", alignItems: "center", gap: 16 },
  title: { fontFamily: "Poppins_700Bold", fontSize: 20, color: "#EAEAEA" },
  stepLabel: { fontFamily: "Poppins_500Medium", fontSize: 13, color: "rgba(234, 234, 234, 0.6)" },

  progressTrack: { height: 4, borderRadius: 2, backgroundColor: "rgba(234, 234, 234, 0.1)", marginBottom: 32, overflow: "hidden" },
  progressFill: { height: 4, borderRadius: 2, backgroundColor: "#4A1942" },

  section: { marginBottom: 24 },
  sectionTitle: { fontFamily: "Poppins_600SemiBold", fontSize: 17, color: "#EAEAEA", marginBottom: 12 },

  dateCard: { backgroundColor: "#2E1C2B", borderRadius: 12, padding: 16, alignItems: "center", gap: 12 },
  dateText: { fontFamily: "Poppins_600SemiBold", fontSize: 14, color: "#EAEAEA" },
  modifyLink: { fontFamily: "Poppins_400Regular", fontSize: 13, color: "#4A1942" },

  timeRow: { flexDirection: "row", gap: 12, marginBottom: 24 },
  timeLabel: { fontFamily: "Poppins_500Medium", fontSize: 13, color: "rgba(234, 234, 234, 0.8)", marginBottom: 8 },
  timeBox: { backgroundColor: "#2E1C2B", borderWidth: 1, borderColor: "rgba(234, 234, 234, 0.1)", borderRadius: 12, padding: 12, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  timeValue: { fontFamily: "Poppins_400Regular", fontSize: 15, color: "#EAEAEA" },

  pickupRow: { flexDirection: "row", gap: 12 },
  pickupCard: { flex: 1, backgroundColor: "#2E1C2B", borderRadius: 12, padding: 16, alignItems: "center", gap: 8 },
  pickupLabel: { fontFamily: "Poppins_500Medium", fontSize: 14, color: "#EAEAEA" },
  pickupExtra: { fontFamily: "Poppins_400Regular", fontSize: 12, color: "rgba(234, 234, 234, 0.5)" },

  chauffeurRow: { backgroundColor: "#2E1C2B", borderRadius: 12, padding: 16, flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 24 },
  chauffeurTitle: { fontFamily: "Poppins_600SemiBold", fontSize: 15, color: "#EAEAEA", marginBottom: 4 },
  chauffeurPrice: { fontFamily: "Poppins_400Regular", fontSize: 13, color: "rgba(234, 234, 234, 0.6)" },
  toggle: { width: 48, height: 28, borderRadius: 14, position: "relative", justifyContent: "center" },
  toggleThumb: { position: "absolute", width: 20, height: 20, borderRadius: 10, backgroundColor: "#EAEAEA" },

  summaryCard: { backgroundColor: "#2E1C2B", borderRadius: 12, padding: 16, marginBottom: 24 },
  summaryVehicle: { flexDirection: "row", alignItems: "center", gap: 12, paddingBottom: 16, marginBottom: 16, borderBottomWidth: 1, borderBottomColor: "rgba(234, 234, 234, 0.1)" },
  summaryThumb: { width: 48, height: 48, borderRadius: 8, backgroundColor: "#4A1942" },
  summaryVehicleName: { fontFamily: "Poppins_600SemiBold", fontSize: 14, color: "#EAEAEA" },
  summaryAgency: { fontFamily: "Poppins_400Regular", fontSize: 12, color: "rgba(234, 234, 234, 0.6)" },
  lineItems: { gap: 8, marginBottom: 16 },
  lineItem: { flexDirection: "row", justifyContent: "space-between" },
  lineItemLabel: { fontFamily: "Poppins_400Regular", fontSize: 14, color: "rgba(234, 234, 234, 0.7)" },
  lineItemValue: { fontFamily: "Poppins_400Regular", fontSize: 14, color: "#EAEAEA" },
  totalRow: { flexDirection: "row", justifyContent: "space-between", paddingTop: 16, borderTopWidth: 1, borderTopColor: "rgba(234, 234, 234, 0.1)" },
  totalLabel: { fontFamily: "Poppins_600SemiBold", fontSize: 18, color: "#EAEAEA" },
  totalValue: { fontFamily: "Poppins_600SemiBold", fontSize: 18, color: "#EAEAEA" },

  /* ═══ Modal ═══ */
  modalOverlay: { flex: 1, backgroundColor: "rgba(0, 0, 0, 0.6)", justifyContent: "flex-end" },
  modalSheet: { backgroundColor: "#0d0a0c", borderTopLeftRadius: 24, borderTopRightRadius: 24, paddingBottom: 32 },
  modalDragHandle: { width: 40, height: 4, borderRadius: 2, backgroundColor: "rgba(234, 234, 234, 0.3)", alignSelf: "center", marginTop: 12, marginBottom: 20 },
  modalHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, marginBottom: 16 },
  modalTitle: { fontFamily: "Poppins_600SemiBold", fontSize: 18, color: "#EAEAEA" },

  /* Calendar */
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

  /* Time Grid */
  timeGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10, paddingHorizontal: 20, paddingBottom: 8 },
  timeChip: { paddingHorizontal: 18, paddingVertical: 10, borderRadius: 10, backgroundColor: "#2E1C2B", borderWidth: 1, borderColor: "rgba(234, 234, 234, 0.1)" },
  timeChipSelected: { backgroundColor: "#4A1942", borderColor: "#4A1942" },
  timeChipText: { fontFamily: "Poppins_500Medium", fontSize: 14, color: "rgba(234, 234, 234, 0.7)" },
  timeChipTextSelected: { color: "#EAEAEA" },
});
