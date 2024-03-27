import React from "react";
import { StyleSheet, View, Text, useColorScheme } from "react-native";
import { Image } from "expo-image";
import { styleVars } from "utils/styles";

type HeaderProps = {
  title: string;
  category: string;
  description: string;
};

const icons = {
  FoodAndDrinkBlue: require("assets/img/icon-food-and-drink-blue.svg"),
  FoodAndDrink: require("assets/img/icon-food-and-drink.svg"),
  CultureBlue: require("assets/img/icon-culture-blue.svg"),
  Culture: require("assets/img/icon-culture.svg"),
  NatureBlue: require("assets/img/icon-nature-blue.svg"),
  Nature: require("assets/img/icon-nature.svg"),
  RetailBlue: require("assets/img/icon-retail-blue.svg"),
  Retail: require("assets/img/icon-retail.svg"),
  NeighbourhoodsBlue: require("assets/img/icon-neighbourhoods-blue.svg"),
  Neighbourhoods: require("assets/img/icon-neighbourhoods.svg"),
  WellnessBlue: require("assets/img/icon-wellness-blue.svg"),
  Wellness: require("assets/img/icon-wellness.svg"),
  EventsBlue: require("assets/img/icon-events-blue.svg"),
  Events: require("assets/img/icon-events.svg"),
  AccommodationBlue: require("assets/img/icon-accommodation-blue.svg"),
  Accommodation: require("assets/img/icon-accommodation.svg"),
};

export default function Header(props: HeaderProps) {
  const colorScheme = useColorScheme();

  return (
    <View style={styles.container}>
      <Image
        source={
          icons[
            `${props.category.replace(/ /g, "").replace("&", "And")}${
              colorScheme === "light" ? "Blue" : ""
            }` as keyof typeof icons
          ]
        }
        style={styles.icon}
      />

      <View style={styles.text}>
        <Text
          style={[styles.title, { color: colorScheme === "light" ? styleVars.eaBlue : "white" }]}
          allowFontScaling={false}
        >
          {props.title}
        </Text>

        <Text
          style={[styles.description, { color: colorScheme === "light" ? styleVars.eaGrey : styleVars.eaLightGrey }]}
          allowFontScaling={false}
        >
          {props.description}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  icon: {
    width: 48,
    height: 48,
  },
  text: {
    flex: 1,
  },
  title: {
    fontFamily: "Neue-Haas-Grotesk-Med",
    fontSize: 24,
  },
  description: {
    fontFamily: "Neue-Haas-Grotesk",
    fontSize: 18,
  },
});
