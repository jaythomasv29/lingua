import { SocialButton } from "@/components/SocialButton";
import { VerificationModal } from "@/components/VerificationModal";
import { images } from "@/constants/images";
import { useSignIn, useSSO } from "@clerk/expo";
import { Ionicons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
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

WebBrowser.maybeCompleteAuthSession();

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [showVerification, setShowVerification] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [verifyError, setVerifyError] = useState<string | null>(null);

  const { signIn, fetchStatus } = useSignIn();
  const { startSSOFlow } = useSSO();

  function validate() {
    if (!email.trim()) {
      setEmailError("Please enter your email");
      return false;
    }
    if (!isValidEmail(email.trim())) {
      setEmailError("Please enter a valid email address");
      return false;
    }
    setEmailError(null);
    return true;
  }

  async function handleSignIn() {
    if (fetchStatus === "fetching") return;
    if (!validate()) return;
    setApiError(null);
    setIsSending(true);
    try {
      const { error } = await signIn.emailCode.sendCode({
        emailAddress: email.trim(),
      });
      if (error) {
        setApiError(error.longMessage ?? error.message);
        return;
      }
      setVerifyError(null);
      setShowVerification(true);
    } finally {
      setIsSending(false);
    }
  }

  async function handleVerify(code: string): Promise<void> {
    setVerifyError(null);
    const { error } = await signIn.emailCode.verifyCode({ code });
    if (error) {
      setVerifyError(error.longMessage ?? error.message ?? "Invalid code.");
      return;
    }
    if (signIn.status === "complete") {
      await signIn.finalize({
        navigate: () => router.replace("/"),
      });
    }
  }

  async function handleResend() {
    const { error } = await signIn.emailCode.sendCode({
      emailAddress: email.trim(),
    });
    if (error) {
      setVerifyError(error.longMessage ?? error.message);
    }
  }

  async function handleSocialSignIn(strategy: "oauth_google" | "oauth_apple") {
    setApiError(null);
    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy,
        redirectUrl: "lingua://oauth-callback",
      });
      if (createdSessionId) {
        await setActive!({ session: createdSessionId });
        router.replace("/");
      }
    } catch (err: any) {
      const msg = err.errors?.[0]?.longMessage ?? err.errors?.[0]?.message ?? err.message ?? err.toString?.() ?? "Social sign-in failed";
      setApiError(msg);
    }
  }

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
            <View className="items-center mt-6 relative">
              <Text style={[styles.sparkle, { left: 40, top: 10, color: "#6c4ef5" }]}>✦</Text>
              <Text style={[styles.sparkle, { right: 40, top: 0, color: "#4d88ff", fontSize: 14 }]}>✦</Text>
              <Text style={[styles.sparkle, { right: 60, top: 70, color: "#ffc800", fontSize: 10 }]}>●</Text>
              <Image source={images.mascotAuth} style={{ width: 130, height: 130 }} resizeMode="contain" />
            </View>

            {/* Form */}
            <View className="mt-7">
              <View
                className={`border rounded-[14px] px-4 pt-3 pb-2.5 ${
                  emailError ? "border-red-400" : "border-border"
                }`}
              >
                <Text className="caption text-secondary">Email</Text>
                <TextInput
                  value={email}
                  onChangeText={(t) => {
                    setEmail(t);
                    if (emailError) setEmailError(null);
                    if (apiError) setApiError(null);
                  }}
                  placeholder="alex@gmail.com"
                  placeholderTextColor="#b0b8c1"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  style={styles.textInput}
                />
              </View>
              {emailError ? (
                <Text style={styles.fieldError}>{emailError}</Text>
              ) : null}
            </View>

            {/* API error */}
            {apiError ? (
              <Text style={styles.fieldError} className="mt-2">{apiError}</Text>
            ) : null}

            {/* Sign In button */}
            <TouchableOpacity
              className="bg-lingua-deep-purple rounded-[18px] py-4 items-center mt-5"
              activeOpacity={0.85}
              onPress={handleSignIn}
              disabled={isSending}
            >
              <Text className="text-white text-[16px]" style={{ fontFamily: "Poppins-SemiBold" }}>
                {isSending ? "Sending code…" : "Sign In"}
              </Text>
            </TouchableOpacity>

            {/* Divider */}
            <View className="flex-row items-center gap-3 mt-6">
              <View className="flex-1 bg-border h-px" />
              <Text className="body-sm text-secondary">or continue with</Text>
              <View className="flex-1 bg-border h-px" />
            </View>

            {/* Social buttons */}
            <View className="gap-3 mt-4">
              <SocialButton
                icon={<Ionicons name="logo-google" size={22} color="#EA4335" />}
                label="Continue with Google"
                onPress={() => handleSocialSignIn("oauth_google")}
              />
              <SocialButton
                icon={<Ionicons name="logo-facebook" size={22} color="#1877F2" />}
                label="Continue with Facebook"
              />
              <SocialButton
                icon={<Ionicons name="logo-apple" size={22} color="#000000" />}
                label="Continue with Apple"
                onPress={() => handleSocialSignIn("oauth_apple")}
              />
            </View>

            {/* Bottom link */}
            <View className="flex-row items-center justify-center mt-8">
              <Text className="body-sm text-secondary">Don't have an account? </Text>
              <TouchableOpacity onPress={() => router.replace("/(auth)/sign-up")}>
                <Text className="body-sm text-lingua-purple" style={{ fontFamily: "Poppins-SemiBold" }}>
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
        onVerify={handleVerify}
        onResend={handleResend}
        error={verifyError}
      />
    </>
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
  fieldError: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "#e53935",
    marginTop: 5,
  },
});
