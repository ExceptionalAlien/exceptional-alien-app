import React from "react";
import { StyleSheet, View, Text, useColorScheme } from "react-native";
import Tab from "components/shared/Tab";

type AboutProps = {
  text: string;
  website: string;
};

export default function About(props: AboutProps) {
  const colorScheme = useColorScheme();

  return (
    <View style={styles.container}>
      <Tab title="About" cta="Website" url={props.website} />
      <Text style={[styles.text, { color: colorScheme === "light" ? "black" : "white" }]}>{props.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 24,
  },
  text: {
    fontFamily: "Neue-Haas-Grotesk",
    marginHorizontal: 16,
    fontSize: 16,
  },
});
