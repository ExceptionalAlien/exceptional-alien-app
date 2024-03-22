import React from "react";
import { StyleSheet, View, Text, useColorScheme } from "react-native";
import { CreatorType } from "app/profile";
import CreatorIcon from "components/shared/CreatorIcon";
import BigButton from "components/shared/BigButton";

type DescriptionProps = {
  text: string;
  curators?: CreatorType[];
  locked: boolean;
};

export default function Description(props: DescriptionProps) {
  const colorScheme = useColorScheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.text, { color: colorScheme === "light" ? "black" : "white" }]}>{props.text}</Text>

      {props.curators && props.curators.length > 0 && (
        <View style={styles.curators}>
          <Text
            style={[styles.curatedBy, { color: colorScheme === "light" ? "black" : "white" }]}
            allowFontScaling={false}
          >
            Curated by
          </Text>

          <View style={styles.list}>
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

      {props.locked && <BigButton title="Unlock Playbook" icon="lock" home price="4.99" />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    gap: 16,
  },
  text: {
    fontFamily: "Neue-Haas-Grotesk",
    fontSize: 16,
    maxWidth: 768,
    marginHorizontal: 16,
  },
  curators: {
    marginHorizontal: 16,
  },
  curatedBy: {
    fontFamily: "Neue-Haas-Grotesk-Med",
    fontSize: 14,
    marginBottom: 4,
  },
  list: {
    flexDirection: "row",
    gap: 12,
    flexWrap: "wrap",
  },
});
