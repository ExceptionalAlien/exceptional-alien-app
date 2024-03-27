import React from "react";
import { StyleSheet, View, TextInput, useColorScheme } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Device from "expo-device";
import { styleVars } from "utils/styles";

type InputProps = {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
  searchClick: () => void;
};

export default function Input(props: InputProps) {
  const colorScheme = useColorScheme();

  return (
    <View style={[styles.container, { backgroundColor: colorScheme === "light" ? "white" : "black" }]}>
      <Ionicons name="search-outline" size={24} color={colorScheme === "light" ? styleVars.eaBlue : "white"} />

      <View
        style={[
          styles.inputWrapper,
          Device.deviceType === 2 && { maxWidth: 384 },
          { borderColor: colorScheme === "light" ? styleVars.eaBlue : "white" },
        ]}
      >
        <TextInput
          style={[styles.input, colorScheme === "dark" && { color: "white" }]}
          onChangeText={props.setQuery}
          value={props.query}
          placeholder={props.placeholder}
          returnKeyType="search"
          allowFontScaling={false}
          onSubmitEditing={props.searchClick}
          clearButtonMode="always"
          cursorColor={styleVars.eaBlue}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    columnGap: 4,
    padding: 16,
    paddingTop: 0,
    alignItems: "center",
  },
  inputWrapper: {
    flex: 1,
    flexGrow: 1,
    borderBottomWidth: 1,
    paddingBottom: 4,
  },
  input: {
    fontSize: 20,
    fontFamily: "Neue-Haas-Grotesk",
  },
});
