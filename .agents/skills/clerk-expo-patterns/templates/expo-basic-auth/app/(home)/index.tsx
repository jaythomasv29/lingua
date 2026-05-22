import { Show, useClerk, useUser } from "@clerk/expo";
import { Link } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Page() {
  const { user } = useUser();
  const { signOut } = useClerk();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome!</Text>
      <Show when="signed-out">
        <Link href="/(auth)/sign-in">
          <Text style={styles.link}>Sign in</Text>
        </Link>
        <Link href="/(auth)/sign-up">
          <Text style={styles.link}>Sign up</Text>
        </Link>
      </Show>
      <Show when="signed-in">
        <Text>Hello {user?.id}</Text>
        {/* <Pressable style={styles.button} >
          <Text style={styles.buttonText}>Sign out</Text>
        </Pressable> */}
        <TouchableOpacity onPress={() => signOut()}>
          <Text style={styles.link}>Sign out</Text>
        </TouchableOpacity>
      </Show>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 60, gap: 16 },
  title: { fontSize: 24, fontWeight: "bold" },
  button: {
    backgroundColor: "#0a7ea4",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "600" },
  link: { color: "#6c4ef5" },
});
