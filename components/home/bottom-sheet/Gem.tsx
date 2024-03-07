import React from "react";
import { StyleSheet, View, Text, useColorScheme } from "react-native";
import { Image } from "expo-image";
import { GemType } from "app/gem";
import BigButton from "components/shared/BigButton";
import QuoteSlider from "components/shared/QuoteSlider";
import { styleVars } from "utils/styles";

type GemProps = {
  selectedGem: GemType | undefined;
};

const icons = {
  FoodAndDrink: require("assets/img/icon-food-and-drink.png"),
  Culture: require("assets/img/icon-culture.png"),
  Nature: require("assets/img/icon-nature.png"),
  Retail: require("assets/img/icon-retail.png"),
  Neighbourhoods: require("assets/img/icon-neighbourhoods.png"),
  Wellness: require("assets/img/icon-wellness.png"),
  Events: require("assets/img/icon-events.png"),
  Accommodation: require("assets/img/icon-accommodation.png"),
};

export default function Gem(props: GemProps) {
  const colorScheme = useColorScheme();

  return (
    <View style={[styles.container, !props.selectedGem && { display: "none" }]}>
      {!props.selectedGem?.hidden ? (
        <>
          <View style={styles.header}>
            <Image
              source={
                icons[props.selectedGem?.data.category.replace(/ /g, "").replace("&", "And") as keyof typeof icons]
              }
              style={styles.icon}
            />

            <View style={styles.text}>
              <Text style={styles.title} allowFontScaling={false}>
                {props.selectedGem?.data.title}
              </Text>

              <Text style={styles.description} allowFontScaling={false}>
                {props.selectedGem?.data.description}
              </Text>

              <Text
                style={[styles.address, { color: colorScheme === "light" ? styleVars.eaGrey : styleVars.eaLightGrey }]}
                allowFontScaling={false}
              >
                {props.selectedGem?.data.address}
              </Text>
            </View>
          </View>

          {props.selectedGem?.data.playbooks.length && (
            <QuoteSlider gem={props.selectedGem.uid} playbooks={props.selectedGem.data.playbooks} size="sml" />
          )}

          <BigButton
            title="More Info"
            icon="gem"
            route={{
              pathname: "/gem",
            }}
          />
        </>
      ) : (
        <Text style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 16, textAlign: "center" }}>
          WIP - Will show purchasable Playbooks that hidden gem is featured in
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  header: {
    marginHorizontal: 16,
    gap: 8,
    flexDirection: "row",
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
    fontSize: 20,
  },
  description: {
    fontFamily: "Neue-Haas-Grotesk",
    fontSize: 16,
    lineHeight: 16,
    color: styleVars.eaBlue,
  },
  address: {
    fontFamily: "Neue-Haas-Grotesk",
    fontSize: 14,
  },
});
