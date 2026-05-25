import type { Unit } from "@/types/learning";

export const units: Unit[] = [
  // Spanish
  {
    id: "es-unit-1",
    languageCode: "es",
    title: "Basic Greetings",
    description: "Say hello, goodbye, and introduce yourself in Spanish.",
    orderIndex: 1,
    color: "#FF6B6B",
    iconEmoji: "👋",
    lessonIds: ["es-u1-l1", "es-u1-l2", "es-u1-l3"],
  },
  {
    id: "es-unit-2",
    languageCode: "es",
    title: "Numbers & Colors",
    description: "Count to 20 and name common colors.",
    orderIndex: 2,
    color: "#4ECDC4",
    iconEmoji: "🔢",
    lessonIds: ["es-u2-l1", "es-u2-l2"],
  },

  // French
  {
    id: "fr-unit-1",
    languageCode: "fr",
    title: "Basic Greetings",
    description: "Say hello, goodbye, and introduce yourself in French.",
    orderIndex: 1,
    color: "#6C4EF5",
    iconEmoji: "👋",
    lessonIds: ["fr-u1-l1", "fr-u1-l2"],
  },

  // Japanese
  {
    id: "ja-unit-1",
    languageCode: "ja",
    title: "Basic Greetings",
    description: "Learn essential Japanese greetings and polite expressions.",
    orderIndex: 1,
    color: "#FF8A00",
    iconEmoji: "🙇",
    lessonIds: ["ja-u1-l1", "ja-u1-l2"],
  },

  // Portuguese
  {
    id: "pt-unit-1",
    languageCode: "pt",
    title: "Basic Greetings",
    description: "Say hello and introduce yourself in Portuguese.",
    orderIndex: 1,
    color: "#21C168",
    iconEmoji: "👋",
    lessonIds: ["pt-u1-l1", "pt-u1-l2"],
  },
];

export function getUnitsByLanguage(languageCode: string): Unit[] {
  return units
    .filter((u) => u.languageCode === languageCode)
    .sort((a, b) => a.orderIndex - b.orderIndex);
}

export function getUnitById(id: string): Unit | undefined {
  return units.find((u) => u.id === id);
}
