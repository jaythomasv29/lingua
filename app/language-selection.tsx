import { useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { languages } from "@/data/languages";
import { images } from "@/constants/images";
import { posthog } from "@/lib/posthog";
import { useLanguageStore } from "@/store/languageStore";
import type { Language } from "@/types/learning";

export default function LanguageSelection() {
  const router = useRouter();
  const { selectedLanguage, setSelectedLanguage } = useLanguageStore();
  const [search, setSearch] = useState("");
  const [localSelected, setLocalSelected] = useState<Language | null>(
    selectedLanguage
  );

  const filtered = languages.filter(
    (l) =>
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.nativeName.toLowerCase().includes(search.toLowerCase())
  );

  function handleConfirm() {
    if (localSelected) {
      posthog.capture("language_selected", {
        language_code: localSelected.code,
        language_name: localSelected.name,
      });
      setSelectedLanguage(localSelected);
      router.replace("/");
    }
  }

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#fff" }}
      edges={["top", "left", "right"]}
    >
      {/* Header */}
      <View className="flex-row items-center px-5 pt-3 pb-4">
        {router.canGoBack() ? (
          <TouchableOpacity onPress={() => router.back()} className="p-1">
            <Ionicons name="chevron-back" size={26} color="#0d132b" />
          </TouchableOpacity>
        ) : (
          <View className="w-8" />
        )}
        <Text
          className="flex-1 text-center text-[20px] text-primary"
          style={{ fontFamily: "Poppins-SemiBold", marginRight: 34 }}
        >
          Choose a language
        </Text>
      </View>

      {/* Search bar */}
      <View className="mx-4 mb-5 flex-row items-center bg-surface rounded-2xl px-4 gap-2">
        <Ionicons name="search-outline" size={18} color="#687280" />
        {/* TextInput exception: fontFamily requires style prop */}
        <TextInput
          placeholder="Search languages"
          placeholderTextColor="#687280"
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
      </View>

      {/* Popular label */}
      <Text
        className="text-secondary px-5 mb-2 text-[14px]"
        style={{ fontFamily: "Poppins-Medium" }}
      >
        Popular
      </Text>

      {/* Language list */}
      {/* contentContainerStyle is a ScrollView-pattern prop — StyleSheet exception */}
      <FlatList
        data={filtered}
        keyExtractor={(l) => l.code}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => {
          const isSelected = localSelected?.code === item.code;
          return (
            <TouchableOpacity
              onPress={() => setLocalSelected(item)}
              activeOpacity={0.7}
              className={`flex-row items-center py-3.25 px-3.5 rounded-2xl mb-1.5 border-2 ${
                isSelected
                  ? "bg-[#f0edfd] border-lingua-purple"
                  : "bg-white border-transparent"
              }`}
            >
              <Image
                source={{ uri: item.flag }}
                className="w-11 h-11 rounded-full"
              />
              <View className="flex-1 ml-3">
                <Text
                  className="text-primary text-[16px]"
                  style={{ fontFamily: "Poppins-SemiBold" }}
                >
                  {item.name}
                </Text>
                {item.learnerCount ? (
                  <Text
                    className="text-secondary text-[11px]"
                    style={{ fontFamily: "Poppins-Regular" }}
                  >
                    {item.learnerCount}
                  </Text>
                ) : null}
              </View>
              {isSelected ? (
                <View className="w-6.5 h-6.5 rounded-full bg-lingua-purple items-center justify-center">
                  <Ionicons name="checkmark" size={14} color="#fff" />
                </View>
              ) : (
                <Ionicons name="chevron-forward" size={18} color="#687280" />
              )}
            </TouchableOpacity>
          );
        }}
      />

      {/* Bottom section */}
      <View>
        <TouchableOpacity
          onPress={handleConfirm}
          disabled={!localSelected}
          activeOpacity={0.85}
          className="mx-4 mb-3 bg-lingua-deep-purple rounded-[18px] py-4 items-center"
          style={!localSelected ? { opacity: 0.45 } : undefined}
        >
          <Text
            className="text-white text-[16px]"
            style={{ fontFamily: "Poppins-SemiBold" }}
          >
            Start Learning
          </Text>
        </TouchableOpacity>
        <Image
          source={images.earth}
          className="w-full h-32.5"
          resizeMode="cover"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  searchInput: {
    flex: 1,
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#0d132b",
    paddingVertical: 12,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
});
