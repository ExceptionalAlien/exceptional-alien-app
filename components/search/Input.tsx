import { StyleSheet, View, TextInput, useColorScheme } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { styleVars } from "utils/styles";

interface InputProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

export default function Input(props: InputProps) {
  const colorScheme = useColorScheme();
  const themeContainerStyle = colorScheme === "light" ? styles.lightContainer : styles.darkContainer;

  return (
    <View style={[styles.container, themeContainerStyle]}>
      <Ionicons name="search-outline" size={24} color={styleVars.eaBlue} />

      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          onChangeText={props.setQuery}
          value={props.query}
          placeholder="Destinations, Playbooks & more"
          placeholderTextColor={styleVars.eaPlaceholderBlue}
          returnKeyType="search"
          allowFontScaling={false}
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
  lightContainer: {
    backgroundColor: "white",
  },
  darkContainer: {
    backgroundColor: styleVars.eaGrey,
  },
  inputWrapper: {
    flex: 1,
    flexGrow: 1,
  },
  input: {
    fontSize: 24,
    fontFamily: "Neue-Haas-Grotesk",
    borderBottomWidth: 1,
    paddingBottom: 2,
    borderColor: styleVars.eaBlue,
  },
});
