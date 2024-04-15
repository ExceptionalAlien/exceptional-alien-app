import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  useWindowDimensions,
  Pressable,
  Linking,
  Platform,
  ActivityIndicator,
} from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import * as Device from "expo-device";
import Ionicons from "@expo/vector-icons/Ionicons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FavsContext, FavsContextType } from "context/favs";
import { GemType } from "app/gem";
import { storeData, getData, pressedDefault, StoredItem } from "utils/helpers";
import { styleVars } from "utils/styles";

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
  const { favs, setFavs } = useContext<FavsContextType>(FavsContext);
  const [isFav, setIsFav] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  const toggleFav = async () => {
    const favsData = await getData("favGems");
    const updated: StoredItem[] = favsData ? favsData : [];
    const item = updated.find((item: StoredItem) => item.uid === props.gem.uid);

    if (item) {
      // Remove
      const index = updated.indexOf(item);
      updated.splice(index, 1);
      setIsFav(false);
    } else {
      // Add
      updated.push({
        uid: props.gem.uid as string,
        title: props.gem.data.title,
        subTitle: props.gem.data.description,
        destination: props.gem.data.destination?.data.title,
      });

      setIsFav(true);
    }

    storeData("favGems", updated); // Store
    setFavs(updated); // Update context
  };

  const setFav = async () => {
    const favsData = await getData("favGems");
    setIsFav(favsData && favsData.find((item: StoredItem) => item.uid === props.gem.uid) ? true : false);
  };

  const openMaps = () => {
    const url = Platform.select({
      ios: `maps:0,0?q=${props.gem.data.address}`,
      android: `geo:0,0?q=${props.gem.data.address}`,
    });

    Linking.openURL(url as string);
  };

  useEffect(() => {
    setFav();
  }, [props.gem, favs]);

  return (
    <View style={{ aspectRatio: Device.deviceType !== 2 ? "4/2" : width >= height ? "6/1" : "5/2" }}>
      <View style={styles.bg} />

      <Image
        source={props.gem.data.image.seo.url}
        transition={500}
        style={styles.hero}
        recyclingKey={props.gem.uid}
        onLoadStart={() => setShowLoader(true)}
        onLoadEnd={() => setShowLoader(false)}
      />

      <ActivityIndicator style={styles.loader} color="white" animating={showLoader} />

      <LinearGradient
        colors={["rgba(0,0,0,0.5)", "transparent", "transparent", "rgba(0,0,0,0.5)", "rgba(0,0,0,0.75)"]}
        locations={[0, 0.25, 0.5, 0.75, 1]}
        style={styles.gradient}
      />

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

          <Pressable onPress={openMaps} style={({ pressed }) => pressedDefault(pressed)} hitSlop={8}>
            <Text style={styles.address} allowFontScaling={false}>
              {props.gem.data.address}{" "}
              <MaterialCommunityIcons name="arrow-u-right-top" size={16} color={styleVars.eaLightGrey} />
            </Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.toolbar}>
        <Pressable
          onPress={() => alert("Will ask which Playbook to add Gem to or create a new Playbook")}
          style={({ pressed }) => pressedDefault(pressed)}
        >
          <Ionicons name="add-circle-outline" size={28} color="white" />
        </Pressable>

        <Pressable onPress={toggleFav} style={({ pressed }) => pressedDefault(pressed)}>
          <Ionicons name={isFav ? "heart" : "heart-outline"} size={28} color={isFav ? styleVars.eaRed : "white"} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bg: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: styleVars.eaBlue,
  },
  hero: {
    width: "100%",
    height: "100%",
  },
  loader: {
    position: "absolute",
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
  toolbar: {
    position: "absolute",
    right: 0,
    padding: 8,
    flexDirection: "row",
    gap: 12,
  },
});
