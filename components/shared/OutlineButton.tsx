import React from "react";
import { StyleSheet, Pressable, Text, useColorScheme } from "react-native";
import { Image } from "expo-image";
import { pressedDefault } from "utils/helpers";
import { styleVars } from "utils/styles";

type OutlineButtonProps = {
  title: string;
  category?: boolean;
};

const icons = {
  FoodAndDrinkWhite: require("assets/img/food-and-drink-white.svg"),
  FoodAndDrink: require("assets/img/food-and-drink.svg"),
  CultureWhite: require("assets/img/culture-white.svg"),
  Culture: require("assets/img/culture.svg"),
  NatureWhite: require("assets/img/nature-white.svg"),
  Nature: require("assets/img/nature.svg"),
  RetailWhite: require("assets/img/retail-white.svg"),
  Retail: require("assets/img/retail.svg"),
  NeighbourhoodsWhite: require("assets/img/neighbourhoods-white.svg"),
  Neighbourhoods: require("assets/img/neighbourhoods.svg"),
  WellnessWhite: require("assets/img/wellness-white.svg"),
  Wellness: require("assets/img/wellness.svg"),
  EventsWhite: require("assets/img/events-white.svg"),
  Events: require("assets/img/events.svg"),
  AccommodationWhite: require("assets/img/accommodation-white.svg"),
  Accommodation: require("assets/img/accommodation.svg"),
};

export default function OutlineButton(props: OutlineButtonProps) {
  const colorScheme = useColorScheme();

  const press = () => {};

  return (
    <Pressable
      onPress={press}
      style={({ pressed }) => [
        pressedDefault(pressed),
        styles.button,
        { borderColor: colorScheme === "light" ? styleVars.eaBlue : "white" },
      ]}
      hitSlop={4}
    >
      {props.category && (
        <Image
          source={
            icons[
              `${props.title.replace(/ /g, "").replace("&", "And")}${
                colorScheme === "dark" ? "White" : ""
              }` as keyof typeof icons
            ]
          }
          style={styles.icon}
          contentFit="contain"
        />
      )}

      <Text style={[styles.text, { color: colorScheme === "light" ? styleVars.eaBlue : "white" }]}>
        {props.title.replace("Neighbourhoods", "Neighborhoods")}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 16,
    height: 16,
    marginRight: 4,
  },
  text: {
    fontFamily: "Neue-Haas-Grotesk",
    fontSize: 16,
  },
});
