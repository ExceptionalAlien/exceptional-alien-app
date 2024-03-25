import React from "react";
import { StyleSheet, View, ScrollView, Text, useColorScheme } from "react-native";
import { Image } from "expo-image";
import { styleVars } from "utils/styles";

type HeaderProps = {
  title: string;
  category: string;
  description: string;
};

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

export default function Header(props: HeaderProps) {
  const colorScheme = useColorScheme();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={icons[props.category.replace(/ /g, "").replace("&", "And") as keyof typeof icons]}
        style={styles.icon}
      />

      <View style={styles.text}>
        <Text style={styles.title} allowFontScaling={false}>
          {props.title}
        </Text>

        <Text
          style={[styles.description, { color: colorScheme === "light" ? styleVars.eaGrey : styleVars.eaLightGrey }]}
          allowFontScaling={false}
        >
          {props.description}
        </Text>
      </View>
    </ScrollView>
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
    color: styleVars.eaBlue,
    fontSize: 24,
  },
  description: {
    fontFamily: "Neue-Haas-Grotesk",
    fontSize: 18,
  },
});
