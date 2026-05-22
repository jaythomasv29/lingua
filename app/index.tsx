import { useAuth } from "@clerk/expo";
import { useUser } from "@clerk/expo";
import { Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const { signOut, isSignedIn } = useAuth();
  const { user } = useUser();

  async function handleSignOut() {
    await signOut();
  }

  if (!isSignedIn) return null;

  return (
    <View className="flex-1 bg-white items-center justify-center px-6">
      <Text className="h1 text-primary mb-2 text-center">lingua</Text>
      {user?.primaryEmailAddress?.emailAddress ? (
        <Text className="body-sm text-secondary mb-10 text-center">
          {user.primaryEmailAddress.emailAddress}
        </Text>
      ) : null}
      <TouchableOpacity
        className="bg-lingua-deep-purple rounded-[18px] w-full py-4 items-center"
        onPress={handleSignOut}
        activeOpacity={0.85}
      >
        <Text
          className="text-white text-[16px]"
          style={{ fontFamily: "Poppins-SemiBold" }}
        >
          Sign Out
        </Text>
      </TouchableOpacity>
    </View>
  );
}
