import React from "react";
import { StyleSheet, View, Text, Pressable, useColorScheme } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { CreatorType } from "app/profile";
import { GemType } from "app/gem";
import CreatorIcon from "components/shared/CreatorIcon";
import { styleVars } from "utils/styles";
import { pressedDefault } from "utils/helpers";

type GemProps = {
  gem: GemType;
  hidden: boolean;
  playbook: string;
  creator?: CreatorType;
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
  HiddenBlue: require("assets/img/icon-hidden-blue.svg"),
  Hidden: require("assets/img/icon-hidden.svg"),
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
            ref: props.playbook,
          },
        })
      }
      style={({ pressed }) => [pressedDefault(pressed), styles.container]}
      hitSlop={8}
      disabled={props.hidden}
    >
      <Image
        source={
          props.hidden
            ? icons[`Hidden${colorScheme === "light" ? "Blue" : ""}`]
            : icons[
                `${props.gem.data.category.replace(/ /g, "").replace("&", "And")}${
                  colorScheme === "light" ? "Blue" : ""
                }` as keyof typeof icons
              ]
        }
        style={styles.icon}
      />

      <View style={styles.text}>
        <Text
          style={[
            props.hidden ? styles.titleHidden : styles.title,
            { color: colorScheme === "light" ? "black" : "white" },
            props.hidden && { backgroundColor: colorScheme === "light" ? styleVars.eaLightGrey : styleVars.eaGrey },
          ]}
          allowFontScaling={false}
        >
          {!props.hidden && props.gem.data.title}
        </Text>

        <Text
          style={[
            props.hidden ? styles.descriptionHidden : styles.description,
            { color: colorScheme === "light" ? styleVars.eaGrey : styleVars.eaLightGrey },
            props.hidden && { backgroundColor: colorScheme === "light" ? styleVars.eaLightGrey : styleVars.eaGrey },
          ]}
          allowFontScaling={false}
        >
          {!props.hidden && props.gem.data.description}
        </Text>
      </View>

      {!props.hidden && (
        <>
          {props.creator && <CreatorIcon creator={props.creator} iconOnly size="sml" pressDisabled />}
          <Ionicons name="chevron-forward" size={20} color={styleVars.eaLightGrey} />
        </>
      )}
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
    gap: 4,
  },
  title: {
    fontFamily: "Neue-Haas-Grotesk-Med",
    fontSize: 20,
  },
  titleHidden: {
    width: 240,
    height: 20,
  },
  description: {
    fontFamily: "Neue-Haas-Grotesk",
    fontSize: 16,
    lineHeight: 16,
  },
  descriptionHidden: {
    width: 128,
    height: 16,
  },
});
