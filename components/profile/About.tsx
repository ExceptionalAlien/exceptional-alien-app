import React from "react";
import { StyleSheet, View, Text, useColorScheme } from "react-native";
import { CreatorType } from "app/profile";
import Tab from "components/shared/Tab";

type AboutProps = {
  description: CreatorType["data"]["description"];
  website: string;
  instagram: string;
};

export default function About(props: AboutProps) {
  const colorScheme = useColorScheme();

  return (
    <View>
      <Tab title="ABOUT" url={props.website} instagram={props.instagram} />

      <View style={styles.description}>
        {props.description.map((item, i) => (
          <Text key={i} style={[styles.text, { color: colorScheme === "light" ? "black" : "white" }]}>
            {item.text}
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  description: {
    gap: 8,
    marginHorizontal: 16,
  },
  text: {
    fontFamily: "Neue-Haas-Grotesk",
    fontSize: 16,
  },
});
