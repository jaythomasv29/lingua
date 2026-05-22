import { Text, TouchableOpacity, View } from "react-native";

interface Props {
  icon: React.ReactNode;
  label: string;
  onPress?: () => void;
}

export function SocialButton({ icon, label, onPress }: Props) {
  return (
    <TouchableOpacity
      className="flex-row items-center border border-border rounded-[14px] py-3.5 px-4"
      activeOpacity={0.8}
      onPress={onPress}
    >
      <View className="w-7">{icon}</View>
      <Text
        className="flex-1 text-center text-primary body-md"
        style={{ fontFamily: "Poppins-Medium" }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}
