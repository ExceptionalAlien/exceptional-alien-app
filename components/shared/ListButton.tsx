import React from "react";
import { StyleSheet, Pressable, Text, useColorScheme, View } from "react-native";
import { useRouter } from "expo-router";
import { Href } from "expo-router/build/link/href";
import Ionicons from "@expo/vector-icons/Ionicons";
import { pressedDefault } from "utils/helpers";
import { styleVars } from "utils/styles";

type Route = {
  pathname: string;
  params?: { headerTitle: string };
};

type ListButtonProps = {
  title: string;
  icon?: string;
  count?: number;
  route?: Route;
};

export default function ListButton(props: ListButtonProps) {
  const colorScheme = useColorScheme();
  const router = useRouter();

  const press = () => {
    if (props.route) router.push(props.route as Href);
  };

  return (
    <Pressable onPress={press} style={({ pressed }) => [pressedDefault(pressed), styles.button]} hitSlop={8}>
      <View style={styles.group}>
        {props.icon && (
          <Ionicons
            name={props.icon as any}
            size={28}
            color={props.icon === "heart" ? styleVars.eaRed : colorScheme === "light" ? "black" : "white"}
          />
        )}

        <Text style={[styles.text, { color: colorScheme === "light" ? "black" : "white" }]} allowFontScaling={false}>
          {props.title}
        </Text>
      </View>

      <View style={styles.group}>
        <Text style={[styles.text, { color: colorScheme === "light" ? "black" : "white" }]} allowFontScaling={false}>
          {props.count}
        </Text>

        <Ionicons name="chevron-forward" size={20} color={styleVars.eaLightGrey} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    marginHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  group: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  text: {
    fontFamily: "Neue-Haas-Grotesk",
    fontSize: 18,
  },
});
