export const colors = {
  linguaPurple: '#6C4EF5',
  linguaDeepPurple: '#5838F6',
  linguaBlue: '#4D88FF',
  linguaGreen: '#21C168',
  success: '#2FC16B',
  warning: '#FFC800',
  streak: '#FF8A00',
  error: '#FF4D4F',
  info: '#4D88FF',
  primary: '#0D132B',
  secondary: '#687280',
  border: '#E5E7EB',
  surface: '#F6F7FB',
  background: '#FFFFFF',
} as const;

export type ColorKey = keyof typeof colors;
