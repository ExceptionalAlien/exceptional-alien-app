import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, useWindowDimensions, Pressable } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import * as Device from "expo-device";
import Ionicons from "@expo/vector-icons/Ionicons";
import { GemType } from "app/gem";
import { storeData, getData } from "utils/helpers";
import { styleVars } from "utils/styles";
import { pressedDefault } from "utils/helpers";

type HeaderProps = {
  gem: GemType;
};

const icons = {
  FoodAndDrink: require("assets/img/icon-food-and-drink.svg"),
  Culture: require("assets/img/icon-culture.svg"),
  Nature: require("assets/img/icon-nature.svg"),
  Retail: require("assets/img/icon-retail.svg"),
  Neighbourhoods: require("assets/img/icon-neighbourhoods.svg"),
  Wellness: require("assets/img/icon-wellness.svg"),
  Events: require("assets/img/icon-events.svg"),
  Accommodation: require("assets/img/icon-accommodation.svg"),
};

export default function Header(props: HeaderProps) {
  const { width, height } = useWindowDimensions();
  const [isFav, setIsFav] = useState(false);
  const blurhash = "L0MtaO?bfQ?b~qj[fQj[fQfQfQfQ";

  const toggleFav = async () => {
    const favs = await getData("favs");
    var updated: string[] = favs ? favs : [];

    if (updated.includes(props.gem.uid)) {
      // Remove
      const index = updated.indexOf(props.gem.uid);
      updated.splice(index, 1);
      setIsFav(false);
    } else {
      // Add
      updated.push(props.gem.uid);
      setIsFav(true);
    }

    storeData("favs", updated);
  };

  const setFav = async () => {
    const favs = await getData("favs");
    setIsFav(favs && favs.includes(props.gem.uid) ? true : false);
  };

  useEffect(() => {
    setFav();
  }, [props.gem]);

  return (
    <View style={{ aspectRatio: Device.deviceType !== 2 ? "4/2" : width >= height ? "6/1" : "5/2" }}>
      <Image source={props.gem.data.image.url} placeholder={blurhash} transition={500} style={styles.hero} />
      <LinearGradient colors={["rgba(0,0,0,0.5)", "transparent", "rgba(0,0,0,0.75)"]} style={styles.gradient} />

      <View style={styles.heading}>
        <Image
          source={icons[props.gem.data.category.replace(/ /g, "").replace("&", "And") as keyof typeof icons]}
          style={styles.icon}
        />

        <View style={styles.text}>
          <Text style={styles.title} allowFontScaling={false}>
            {props.gem.data.title}
          </Text>

          <Text style={styles.description} allowFontScaling={false}>
            {props.gem.data.description}
          </Text>

          <Text style={styles.address} allowFontScaling={false}>
            {props.gem.data.address}
          </Text>
        </View>
      </View>

      <Pressable onPress={toggleFav} style={({ pressed }) => [pressedDefault(pressed), styles.fav]}>
        <Ionicons name={isFav ? "heart" : "heart-outline"} size={28} color={isFav ? "pink" : "white"} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    width: "100%",
    height: "100%",
  },
  gradient: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  heading: {
    position: "absolute",
    gap: 8,
    flexDirection: "row",
    alignItems: "center",
    bottom: 0,
    padding: 8,
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
    color: "white",
    fontSize: 20,
  },
  description: {
    fontFamily: "Neue-Haas-Grotesk",
    fontSize: 16,
    lineHeight: 16,
    color: "white",
  },
  address: {
    fontFamily: "Neue-Haas-Grotesk",
    fontSize: 14,
    color: styleVars.eaLightGrey,
  },
  fav: {
    position: "absolute",
    right: 0,
    padding: 8,
  },
});
