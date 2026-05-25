import type { Language } from "@/types/learning";

export const languages: Language[] = [
  {
    code: "es",
    name: "Spanish",
    nativeName: "Español",
    flag: "https://flagcdn.com/w320/es.png",
    color: "#FF6B35",
    description: "The world's second most spoken language by native speakers.",
    learnerCount: "28.4M learners",
  },
  {
    code: "fr",
    name: "French",
    nativeName: "Français",
    flag: "https://flagcdn.com/w320/fr.png",
    color: "#0055A4",
    description: "The language of love, cuisine, and diplomacy.",
    learnerCount: "19.4M learners",
  },
  {
    code: "ja",
    name: "Japanese",
    nativeName: "日本語",
    flag: "https://flagcdn.com/w320/jp.png",
    color: "#BC002D",
    description: "A fascinating language with three writing systems.",
    learnerCount: "12.7M learners",
  },
  // {
  //   code: "ko",
  //   name: "Korean",
  //   nativeName: "한국어",
  //   flag: "https://flagcdn.com/w320/kr.png",
  //   color: "#003478",
  //   description:
  //     "The official language of South Korea, known for K-pop and K-drama.",
  //   learnerCount: "9.3M learners",
  // },
  {
    code: "de",
    name: "German",
    nativeName: "Deutsch",
    flag: "https://flagcdn.com/w320/de.png",
    color: "#FFCC00",
    description: "The most widely spoken native language in Europe.",
    learnerCount: "8.1M learners",
  },
  // {
  //   code: "zh",
  //   name: "Chinese",
  //   nativeName: "中文",
  //   flag: "https://flagcdn.com/w320/cn.png",
  //   color: "#DE2910",
  //   description: "The world's most spoken language by number of speakers.",
  //   learnerCount: "7.4M learners",
  // },
  // {
  //   code: "pt",
  //   name: "Portuguese",
  //   nativeName: "Português",
  //   flag: "https://flagcdn.com/w320/pt.png",
  //   color: "#009C3B",
  //   description: "Spoken across Brazil and Portugal, rich in culture.",
  //   learnerCount: "15.2M learners",
  // },
];

export function getLanguageByCode(code: string): Language | undefined {
  return languages.find((l) => l.code === code);
}
