import { View, StyleSheet, Text, useColorScheme } from "react-native";
import { Stack } from "expo-router";
import { styleVars } from "utils/styles";

export default function Profile() {
  const colorScheme = useColorScheme();
  const themeContainerStyle = colorScheme === "light" ? styles.lightContainer : styles.darkContainer;

  return (
    <View style={[styles.container, themeContainerStyle]}>
      <Stack.Screen
        options={{
          title: "Search",
        }}
      />

      <Text style={styles.text}>Hello world!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  lightContainer: {
    backgroundColor: "white",
  },
  darkContainer: {
    backgroundColor: styleVars.eaGrey,
  },
  text: {
    fontFamily: "Neue-Haas-Grotesk",
    color: styleVars.eaBlue,
  },
});
