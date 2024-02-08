import { StyleSheet, View, TextInput, useColorScheme } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { styleVars } from "utils/styles";

type InputProps = {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
};

export default function Input(props: InputProps) {
  const colorScheme = useColorScheme();

  const searchClick = () => {
    if (props.query.length > 1) {
      alert("WIP - will query Prismic");
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colorScheme === "light" ? "white" : styleVars.eaGrey }]}>
      <Ionicons name="search-outline" size={28} color={styleVars.eaBlue} />

      <View style={styles.inputWrapper}>
        <TextInput
          style={[styles.input, colorScheme !== "light" && { color: "white" }]}
          onChangeText={props.setQuery}
          value={props.query}
          placeholder="Destinations, Playbooks & more"
          returnKeyType="search"
          allowFontScaling={false}
          onSubmitEditing={searchClick}
          clearButtonMode="always"
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
    borderColor: styleVars.eaBlue,
  },
  input: {
    fontSize: 24,
    fontFamily: "Neue-Haas-Grotesk",
  },
});
