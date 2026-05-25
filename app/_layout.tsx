import "../global.css";

import { ClerkProvider, useAuth } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";
import { Stack, useRouter, useSegments, usePathname, useGlobalSearchParams } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useRef } from "react";
import { PostHogProvider } from "posthog-react-native";

import { useLanguageStore } from "@/store/languageStore";
import { posthog } from "@/lib/posthog";

SplashScreen.preventAutoHideAsync();

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

function ScreenTracker() {
  const pathname = usePathname();
  const params = useGlobalSearchParams();
  const previousPathname = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (previousPathname.current !== pathname) {
      posthog.screen(pathname, {
        previous_screen: previousPathname.current ?? null,
        ...params,
      });
      previousPathname.current = pathname;
    }
  }, [pathname, params]);

  return null;
}

function InitialLayout() {
  const { isSignedIn, isLoaded } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const { selectedLanguage, hasHydrated } = useLanguageStore();

  useEffect(() => {
    // Wait for Clerk and the persisted store to both be ready
    if (!isLoaded || !hasHydrated) return;

    const inAuthGroup = segments[0] === "(auth)";
    const inOnboarding = segments[0] === "onboarding";
    const inLanguageSelection = segments[0] === "language-selection";

    if (isSignedIn) {
      if (inAuthGroup || inOnboarding) {
        // Post-login: go home if a language is already set, otherwise pick one
        router.replace(selectedLanguage ? "/(tabs)/" : "/language-selection");
      } else if (!selectedLanguage && !inLanguageSelection) {
        // Authenticated but no language chosen (e.g. storage was cleared)
        router.replace("/language-selection");
      }
    } else if (!inAuthGroup && !inOnboarding) {
      router.replace("/onboarding");
    }
  }, [isSignedIn, isLoaded, segments, selectedLanguage, hasHydrated]);

  return (
    <>
      <ScreenTracker />
      <Stack
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  const [loaded] = useFonts({
    "Poppins-Regular": require("@/assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("@/assets/fonts/Poppins-Medium.ttf"),
    "Poppins-SemiBold": require("@/assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Bold": require("@/assets/fonts/Poppins-Bold.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  return (
    <PostHogProvider
      client={posthog}
      autocapture={{
        captureScreens: false,
        captureTouches: true,
        propsToCapture: ["testID"],
        maxElementsCaptured: 20,
      }}
    >
      <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
        <InitialLayout />
      </ClerkProvider>
    </PostHogProvider>
  );
}
