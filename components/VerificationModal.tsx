import { useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  visible: boolean;
  email: string;
  onClose: () => void;
}

export function VerificationModal({ visible, email, onClose }: Props) {
  const [code, setCode] = useState("");
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (visible) {
      setCode("");
      const timer = setTimeout(() => inputRef.current?.focus(), 150);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  function handleCodeChange(text: string) {
    const digits = text.replace(/\D/g, "").slice(0, 6);
    setCode(digits);
    if (digits.length === 6) {
      setTimeout(() => router.replace("/"), 300);
    }
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.kav}
      >
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.backdrop} />
        </TouchableWithoutFeedback>

        <View style={styles.sheet}>
          {/* Handle bar */}
          <View style={styles.handle} />

          {/* Close button */}
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Ionicons name="close" size={22} color="#687280" />
          </TouchableOpacity>

          <Text style={styles.title}>Check your email</Text>
          <Text style={styles.subtitle}>
            {"We sent a 6-digit code to "}
            <Text style={styles.emailHighlight}>{email || "your email"}</Text>
            {". Enter it below."}
          </Text>

          {/* 6-digit boxes */}
          <TouchableWithoutFeedback onPress={() => inputRef.current?.focus()}>
            <View style={styles.digitsRow}>
              {Array.from({ length: 6 }).map((_, i) => (
                <View
                  key={i}
                  style={[
                    styles.digitBox,
                    i === code.length && styles.digitBoxActive,
                    i < code.length && styles.digitBoxFilled,
                  ]}
                >
                  <Text style={styles.digitText}>{code[i] ?? ""}</Text>
                </View>
              ))}
            </View>
          </TouchableWithoutFeedback>

          <View style={styles.resendRow}>
            <Text style={styles.resendText}>Didn't receive it? </Text>
            <TouchableOpacity>
              <Text style={styles.resendLink}>Resend code</Text>
            </TouchableOpacity>
          </View>

          {/* Hidden input that captures keypad input */}
          <TextInput
            ref={inputRef}
            value={code}
            onChangeText={handleCodeChange}
            keyboardType="number-pad"
            maxLength={6}
            caretHidden
            style={styles.hiddenInput}
          />
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  kav: { flex: 1 },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  sheet: {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 48,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#e5e7eb",
    alignSelf: "center",
    marginBottom: 20,
  },
  closeBtn: {
    position: "absolute",
    top: 20,
    right: 20,
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: "Poppins-Bold",
    fontSize: 22,
    color: "#0d132b",
    marginTop: 4,
  },
  subtitle: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#687280",
    marginTop: 8,
    lineHeight: 22,
  },
  emailHighlight: {
    fontFamily: "Poppins-SemiBold",
    color: "#0d132b",
  },
  digitsRow: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    marginTop: 32,
  },
  digitBox: {
    width: 48,
    height: 58,
    borderWidth: 1.5,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f6f7fb",
  },
  digitBoxActive: {
    borderColor: "#5838f6",
    backgroundColor: "#ffffff",
  },
  digitBoxFilled: {
    borderColor: "#e5e7eb",
    backgroundColor: "#ffffff",
  },
  digitText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 22,
    color: "#0d132b",
  },
  resendRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 28,
  },
  resendText: {
    fontFamily: "Poppins-Regular",
    fontSize: 13,
    color: "#687280",
  },
  resendLink: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 13,
    color: "#5838f6",
  },
  hiddenInput: {
    position: "absolute",
    opacity: 0,
    width: 1,
    height: 1,
  },
});
