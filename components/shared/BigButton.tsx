import { StyleSheet, Text, Pressable, View } from "react-native";
import { useRouter } from "expo-router";
import * as Device from "expo-device";
import { Image } from "expo-image";
import { pressedDefault } from "utils/helpers";
import { styleVars } from "utils/styles";

type BigButtonProps = {
  title: string;
};

export default function BigButton(props: BigButtonProps) {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => router.push("/playbooks")}
        style={({ pressed }) => [pressedDefault(pressed), styles.button, Device.deviceType === 2 && { width: 256 }]}
        hitSlop={16}
      >
        <Image source={require("assets/img/icon-playbook.svg")} style={styles.icon} contentFit="contain" />

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
    padding: 12,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    backgroundColor: "white",
    flexDirection: "row",
  },
  icon: {
    width: 28,
    height: 20,
    marginRight: 8,
  },
  text: {
    fontSize: 18,
    fontFamily: "Neue-Haas-Grotesk",
    color: styleVars.eaBlue,
  },
});
