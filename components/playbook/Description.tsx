import React from "react";
import { StyleSheet, View, Text, useColorScheme } from "react-native";
import { CreatorType } from "app/profile";
import CreatorIcon from "components/shared/CreatorIcon";

type DescriptionProps = {
  text: string;
  curators?: CreatorType[];
};

export default function Description(props: DescriptionProps) {
  const colorScheme = useColorScheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.text, { color: colorScheme === "light" ? "black" : "white" }]}>{props.text}</Text>

      {props.curators && props.curators.length > 0 && (
        <View>
          <Text
            style={[styles.curatedBy, { color: colorScheme === "light" ? "black" : "white" }]}
            allowFontScaling={false}
          >
            Curated by
          </Text>

          <View style={styles.curators}>
            {props.curators.map((item, index) => (
              <CreatorIcon
                key={index}
                creator={item}
                size={props.curators && props.curators?.length > 1 ? "sml" : "med"}
              />
            ))}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginBottom: 24,
    gap: 16,
  },
  text: {
    fontFamily: "Neue-Haas-Grotesk",
    fontSize: 16,
    maxWidth: 768,
  },
  curatedBy: {
    fontFamily: "Neue-Haas-Grotesk-Med",
    fontSize: 14,
    marginBottom: 4,
  },
  curators: {
    flexDirection: "row",
    gap: 12,
    flexWrap: "wrap",
  },
});
