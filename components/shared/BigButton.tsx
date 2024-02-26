import { StyleSheet, Text, Pressable, View } from "react-native";
import { useRouter } from "expo-router";
import * as Device from "expo-device";
import { Image } from "expo-image";
import { Href } from "expo-router/build/link/href";
import { pressedDefault } from "utils/helpers";
import { styleVars } from "utils/styles";

type BigButtonRoute = {
  pathname: string;
};

type BigButtonProps = {
  title: string;
  route?: BigButtonRoute;
  icon?: string; // playbook, gem
  bgColor?: string;
};

export default function BigButton(props: BigButtonProps) {
  const router = useRouter();

  const icons = {
    playbook: require("assets/img/icon-playbook.svg"),
    gem: require("assets/img/icon-gem.svg"),
  };

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => router.push(props.route as Href)}
        style={({ pressed }) => [
          pressedDefault(pressed),
          styles.button,
          Device.deviceType === 2 && { width: 256 },
          props.bgColor !== "" && { backgroundColor: props.bgColor },
        ]}
        hitSlop={8}
      >
        {props.icon && (
          <Image
            source={icons[props.icon as keyof typeof icons]}
            style={[styles.icon, props.icon === "playbook" && { width: 28 }]}
            contentFit="contain"
          />
        )}

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
    flexDirection: "row",
    borderWidth: 1,
    borderColor: styleVars.eaBlue,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  text: {
    fontSize: 18,
    fontFamily: "Neue-Haas-Grotesk",
    color: styleVars.eaBlue,
  },
});
