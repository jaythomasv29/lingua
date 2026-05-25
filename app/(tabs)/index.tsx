import { useUser } from "@clerk/expo";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "@/constants/images";
import { getLessonsByUnit } from "@/data/lessons";
import { getUnitsByLanguage } from "@/data/units";
import { posthog } from "@/lib/posthog";
import { useLanguageStore } from "@/store/languageStore";
import type { VocabularyActivity } from "@/types/learning";

const DAILY_XP_GOAL = 20;
const CURRENT_XP = 15;
const STREAK = 12;

const GREETING: Record<string, string> = {
  es: "¡Hola",
  fr: "Bonjour",
  ja: "こんにちは",
  de: "Hallo",
  pt: "Olá",
  ko: "안녕",
  zh: "你好",
};

export default function HomeScreen() {
  const { user } = useUser();
  const { selectedLanguage } = useLanguageStore();

  const firstName = user?.firstName ?? "Friend";
  const greeting = selectedLanguage
    ? (GREETING[selectedLanguage.code] ?? "Hey")
    : "Hey";

  const units = selectedLanguage
    ? getUnitsByLanguage(selectedLanguage.code)
    : [];
  const currentUnit = units[0] ?? null;
  const lessons = currentUnit ? getLessonsByUnit(currentUnit.id) : [];
  const currentLesson = lessons[0] ?? null;

  const vocabActivity = currentLesson?.activities?.find(
    (a): a is VocabularyActivity => a.type === "vocabulary",
  );
  const wordCount = vocabActivity?.items?.length ?? 10;

  const todaysPlan = [
    {
      id: "lesson",
      label: "Lesson",
      subtitle: currentLesson?.title ?? "Hello & Goodbye",
      icon: "book" as keyof typeof Ionicons.glyphMap,
      completed: true,
    },
    {
      id: "ai-conversation",
      label: "AI Conversation",
      subtitle: "Talk about your day",
      icon: "headset" as keyof typeof Ionicons.glyphMap,
      completed: false,
    },
    {
      id: "new-words",
      label: "New words",
      subtitle: `${wordCount} words`,
      icon: "apps" as keyof typeof Ionicons.glyphMap,
      completed: false,
    },
  ];

  const xpProgress = DAILY_XP_GOAL > 0 ? CURRENT_XP / DAILY_XP_GOAL : 0;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View className="flex-row items-center justify-between px-5 pt-4">
          <View className="flex-row items-center gap-2">
            {selectedLanguage ? (
              <Image
                source={{ uri: selectedLanguage.flag }}
                style={{ width: 28, height: 28, borderRadius: 14 }}
              />
            ) : (
              <View className="w-7 h-7 rounded-full bg-surface" />
            )}
            <Text className="h4 text-primary">
              {greeting}, {firstName}! 👋
            </Text>
          </View>
          <View className="flex-row items-center gap-3">
            <View className="flex-row items-center gap-1">
              <Image
                source={images.streakFire}
                style={{ width: 20, height: 20, resizeMode: "contain" }}
              />
              <Text
                style={{ fontFamily: "Poppins-SemiBold" }}
                className="text-[14px] text-streak"
              >
                {STREAK}
              </Text>
            </View>
            <TouchableOpacity activeOpacity={0.7}>
              <Ionicons
                name="notifications-outline"
                size={24}
                color="#0D132B"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Daily Goal */}
        <View style={styles.goalCard} className="mx-5 mt-4 rounded-2xl p-4">
          <View className="flex-row items-center">
            <View className="flex-1">
              <Text className="caption text-secondary">Daily goal</Text>
              <View className="flex-row items-end gap-1 mt-1">
                <Text className="h3 text-primary">{CURRENT_XP}</Text>
                <Text className="body-md text-secondary mb-0.75">
                  / {DAILY_XP_GOAL} XP
                </Text>
              </View>
              <View className="h-2 bg-border rounded-full overflow-hidden mt-3">
                <View
                  className="h-2 bg-streak rounded-full"
                  style={{ width: `${xpProgress * 100}%` }}
                />
              </View>
            </View>
            <Image
              source={images.treasure}
              style={{
                width: 80,
                height: 80,
                resizeMode: "contain",
                marginLeft: 12,
              }}
            />
          </View>
        </View>

        {/* Continue Learning */}
        <View
          style={{ height: 172 }}
          className="mx-5 mt-4 rounded-3xl bg-lingua-purple flex-row overflow-hidden"
        >
          <View className="p-5 flex-1" style={{ zIndex: 1 }}>
            {/* caption class sets Poppins-Regular 11px; rgba color not in theme */}
            <Text
              className="caption"
              style={{ color: "rgba(255,255,255,0.75)" }}
            >
              Continue learning
            </Text>
            <Text className="h2 text-white mt-1">
              {selectedLanguage?.name ?? "Spanish"}
            </Text>
            {/* body-sm sets Poppins-Regular 13px; rgba color not in theme */}
            <Text
              className="body-sm"
              style={{ color: "rgba(255,255,255,0.75)", marginTop: 2 }}
            >
              A1 · Unit {currentUnit?.orderIndex ?? 1}
            </Text>
            <TouchableOpacity
              className="bg-white px-5 py-2 rounded-full self-start mt-3.5"
              activeOpacity={0.85}
              onPress={() =>
                posthog.capture("lesson_continued", {
                  language_code: selectedLanguage?.code,
                  language_name: selectedLanguage?.name,
                  unit_id: currentUnit?.id,
                  lesson_id: currentLesson?.id,
                })
              }
            >
              <Text
                style={{ fontFamily: "Poppins-SemiBold" }}
                className="text-[14px] text-lingua-purple"
              >
                Continue
              </Text>
            </TouchableOpacity>
          </View>
          <Image source={images.palace} style={styles.palaceImage} />
        </View>

        {/* Today's Plan */}
        <View className="mx-5 mt-6">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="h4 text-primary">Today's plan</Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text className="body-sm text-lingua-purple">View all</Text>
            </TouchableOpacity>
          </View>

          <View className="bg-surface rounded-2xl overflow-hidden">
            {todaysPlan.map((item, index) => (
              <React.Fragment key={item.id}>
                {index > 0 && <View className="h-px bg-border mx-4" />}
                <View className="flex-row items-center px-4 py-3 gap-3">
                  <View className="w-10 h-10 rounded-xl items-center justify-center bg-lingua-purple">
                    <Ionicons name={item.icon} size={18} color="#ffffff" />
                  </View>
                  <View className="flex-1">
                    <Text
                      style={{ fontFamily: "Poppins-Medium" }}
                      className="text-[14px] text-primary"
                    >
                      {item.label}
                    </Text>
                    <Text className="caption text-secondary">
                      {item.subtitle}
                    </Text>
                  </View>
                  {item.completed ? (
                    <Ionicons
                      name="checkmark-circle"
                      size={24}
                      color="#6C4EF5"
                    />
                  ) : (
                    <View className="w-6 h-6 rounded-full border-2 border-border" />
                  )}
                </View>
              </React.Fragment>
            ))}
          </View>
        </View>

        {/* Next Up */}
        <View style={styles.nextUpCard} className="mx-5 mt-4 rounded-2xl p-4">
          <Text
            style={{ fontFamily: "Poppins-SemiBold", letterSpacing: 0.3 }}
            className="text-[11px] text-lingua-green"
          >
            Next up
          </Text>
          <View className="flex-row items-center justify-between mt-2">
            <View>
              <Text className="h4 text-primary">AI Video Call</Text>
              <Text className="body-sm text-secondary mt-1">
                Practice speaking
              </Text>
            </View>
            <View className="flex-row items-center gap-3">
              <Image
                source={{ uri: "https://i.pravatar.cc/100?img=47" }}
                style={{ width: 52, height: 52, borderRadius: 26 }}
              />
              <TouchableOpacity
                className="w-11 h-11 rounded-full bg-lingua-green items-center justify-center"
                activeOpacity={0.8}
                onPress={() =>
                  posthog.capture("ai_video_call_started", {
                    language_code: selectedLanguage?.code,
                    language_name: selectedLanguage?.name,
                  })
                }
              >
                <Ionicons name="videocam" size={20} color="#ffffff" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // SafeAreaView — className not supported
  safe: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  // contentContainerStyle on ScrollView — must use StyleSheet
  scrollContent: {
    paddingBottom: 32,
  },
  // Custom bg #FFF8EE not in theme — no NativeWind class available
  goalCard: {
    backgroundColor: "#FFF8EE",
  },
  // resizeMode is an Image-specific RN prop — NativeWind exception
  palaceImage: {
    position: "absolute",
    right: 0,
    bottom: 0,
    height: "100%",
    width: 150,
    resizeMode: "cover",
  },
  // Custom bg #E8F9EE not in theme — no NativeWind class available
  nextUpCard: {
    backgroundColor: "#E8F9EE",
  },
});
