import { StyleSheet, Text, Pressable, View } from "react-native";
import { useRouter } from "expo-router";
import * as Device from "expo-device";
import { pressedDefault } from "utils/helpers";
import { styleVars } from "utils/styles";

type RoundButtonProps = {
  title: string;
};

export default function RoundButton(props: RoundButtonProps) {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => router.push("/playbooks")}
        style={({ pressed }) => [pressedDefault(pressed), styles.button, Device.deviceType === 2 && { width: 256 }]}
        hitSlop={12}
      >
        <Text style={styles.text} allowFontScaling={false}>
          {props.title}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    alignItems: "center",
  },
  button: {
    borderWidth: 1,
    padding: 12,
    borderColor: "white",
    borderRadius: 999,
    alignItems: "center",
    width: "100%",
    backgroundColor: "white",
  },
  text: {
    fontSize: 18,
    fontFamily: "Neue-Haas-Grotesk",
    color: styleVars.eaBlue,
  },
});
