import { StyleSheet, View, Text, useColorScheme } from "react-native";
import { Image } from "expo-image";
import { GemType } from "app/gem";
import BigButton from "components/shared/BigButton";
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
      <View style={styles.header}>
        <View style={styles.iconAndText}>
          <Image
            source={icons[props.selectedGem?.data.category.replace(/ /g, "").replace("&", "And") as keyof typeof icons]}
            style={styles.icon}
          />

          <View>
            <Text style={styles.title} allowFontScaling={false}>
              {props.selectedGem?.data.title}
            </Text>

            <Text style={styles.description} allowFontScaling={false}>
              {props.selectedGem?.data.description}
            </Text>
          </View>
        </View>

        <Text
          style={[styles.address, { color: colorScheme === "light" ? styleVars.eaGrey : styleVars.eaLightGrey }]}
          allowFontScaling={false}
        >
          {props.selectedGem?.data.address}
        </Text>
      </View>

      <BigButton
        title="More Info"
        icon="gem"
        route={{
          pathname: "/gem",
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 24,
  },
  header: {
    marginHorizontal: 16,
    gap: 12,
  },
  iconAndText: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  icon: {
    width: 48,
    height: 48,
  },
  title: {
    fontFamily: "Neue-Haas-Grotesk-Med",
    fontSize: 24,
    color: styleVars.eaBlue,
  },
  description: {
    fontFamily: "Neue-Haas-Grotesk",
    fontSize: 16,
    color: styleVars.eaBlue,
  },
  address: {
    fontFamily: "Neue-Haas-Grotesk",
    fontSize: 14,
  },
});
