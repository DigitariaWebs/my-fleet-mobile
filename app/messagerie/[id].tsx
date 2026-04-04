import { useState, useRef, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft, Send, Paperclip } from "lucide-react-native";
import { bookings, agencies } from "@/data/mockData";

interface Message {
  id: number;
  text: string;
  from: "agency" | "user";
  time: string;
}

const initialMessages: Message[] = [
  {
    id: 1,
    text: "Bonjour, votre véhicule est en préparation.",
    from: "agency",
    time: "09:30",
  },
  {
    id: 2,
    text: "Merci ! À quelle heure pensez-vous arriver ?",
    from: "user",
    time: "09:32",
  },
  {
    id: 3,
    text: "Nous arriverons dans environ 15 minutes.",
    from: "agency",
    time: "09:45",
  },
  {
    id: 4,
    text: "Parfait, je vous attends.",
    from: "user",
    time: "09:46",
  },
];

export default function MessagerieScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const listRef = useRef<FlatList>(null);

  const booking = bookings.find((b) => b.id === id);
  const agency = agencies.find(
    (a) => booking && a.name === booking.agencyName
  );
  const agencyLogo = agency?.logo ?? "P";
  const agencyName = booking?.agencyName ?? "Prestige Auto Nice";

  const handleSend = useCallback(() => {
    if (!message.trim()) return;
    const now = new Date();
    const time = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
    setMessages((prev) => [
      ...prev,
      { id: prev.length + 1, text: message.trim(), from: "user", time },
    ]);
    setMessage("");
    setTimeout(() => {
      listRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [message]);

  const renderMessage = useCallback(({ item }: { item: Message }) => {
    const isUser = item.from === "user";
    return (
      <View
        style={[
          styles.messageRow,
          isUser ? styles.messageRowUser : styles.messageRowAgency,
        ]}
      >
        <View
          style={[
            styles.bubble,
            isUser ? styles.bubbleUser : styles.bubbleAgency,
          ]}
        >
          <Text style={styles.bubbleText}>{item.text}</Text>
          <Text
            style={[
              styles.bubbleTime,
              isUser ? styles.bubbleTimeRight : styles.bubbleTimeLeft,
            ]}
          >
            {item.time}
          </Text>
        </View>
      </View>
    );
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={0}
      >
        {/* ─── Header ─── */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backBtn}
            activeOpacity={0.7}
          >
            <ArrowLeft size={20} color="#EAEAEA" strokeWidth={1.5} />
          </TouchableOpacity>
          <View style={styles.headerInfo}>
            <View style={styles.headerAvatar}>
              <Text style={styles.headerAvatarText}>{agencyLogo}</Text>
            </View>
            <View>
              <Text style={styles.headerName}>{agencyName}</Text>
              <Text style={styles.headerStatus}>En ligne</Text>
            </View>
          </View>
        </View>

        {/* ─── Messages ─── */}
        <FlatList
          ref={listRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.messagesList}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() =>
            listRef.current?.scrollToEnd({ animated: false })
          }
        />

        {/* ─── Input Bar ─── */}
        <View style={styles.inputBar}>
          <View style={styles.inputRow}>
            <TouchableOpacity style={styles.attachBtn} activeOpacity={0.7}>
              <Paperclip
                size={20}
                color="rgba(234, 234, 234, 0.5)"
                strokeWidth={1.5}
              />
            </TouchableOpacity>
            <TextInput
              value={message}
              onChangeText={setMessage}
              placeholder="Écrire un message..."
              placeholderTextColor="rgba(234, 234, 234, 0.4)"
              style={styles.input}
              returnKeyType="send"
              onSubmitEditing={handleSend}
            />
            <TouchableOpacity
              onPress={handleSend}
              disabled={!message.trim()}
              style={[
                styles.sendBtn,
                !message.trim() && styles.sendBtnDisabled,
              ]}
              activeOpacity={0.7}
            >
              <Send size={20} color="#4A1942" strokeWidth={1.5} />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050404",
  },
  flex: {
    flex: 1,
  },

  /* ─── Header ─── */
  header: {
    backgroundColor: "#2E1C2B",
    paddingHorizontal: 20,
    paddingVertical: 24,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(234, 234, 234, 0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  headerInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#4A1942",
    alignItems: "center",
    justifyContent: "center",
  },
  headerAvatarText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    color: "#EAEAEA",
  },
  headerName: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 15,
    color: "#EAEAEA",
  },
  headerStatus: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: "rgba(234, 234, 234, 0.6)",
  },

  /* ─── Messages ─── */
  messagesList: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 16,
  },
  messageRow: {
    flexDirection: "row",
  },
  messageRowUser: {
    justifyContent: "flex-end",
  },
  messageRowAgency: {
    justifyContent: "flex-start",
  },
  bubble: {
    maxWidth: "75%",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
  },
  bubbleUser: {
    backgroundColor: "#4A1942",
    borderBottomRightRadius: 4,
  },
  bubbleAgency: {
    backgroundColor: "#2E1C2B",
    borderBottomLeftRadius: 4,
  },
  bubbleText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "#EAEAEA",
    lineHeight: 20,
  },
  bubbleTime: {
    fontFamily: "Poppins_400Regular",
    fontSize: 11,
    color: "rgba(234, 234, 234, 0.5)",
    marginTop: 4,
  },
  bubbleTimeRight: {
    textAlign: "right",
  },
  bubbleTimeLeft: {
    textAlign: "left",
  },

  /* ─── Input Bar ─── */
  inputBar: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: "rgba(234, 234, 234, 0.1)",
    backgroundColor: "#050404",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#2E1C2B",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  attachBtn: {
    padding: 4,
  },
  input: {
    flex: 1,
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "#EAEAEA",
    height: 24,
  },
  sendBtn: {
    padding: 4,
  },
  sendBtnDisabled: {
    opacity: 0.3,
  },
});
