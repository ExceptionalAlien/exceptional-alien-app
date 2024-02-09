import { StyleSheet, View, Text } from "react-native";

type TabProps = {
  title: string;
};

export default function Tab(props: TabProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text} allowFontScaling={false}>
        {props.title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderBottomWidth: 0,
    padding: 8,
    borderColor: "white",
    marginHorizontal: 16,
    marginBottom: 12,
  },
  text: {
    textTransform: "uppercase",
    fontSize: 12,
    lineHeight: 12,
    fontFamily: "Neue-Haas-Grotesk",
    color: "white",
  },
});
