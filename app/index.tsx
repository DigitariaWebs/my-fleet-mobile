import { View, Text } from "react-native";

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-background">
      <Text className="text-2xl font-bold text-text">My Fleet</Text>
      <Text className="mt-2 text-text-secondary">Luxury Car Rental</Text>
    </View>
  );
}
