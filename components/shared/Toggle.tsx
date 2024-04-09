import React, { useContext } from "react";
import { View, StyleSheet, Switch, Text, useColorScheme } from "react-native";
import { Image } from "expo-image";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FiltersContext, FiltersContextType, FiltersType } from "context/filters";
import { styleVars } from "utils/styles";

type ToggleProps = {
  label: string;
  icon?: string;
  filter?: string;
};

const icons = {
  playbookWhite: require("assets/img/icon-playbook-white.svg"),
  playbook: require("assets/img/icon-playbook.svg"),
};

export default function Toggle(props: ToggleProps) {
  const colorScheme = useColorScheme();
  const { filters, setFilters } = useContext<FiltersContextType>(FiltersContext);

  const toggleSwitch = () => {
    if (props.filter) {
      if (filters[props.filter as keyof FiltersType]) {
        // Off
        setFilters({ ...filters, [props.filter]: false });
      } else {
        // On
        setFilters({ ...filters, [props.filter]: true });
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.label}>
        {props.icon && props.icon === "playbook" ? (
          <Image
            source={icons[`${props.icon}${colorScheme === "dark" ? "White" : ""}` as keyof typeof icons]}
            style={styles.icon}
            contentFit="contain"
          />
        ) : (
          props.icon && (
            <Ionicons
              name={props.icon as any}
              size={28}
              color={props.icon === "heart" ? styleVars.eaRed : colorScheme === "light" ? "black" : "white"}
            />
          )
        )}

        <Text style={[styles.text, { color: colorScheme === "light" ? "black" : "white" }]}>{props.label}</Text>
      </View>

      <Switch
        trackColor={{
          false: colorScheme === "light" ? styleVars.eaLightGrey : styleVars.eaGrey,
          true: styleVars.eaBlue,
        }}
        thumbColor="white"
        ios_backgroundColor={colorScheme === "light" ? styleVars.eaLightGrey : styleVars.eaGrey}
        onValueChange={toggleSwitch}
        value={props.filter !== "" && (filters[props.filter as keyof FiltersType] as boolean)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  label: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  icon: {
    width: 28,
    height: 28,
  },
  text: {
    fontFamily: "Neue-Haas-Grotesk",
    fontSize: 18,
  },
});
