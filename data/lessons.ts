import type { Lesson } from "@/types/learning";

export const lessons: Lesson[] = [
  // ─── Spanish Unit 1 ───────────────────────────────────────────────────────

  {
    id: "es-u1-l1",
    unitId: "es-unit-1",
    title: "Hello & Goodbye",
    description: "Learn the most common Spanish greetings.",
    orderIndex: 1,
    xpReward: 10,
    durationMinutes: 5,
    goals: [
      { description: "Say hello in Spanish", xpReward: 3 },
      { description: "Say goodbye in Spanish", xpReward: 3 },
      { description: "Use formal and informal greetings", xpReward: 4 },
    ],
    activities: [
      {
        type: "vocabulary",
        items: [
          { word: "Hola", translation: "Hello", pronunciation: "OH-lah" },
          { word: "Adiós", translation: "Goodbye", pronunciation: "ah-DYOS" },
          { word: "Buenos días", translation: "Good morning", pronunciation: "BWEH-nos DEE-as" },
          { word: "Buenas noches", translation: "Good night", pronunciation: "BWEH-nas NO-ches" },
        ],
      },
      {
        type: "multiple_choice",
        question: "How do you say 'Hello' in Spanish?",
        options: ["Adiós", "Hola", "Gracias", "Por favor"],
        correctIndex: 1,
      },
      {
        type: "match",
        pairs: [
          { left: "Hola", right: "Hello" },
          { left: "Adiós", right: "Goodbye" },
          { left: "Buenos días", right: "Good morning" },
        ],
      },
    ],
    aiTeacherPrompt: {
      intro: "¡Hola! Let's learn basic Spanish greetings together. I'll guide you through each word step by step.",
      encouragement: "¡Muy bien! You're doing great. Keep going!",
      correction: "Not quite — let's try that one again. Listen closely.",
      completion: "¡Excelente! You've mastered basic greetings. You're off to a great start!",
    },
  },

  {
    id: "es-u1-l2",
    unitId: "es-unit-1",
    title: "Introducing Yourself",
    description: "Tell people your name and ask theirs.",
    orderIndex: 2,
    xpReward: 10,
    durationMinutes: 5,
    goals: [
      { description: "Say your name in Spanish", xpReward: 5 },
      { description: "Ask someone their name", xpReward: 5 },
    ],
    activities: [
      {
        type: "phrase",
        items: [
          {
            phrase: "Me llamo...",
            translation: "My name is...",
            pronunciation: "meh YAH-moh",
            context: "Use this to introduce yourself.",
          },
          {
            phrase: "¿Cómo te llamas?",
            translation: "What is your name?",
            pronunciation: "KOH-moh teh YAH-mas",
            context: "Ask someone's name informally.",
          },
          {
            phrase: "Mucho gusto",
            translation: "Nice to meet you",
            pronunciation: "MOO-cho GOOS-toh",
          },
        ],
      },
      {
        type: "multiple_choice",
        question: "How do you say 'My name is...' in Spanish?",
        options: ["¿Cómo te llamas?", "Mucho gusto", "Me llamo...", "Hola"],
        correctIndex: 2,
      },
      {
        type: "speak",
        prompt: "Say your name in Spanish",
        targetPhrase: "Me llamo",
      },
    ],
    aiTeacherPrompt: {
      intro: "Now let's learn how to introduce ourselves. This is one of the first things you'll say to any new Spanish speaker!",
      encouragement: "¡Perfecto! Your pronunciation is improving.",
      correction: "Close! Pay attention to the accent on that syllable.",
      completion: "¡Fantástico! You can now introduce yourself in Spanish.",
    },
  },

  {
    id: "es-u1-l3",
    unitId: "es-unit-1",
    title: "Polite Expressions",
    description: "Please, thank you, and you're welcome.",
    orderIndex: 3,
    xpReward: 10,
    durationMinutes: 5,
    goals: [
      { description: "Say please and thank you", xpReward: 5 },
      { description: "Respond to thanks politely", xpReward: 5 },
    ],
    activities: [
      {
        type: "vocabulary",
        items: [
          { word: "Por favor", translation: "Please", pronunciation: "por fah-VOR" },
          { word: "Gracias", translation: "Thank you", pronunciation: "GRAH-syahs" },
          { word: "De nada", translation: "You're welcome", pronunciation: "deh NAH-dah" },
          { word: "Perdón", translation: "Excuse me / Sorry", pronunciation: "per-DON" },
        ],
      },
      {
        type: "match",
        pairs: [
          { left: "Gracias", right: "Thank you" },
          { left: "Por favor", right: "Please" },
          { left: "De nada", right: "You're welcome" },
        ],
      },
    ],
    aiTeacherPrompt: {
      intro: "Being polite goes a long way! Let's learn the essential courtesy phrases in Spanish.",
      encouragement: "¡Muy bien! Politeness will take you far.",
      correction: "Almost there — let's hear that one more time.",
      completion: "¡Excelente! You now know how to be polite in Spanish. ¡Mucho gusto!",
    },
  },

  // ─── Spanish Unit 2 ───────────────────────────────────────────────────────

  {
    id: "es-u2-l1",
    unitId: "es-unit-2",
    title: "Numbers 1–10",
    description: "Count from one to ten in Spanish.",
    orderIndex: 1,
    xpReward: 10,
    durationMinutes: 5,
    goals: [
      { description: "Count to 10 in Spanish", xpReward: 10 },
    ],
    activities: [
      {
        type: "vocabulary",
        items: [
          { word: "uno", translation: "1" },
          { word: "dos", translation: "2" },
          { word: "tres", translation: "3" },
          { word: "cuatro", translation: "4" },
          { word: "cinco", translation: "5" },
          { word: "seis", translation: "6" },
          { word: "siete", translation: "7" },
          { word: "ocho", translation: "8" },
          { word: "nueve", translation: "9" },
          { word: "diez", translation: "10" },
        ],
      },
      {
        type: "multiple_choice",
        question: "What is 'cinco' in English?",
        options: ["3", "4", "5", "6"],
        correctIndex: 2,
      },
    ],
    aiTeacherPrompt: {
      intro: "Let's count! Numbers are the foundation of so many conversations. Ready?",
      encouragement: "¡Bien! Keep counting!",
      correction: "Not that one — let's count together again.",
      completion: "¡Diez de diez! Perfect score — you can count to 10 in Spanish!",
    },
  },

  {
    id: "es-u2-l2",
    unitId: "es-unit-2",
    title: "Basic Colors",
    description: "Learn the names of common colors in Spanish.",
    orderIndex: 2,
    xpReward: 10,
    durationMinutes: 5,
    goals: [
      { description: "Name 6 colors in Spanish", xpReward: 10 },
    ],
    activities: [
      {
        type: "vocabulary",
        items: [
          { word: "rojo", translation: "red" },
          { word: "azul", translation: "blue" },
          { word: "verde", translation: "green" },
          { word: "amarillo", translation: "yellow" },
          { word: "blanco", translation: "white" },
          { word: "negro", translation: "black" },
        ],
      },
      {
        type: "match",
        pairs: [
          { left: "rojo", right: "red" },
          { left: "azul", right: "blue" },
          { left: "verde", right: "green" },
        ],
      },
    ],
    aiTeacherPrompt: {
      intro: "Colors make the world beautiful — and learning them in Spanish is really fun!",
      encouragement: "¡Colorido! Great job!",
      correction: "Hmm, not that color. Let's look again.",
      completion: "¡Fantástico! You can now describe colors in Spanish!",
    },
  },

  // ─── French Unit 1 ────────────────────────────────────────────────────────

  {
    id: "fr-u1-l1",
    unitId: "fr-unit-1",
    title: "Hello & Goodbye",
    description: "Learn the most common French greetings.",
    orderIndex: 1,
    xpReward: 10,
    durationMinutes: 5,
    goals: [
      { description: "Say hello and goodbye in French", xpReward: 5 },
      { description: "Use formal and informal greetings", xpReward: 5 },
    ],
    activities: [
      {
        type: "vocabulary",
        items: [
          { word: "Bonjour", translation: "Hello / Good day", pronunciation: "bohn-ZHOOR" },
          { word: "Salut", translation: "Hi (informal)", pronunciation: "sah-LU" },
          { word: "Au revoir", translation: "Goodbye", pronunciation: "oh ruh-VWAHR" },
          { word: "Bonne nuit", translation: "Good night", pronunciation: "bun NWEE" },
        ],
      },
      {
        type: "multiple_choice",
        question: "Which word means 'Goodbye' in French?",
        options: ["Bonjour", "Salut", "Au revoir", "Merci"],
        correctIndex: 2,
      },
    ],
    aiTeacherPrompt: {
      intro: "Bonjour! Welcome to French. Let's start with the greetings you'll use every single day.",
      encouragement: "Très bien! You're doing wonderfully.",
      correction: "Pas tout à fait — not quite. Listen again and try.",
      completion: "Magnifique! You've learned your first French greetings!",
    },
  },

  {
    id: "fr-u1-l2",
    unitId: "fr-unit-1",
    title: "Introducing Yourself",
    description: "Tell people your name and ask theirs in French.",
    orderIndex: 2,
    xpReward: 10,
    durationMinutes: 5,
    goals: [
      { description: "Introduce yourself in French", xpReward: 5 },
      { description: "Ask someone's name in French", xpReward: 5 },
    ],
    activities: [
      {
        type: "phrase",
        items: [
          {
            phrase: "Je m'appelle...",
            translation: "My name is...",
            pronunciation: "zhuh mah-PEL",
          },
          {
            phrase: "Comment tu t'appelles?",
            translation: "What is your name?",
            pronunciation: "koh-MAH tu tah-PEL",
            context: "Informal way to ask someone's name.",
          },
          {
            phrase: "Enchanté(e)",
            translation: "Nice to meet you",
            pronunciation: "ahn-shahn-TAY",
          },
        ],
      },
      {
        type: "match",
        pairs: [
          { left: "Je m'appelle...", right: "My name is..." },
          { left: "Enchanté", right: "Nice to meet you" },
        ],
      },
    ],
    aiTeacherPrompt: {
      intro: "Now let's learn how to introduce yourself in French. C'est facile — it's easy!",
      encouragement: "Excellent! You sound very French already.",
      correction: "Almost! French has some silent letters — let me show you.",
      completion: "Bravo! You can now introduce yourself in French. Enchanté!",
    },
  },

  // ─── Japanese Unit 1 ──────────────────────────────────────────────────────

  {
    id: "ja-u1-l1",
    unitId: "ja-unit-1",
    title: "Basic Greetings",
    description: "Learn essential Japanese greetings for any time of day.",
    orderIndex: 1,
    xpReward: 10,
    durationMinutes: 5,
    goals: [
      { description: "Greet someone at any time of day", xpReward: 5 },
      { description: "Say goodbye in Japanese", xpReward: 5 },
    ],
    activities: [
      {
        type: "vocabulary",
        items: [
          { word: "おはよう", translation: "Good morning", pronunciation: "o-ha-YO" },
          { word: "こんにちは", translation: "Hello / Good afternoon", pronunciation: "kon-ni-CHI-wa" },
          { word: "こんばんは", translation: "Good evening", pronunciation: "kom-BAN-wa" },
          { word: "さようなら", translation: "Goodbye", pronunciation: "sa-yo-NA-ra" },
          { word: "じゃあね", translation: "See you (informal)", pronunciation: "ja-A-ne" },
        ],
      },
      {
        type: "multiple_choice",
        question: "Which phrase means 'Good morning' in Japanese?",
        options: ["こんにちは", "さようなら", "おはよう", "こんばんは"],
        correctIndex: 2,
      },
    ],
    aiTeacherPrompt: {
      intro: "こんにちは! Japanese greetings change based on the time of day. Let me show you how.",
      encouragement: "いいですね！ That's great! Keep it up!",
      correction: "もう一度 — one more time. You're getting there!",
      completion: "すばらしい！ Wonderful! You've learned Japanese greetings!",
    },
  },

  {
    id: "ja-u1-l2",
    unitId: "ja-unit-1",
    title: "Thank You & Sorry",
    description: "Learn polite expressions that are used constantly in Japanese.",
    orderIndex: 2,
    xpReward: 10,
    durationMinutes: 5,
    goals: [
      { description: "Express thanks in Japanese", xpReward: 5 },
      { description: "Apologize politely in Japanese", xpReward: 5 },
    ],
    activities: [
      {
        type: "vocabulary",
        items: [
          { word: "ありがとう", translation: "Thank you", pronunciation: "a-ri-GA-to" },
          { word: "ありがとうございます", translation: "Thank you (formal)", pronunciation: "a-ri-ga-to go-ZA-i-mas" },
          { word: "すみません", translation: "Excuse me / Sorry", pronunciation: "su-mi-MA-sen" },
          { word: "ごめんなさい", translation: "I'm sorry", pronunciation: "go-men-NA-sa-i" },
        ],
      },
      {
        type: "match",
        pairs: [
          { left: "ありがとう", right: "Thank you" },
          { left: "すみません", right: "Excuse me" },
          { left: "ごめんなさい", right: "I'm sorry" },
        ],
      },
    ],
    aiTeacherPrompt: {
      intro: "Politeness is extremely important in Japanese culture. These phrases will take you far!",
      encouragement: "上手！ Well done! Your Japanese is sounding natural.",
      correction: "もう一度お願いします — please try one more time.",
      completion: "完璧！ Perfect! You've mastered essential polite expressions in Japanese!",
    },
  },

  // ─── Portuguese Unit 1 ────────────────────────────────────────────────────

  {
    id: "pt-u1-l1",
    unitId: "pt-unit-1",
    title: "Hello & Goodbye",
    description: "Learn everyday Portuguese greetings.",
    orderIndex: 1,
    xpReward: 10,
    durationMinutes: 5,
    goals: [
      { description: "Say hello and goodbye in Portuguese", xpReward: 5 },
      { description: "Use morning and evening greetings", xpReward: 5 },
    ],
    activities: [
      {
        type: "vocabulary",
        items: [
          { word: "Olá", translation: "Hello", pronunciation: "oh-LAH" },
          { word: "Oi", translation: "Hi (informal)", pronunciation: "oy" },
          { word: "Bom dia", translation: "Good morning", pronunciation: "bom JEE-ah" },
          { word: "Boa noite", translation: "Good night", pronunciation: "BOH-ah NOY-chee" },
          { word: "Tchau", translation: "Bye", pronunciation: "CHOW" },
        ],
      },
      {
        type: "multiple_choice",
        question: "How do you say 'Good morning' in Portuguese?",
        options: ["Boa noite", "Olá", "Bom dia", "Tchau"],
        correctIndex: 2,
      },
    ],
    aiTeacherPrompt: {
      intro: "Olá! Welcome to Portuguese! Let's start with greetings — you'll use these every day.",
      encouragement: "Muito bem! Very good! Keep going!",
      correction: "Quase lá — almost there! Listen one more time.",
      completion: "Parabéns! Congratulations — you've learned Portuguese greetings!",
    },
  },

  {
    id: "pt-u1-l2",
    unitId: "pt-unit-1",
    title: "Introducing Yourself",
    description: "Tell people your name and ask theirs in Portuguese.",
    orderIndex: 2,
    xpReward: 10,
    durationMinutes: 5,
    goals: [
      { description: "Introduce yourself in Portuguese", xpReward: 5 },
      { description: "Ask someone's name in Portuguese", xpReward: 5 },
    ],
    activities: [
      {
        type: "phrase",
        items: [
          {
            phrase: "Meu nome é...",
            translation: "My name is...",
            pronunciation: "MEU NO-mee EH",
          },
          {
            phrase: "Como você se chama?",
            translation: "What is your name?",
            pronunciation: "KO-mo vo-SAY see SHA-mah",
          },
          {
            phrase: "Prazer em conhecer",
            translation: "Nice to meet you",
            pronunciation: "pra-ZER em ko-NYE-ser",
          },
        ],
      },
      {
        type: "match",
        pairs: [
          { left: "Meu nome é...", right: "My name is..." },
          { left: "Prazer em conhecer", right: "Nice to meet you" },
        ],
      },
    ],
    aiTeacherPrompt: {
      intro: "Agora let's learn how to introduce yourself. This is a great moment in any new language!",
      encouragement: "Ótimo! Excellent work!",
      correction: "Tente novamente — try again, you're close!",
      completion: "Perfeito! You can now introduce yourself in Portuguese. Prazer em conhecer você!",
    },
  },
];

export function getLessonById(id: string): Lesson | undefined {
  return lessons.find((l) => l.id === id);
}

export function getLessonsByUnit(unitId: string): Lesson[] {
  return lessons
    .filter((l) => l.unitId === unitId)
    .sort((a, b) => a.orderIndex - b.orderIndex);
}
