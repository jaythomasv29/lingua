import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 bg-white items-center justify-center px-6">
      <Text className="h1 text-primary mb-10 text-center">lingua</Text>
      <TouchableOpacity
        className="bg-lingua-deep-purple px-8 py-4 rounded-2xl w-full items-center"
        onPress={() => router.push("/onboarding")}
        activeOpacity={0.85}
      >
        <Text
          className="body-lg text-white"
          style={{ fontFamily: "Poppins-SemiBold" }}
        >
          Open Onboarding
        </Text>
      </TouchableOpacity>
    </View>
  );
}
