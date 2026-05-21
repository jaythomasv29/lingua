import { images } from "@/constants/images";
import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Onboarding() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
        <View className="flex-1 px-6 pt-4 pb-8">
          {/* Logo row */}
          <View className="flex-row items-center justify-center gap-2">
            <Image
              source={images.mascotLogo}
              style={{ width: 38, height: 38 }}
              resizeMode="contain"
            />
            <Text className="h3 text-primary">lingua</Text>
          </View>

          {/* Heading + Subtitle */}
          <View className="mt-20 px-5">
            <Text className="h1 text-primary">
              {"Your AI language\n"}
              <Text className="text-lingua-purple">teacher</Text>
              {"."}
            </Text>
            <Text className="body-md text-secondary mt-3">
              {"Real conversations, personalized\nlessons, anytime, anywhere."}
            </Text>
          </View>

          {/* Mascot + Speech Bubbles */}
          <View className="flex-1 items-center justify-center">
            <Image
              source={images.mascotWelcome}
              className="w-75 h-75"
              resizeMode="contain"
            />

            {/* Hello! bubble — lower left */}
            <View
              className="absolute bg-white rounded-[20px] px-4 py-2.5 border border-[#EEEEFF] left-2 top-[25%]"
              style={styles.helloBubble}
            >
              <Text
                className="text-primary text-[14px]"
                style={{ fontFamily: "Poppins-SemiBold" }}
              >
                Hello!
              </Text>
            </View>

            {/* ¡Hola! bubble — upper right */}
            <View
              className="absolute bg-white rounded-[20px] px-4 py-2.5 border border-[#EEEEFF] right-2 top-[8%]"
              style={styles.holaBubble}
            >
              <Text
                className="text-primary text-[14px]"
                style={{ fontFamily: "Poppins-SemiBold" }}
              >
                ¡Hola!
              </Text>
            </View>

            {/* 你好! bubble — right middle */}
            <View
              className="absolute bg-white rounded-[20px] px-4 py-2.5 border border-[#EEEEFF] right-2 top-[45%]"
              style={styles.chineseBubble}
            >
              <Text
                className="text-[14px]"
                style={{ fontFamily: "Poppins-SemiBold", color: "#E05A2B" }}
              >
                你好!
              </Text>
            </View>
          </View>

          {/* Get Started Button */}
          <TouchableOpacity
            className="bg-lingua-deep-purple rounded-[18px] py-4.5 flex-row items-center justify-center gap-2"
            activeOpacity={0.85}
            onPress={() => {}}
          >
            <Text
              className="text-white text-[16px]"
              style={{ fontFamily: "Poppins-SemiBold" }}
            >
              Get Started
            </Text>
            <Ionicons name="chevron-forward" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  helloBubble: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    transform: [{ rotate: "-8deg" }],
  },
  holaBubble: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    transform: [{ rotate: "6deg" }],
  },
  chineseBubble: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    transform: [{ rotate: "4deg" }],
  },
});
