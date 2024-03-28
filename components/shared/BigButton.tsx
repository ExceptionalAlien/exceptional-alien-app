import React from "react";
import { StyleSheet, Text, Pressable, View } from "react-native";
import { useRouter } from "expo-router";
import * as Device from "expo-device";
import { Image } from "expo-image";
import { Href } from "expo-router/build/link/href";
import Ionicons from "@expo/vector-icons/Ionicons";
import { pressedDefault } from "utils/helpers";
import { styleVars } from "utils/styles";

type BigButtonRoute = {
  pathname: string;
  params?: { uid: string };
};

type BigButtonProps = {
  title: string;
  route?: BigButtonRoute;
  icon?: string; // playbook, gem
  bgColor?: string;
  home?: boolean;
  disabled?: boolean;
  price?: string;
  alert?: string;
};

const icons = {
  playbook: require("assets/img/icon-playbook-white.svg"),
  playbookBlue: require("assets/img/icon-playbook-blue.svg"),
  gem: require("assets/img/icon-gem-white.svg"),
  gemBlue: require("assets/img/icon-gem-blue.svg"),
};

export default function BigButton(props: BigButtonProps) {
  const router = useRouter();

  const press = () => {
    if (props.home) {
      router.navigate("/");
    } else if (props.alert) {
      alert(props.alert);
    } else {
      router.push(props.route as Href);
    }
  };

  return (
    <View style={[styles.container, props.disabled && { opacity: 0.5 }]}>
      <Pressable
        onPress={press}
        style={({ pressed }) => [
          pressedDefault(pressed),
          styles.button,
          Device.deviceType === 2 && { width: 256 },
          { backgroundColor: props.bgColor ? props.bgColor : styleVars.eaBlue },
        ]}
        hitSlop={8}
        disabled={props.disabled ? true : false}
      >
        {props.icon === "gem" || props.icon === "playbook" ? (
          <Image
            source={icons[`${props.icon}${props.bgColor === "white" ? "Blue" : ""}` as keyof typeof icons]}
            style={[styles.icon, props.icon === "playbook" && { width: 28 }]}
            contentFit="contain"
          />
        ) : (
          props.icon && <Ionicons name={props.icon as any} size={20} color="white" style={styles.icon} />
        )}

        <Text
          style={[styles.text, { color: props.bgColor === "white" ? styleVars.eaBlue : "white" }]}
          allowFontScaling={false}
        >
          {props.title}
        </Text>

        {props.price && <Text style={styles.price}>${props.price}</Text>}
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
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  text: {
    fontSize: 18,
    fontFamily: "Neue-Haas-Grotesk",
  },
  price: {
    fontFamily: "Neue-Haas-Grotesk-Med",
    fontSize: 18,
    marginLeft: 8,
    color: "white",
  },
});
