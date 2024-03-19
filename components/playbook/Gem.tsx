import React from "react";
import { StyleSheet, View, Text, Pressable, useColorScheme } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { GemType } from "app/gem";
import { styleVars } from "utils/styles";
import { pressedDefault } from "utils/helpers";

const icons = {
  FoodAndDrink: require("assets/img/icon-food-and-drink-blue.svg"),
  Culture: require("assets/img/icon-culture-blue.svg"),
  Nature: require("assets/img/icon-nature-blue.svg"),
  Retail: require("assets/img/icon-retail-blue.svg"),
  Neighbourhoods: require("assets/img/icon-neighbourhoods-blue.svg"),
  Wellness: require("assets/img/icon-wellness-blue.svg"),
  Events: require("assets/img/icon-events-blue.svg"),
  Accommodation: require("assets/img/icon-accommodation-blue.svg"),
};

type GemProps = {
  gem: GemType;
};

export default function Gem(props: GemProps) {
  const colorScheme = useColorScheme();
  const router = useRouter();

  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/gem",
          params: {
            uid: props.gem.uid,
          },
        })
      }
      style={({ pressed }) => [pressedDefault(pressed), styles.container]}
      hitSlop={8}
    >
      <Image
        source={icons[props.gem.data.category.replace(/ /g, "").replace("&", "And") as keyof typeof icons]}
        style={styles.icon}
      />

      <View style={styles.text}>
        <Text style={[styles.title, { color: colorScheme === "light" ? "black" : "white" }]} allowFontScaling={false}>
          {props.gem.data.title}
        </Text>

        <Text
          style={[styles.description, { color: colorScheme === "light" ? styleVars.eaGrey : styleVars.eaLightGrey }]}
          allowFontScaling={false}
        >
          {props.gem.data.description}
        </Text>
      </View>

      <Ionicons name="chevron-forward" size={20} color={styleVars.eaLightGrey} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  icon: {
    width: 40,
    height: 40,
  },
  text: {
    flex: 1,
  },
  title: {
    fontFamily: "Neue-Haas-Grotesk-Med",
    fontSize: 20,
  },
  description: {
    fontFamily: "Neue-Haas-Grotesk",
    fontSize: 16,
  },
});
