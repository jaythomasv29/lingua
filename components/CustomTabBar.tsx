import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CIRCLE_SIZE = 52;
const TAB_HEIGHT = 72;

type TabConfig = {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  activeIcon: keyof typeof Ionicons.glyphMap;
};

const TAB_CONFIG: Record<string, TabConfig> = {
  index: { label: "Home", icon: "home-outline", activeIcon: "home" },
  learn: { label: "Learn", icon: "book-outline", activeIcon: "book" },
  "ai-teacher": {
    label: "AI Teacher",
    icon: "sparkles-outline",
    activeIcon: "sparkles",
  },
  chat: {
    label: "Chat",
    icon: "chatbubble-outline",
    activeIcon: "chatbubble",
  },
  profile: { label: "Profile", icon: "person-outline", activeIcon: "person" },
};

export default function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const { width: screenWidth } = useWindowDimensions();
  const tabWidth = screenWidth / state.routes.length;

  const translateX = useRef(
    new Animated.Value(state.index * tabWidth + (tabWidth - CIRCLE_SIZE) / 2)
  ).current;

  useEffect(() => {
    Animated.spring(translateX, {
      toValue: state.index * tabWidth + (tabWidth - CIRCLE_SIZE) / 2,
      useNativeDriver: true,
      tension: 200,
      friction: 14,
    }).start();
  }, [state.index, tabWidth, translateX]);

  return (
    <View style={styles.wrapper}>
      <View style={styles.tabRow}>
        <Animated.View
          style={[styles.activeCircle, { transform: [{ translateX }] }]}
        />
        {state.routes.map((route, index) => {
          const isActive = state.index === index;
          const config: TabConfig = TAB_CONFIG[route.name] ?? {
            label: route.name,
            icon: "help-outline",
            activeIcon: "help-circle",
          };

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });
            if (!isActive && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              style={styles.tabItem}
              activeOpacity={0.7}
            >
              <Ionicons
                name={isActive ? config.activeIcon : config.icon}
                size={22}
                color={isActive ? "#ffffff" : "#687280"}
              />
              {!isActive && (
                <Text style={styles.label}>{config.label}</Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={{ height: Math.max(insets.bottom - 20, 8), backgroundColor: "#ffffff" }} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
  },
  tabRow: {
    flexDirection: "row",
    height: TAB_HEIGHT,
    alignItems: "center",
    position: "relative",
  },
  activeCircle: {
    position: "absolute",
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: "#6c4ef5",
    top: (TAB_HEIGHT - CIRCLE_SIZE) / 2,
    left: 0,
    zIndex: 0,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: TAB_HEIGHT,
    zIndex: 1,
  },
  label: {
    fontSize: 11,
    marginTop: 2,
    fontFamily: "Poppins-Regular",
    color: "#687280",
  },
});
