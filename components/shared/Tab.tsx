import React, { useContext } from "react";
import { StyleSheet, View, Text, Pressable, useColorScheme, Linking } from "react-native";
import { useRouter } from "expo-router";
import { Image } from "expo-image";
import { Href } from "expo-router/build/link/href";
import Ionicons from "@expo/vector-icons/Ionicons";
import destinationsData from "data/destinations.json";
import { DestinationContext, DestinationContextType, DestinationType } from "context/destination";
import { FiltersContext, FiltersContextType } from "context/filters";
import { pressedDefault, storeData } from "utils/helpers";
import { styleVars } from "utils/styles";

type TabRoute = {
  pathname: string;
  params: {
    headerTitle?: string;
    destinationUID?: string;
  };
};

type TabProps = {
  title: string;
  cta?: string;
  route?: TabRoute;
  destination?: string;
  blueBg?: boolean;
  icon?: string;
  url?: string;
  filterReset?: boolean;
  instagram?: string;
};

const icons = {
  place: require("assets/img/icon-place.svg"),
  placeWhite: require("assets/img/icon-place-white.svg"),
  gem: require("assets/img/icon-gem.svg"),
  gemWhite: require("assets/img/icon-gem-white.svg"),
  playbook: require("assets/img/icon-playbook.svg"),
  playbookWhite: require("assets/img/icon-playbook-white.svg"),
};

export default function Tab(props: TabProps) {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const { setDestination } = useContext<DestinationContextType>(DestinationContext);
  const { filters, setFilters } = useContext<FiltersContextType>(FiltersContext);

  const destinationClick = () => {
    const data = JSON.stringify(destinationsData);
    const destinations: DestinationType[] = JSON.parse(data);
    const destination = destinations.filter((item) => item.uid === props.destination); // Find destination by uid
    setDestination(destination[0]); // Set context
    storeData("destination", destination[0]);

    // Back to home
    router.navigate({
      pathname: "/",
    });
  };

  return (
    <View style={[styles.container, { borderColor: props.blueBg || colorScheme === "dark" ? "white" : "black" }]}>
      <View style={styles.iconText}>
        {props.icon && (
          <Image
            source={
              icons[
                colorScheme === "light" && !props.blueBg
                  ? (props.icon as keyof typeof icons)
                  : (`${props.icon}White` as keyof typeof icons)
              ]
            }
            style={styles.icon}
            contentFit="contain"
          />
        )}

        <Text
          style={[styles.text, { color: props.blueBg || colorScheme === "dark" ? "white" : "black" }]}
          allowFontScaling={false}
        >
          {props.title}
        </Text>
      </View>

      <View style={styles.cta}>
        {props.instagram && (
          <Pressable
            onPress={() => Linking.openURL(("https://instagram.com/" + props.instagram) as string)}
            style={({ pressed }) => [pressedDefault(pressed), styles.iconText]}
            hitSlop={8}
          >
            <Ionicons
              name="logo-instagram"
              size={20}
              color={props.blueBg || colorScheme === "dark" ? "white" : styleVars.eaBlue}
            />
          </Pressable>
        )}

        {props.route ? (
          <Pressable
            onPress={() => router.push(props.route as Href)}
            style={({ pressed }) => [pressedDefault(pressed), styles.iconText]}
            hitSlop={8}
          >
            <Text
              style={[styles.text, { color: props.blueBg || colorScheme === "dark" ? "white" : styleVars.eaBlue }]}
              allowFontScaling={false}
            >
              {props.cta}
            </Text>

            <Ionicons
              name="arrow-forward-sharp"
              size={12}
              color={props.blueBg || colorScheme === "dark" ? "white" : styleVars.eaBlue}
            />
          </Pressable>
        ) : props.destination ? (
          <Pressable
            onPress={destinationClick}
            style={({ pressed }) => [pressedDefault(pressed), styles.iconText]}
            hitSlop={8}
          >
            <Image
              source={icons[colorScheme === "light" ? "place" : "placeWhite"]}
              style={[styles.icon, { width: 12 }]}
              contentFit="contain"
            />

            <Text
              style={[styles.text, { color: props.blueBg || colorScheme === "dark" ? "white" : styleVars.eaBlue }]}
              allowFontScaling={false}
            >
              {props.cta}
            </Text>
          </Pressable>
        ) : props.filterReset && filters.categories.length ? (
          <Pressable
            onPress={() => setFilters({ ...filters, categories: [] })}
            style={({ pressed }) => [pressedDefault(pressed), styles.iconText]}
            hitSlop={8}
          >
            <Text
              style={[styles.text, { color: props.blueBg || colorScheme === "dark" ? "white" : styleVars.eaBlue }]}
              allowFontScaling={false}
            >
              RESET
            </Text>
          </Pressable>
        ) : (
          props.url && (
            <Pressable
              onPress={() => Linking.openURL(props.url as string)}
              style={({ pressed }) => [pressedDefault(pressed), styles.iconText]}
              hitSlop={8}
            >
              <Ionicons
                name="globe-outline"
                size={props.cta ? 16 : 20}
                color={props.blueBg || colorScheme === "dark" ? "white" : styleVars.eaBlue}
              />

              {props.cta && (
                <Text
                  style={[styles.text, { color: props.blueBg || colorScheme === "dark" ? "white" : styleVars.eaBlue }]}
                  allowFontScaling={false}
                >
                  {props.cta}
                </Text>
              )}
            </Pressable>
          )
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderBottomWidth: 0,
    padding: 8,
    marginHorizontal: 16,
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cta: {
    flexDirection: "row",
    gap: 16,
  },
  iconText: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  icon: {
    width: 16,
    height: 16,
  },
  text: {
    textTransform: "uppercase",
    fontSize: 12,
    fontFamily: "Neue-Haas-Grotesk",
  },
});
