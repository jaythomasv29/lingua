import { VerificationModal } from "@/components/VerificationModal";
import { images } from "@/constants/images";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [showVerification, setShowVerification] = useState(false);

  return (
    <>
      <SafeAreaView
        edges={["bottom"]}
        style={{ flex: 1, backgroundColor: "#ffffff" }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* Heading */}
            <View className="mt-5">
              <Text className="h1 text-primary text-center mb-2">
                Welcome back!
              </Text>
              <Text className="body-md text-secondary mt-1.5 text-center">
                Sign in to continue your journey ✨
              </Text>
            </View>

            {/* Mascot with sparkles */}
            <View
              className="items-center mt-6"
              style={{ position: "relative" }}
            >
              <Text
                style={[
                  styles.sparkle,
                  { left: 40, top: 10, color: "#6c4ef5" },
                ]}
              >
                ✦
              </Text>
              <Text
                style={[
                  styles.sparkle,
                  { right: 40, top: 0, color: "#4d88ff", fontSize: 14 },
                ]}
              >
                ✦
              </Text>
              <Text
                style={[
                  styles.sparkle,
                  { right: 60, top: 70, color: "#ffc800", fontSize: 10 },
                ]}
              >
                ●
              </Text>
              <Image
                source={images.mascotAuth}
                style={{ width: 130, height: 130 }}
                resizeMode="contain"
              />
            </View>

            {/* Form — email only */}
            <View className="mt-7">
              <View className="border border-border rounded-[14px] px-4 pt-3 pb-2.5">
                <Text className="caption text-secondary">Email</Text>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="alex@gmail.com"
                  placeholderTextColor="#b0b8c1"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  style={styles.textInput}
                />
              </View>
            </View>

            {/* Sign In button */}
            <TouchableOpacity
              className="bg-lingua-deep-purple rounded-[18px] py-4 items-center mt-5"
              activeOpacity={0.85}
              onPress={() => setShowVerification(true)}
            >
              <Text
                className="text-white text-[16px]"
                style={{ fontFamily: "Poppins-SemiBold" }}
              >
                Sign In
              </Text>
            </TouchableOpacity>

            {/* Divider */}
            <View className="flex-row items-center gap-3 mt-6">
              <View className="flex-1 bg-border" style={{ height: 1 }} />
              <Text className="body-sm text-secondary">or continue with</Text>
              <View className="flex-1 bg-border" style={{ height: 1 }} />
            </View>

            {/* Social buttons */}
            <View className="gap-3 mt-4">
              <SocialButton
                icon={<Ionicons name="logo-google" size={22} color="#EA4335" />}
                label="Continue with Google"
              />
              <SocialButton
                icon={
                  <Ionicons name="logo-facebook" size={22} color="#1877F2" />
                }
                label="Continue with Facebook"
              />
              <SocialButton
                icon={<Ionicons name="logo-apple" size={22} color="#000000" />}
                label="Continue with Apple"
              />
            </View>

            {/* Bottom link */}
            <View className="flex-row items-center justify-center mt-8">
              <Text className="body-sm text-secondary">
                Don't have an account?{" "}
              </Text>
              <TouchableOpacity
                onPress={() => router.replace("/(auth)/sign-up")}
              >
                <Text
                  className="body-sm text-lingua-purple"
                  style={{ fontFamily: "Poppins-SemiBold" }}
                >
                  Sign up
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>

      <VerificationModal
        visible={showVerification}
        email={email}
        onClose={() => setShowVerification(false)}
      />
    </>
  );
}

function SocialButton({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <TouchableOpacity
      className="flex-row items-center border border-border rounded-[14px] py-3.5 px-4"
      activeOpacity={0.8}
    >
      <View style={{ width: 28 }}>{icon}</View>
      <Text
        className="flex-1 text-center text-primary body-md"
        style={{ fontFamily: "Poppins-Medium" }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 32,
  },
  sparkle: {
    position: "absolute",
    fontFamily: "Poppins-Bold",
    fontSize: 18,
    zIndex: 1,
  },
  textInput: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#0d132b",
    marginTop: 3,
    padding: 0,
  },
});
