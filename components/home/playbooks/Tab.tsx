import { StyleSheet, View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { pressedDefault } from "utils/helpers";

type TabProps = {
  title: string;
  pageTitle: string;
  destinationUID?: string;
};

export default function Tab(props: TabProps) {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.text} allowFontScaling={false}>
        {props.title}
      </Text>

      <Pressable
        onPress={() =>
          router.push({
            pathname: "/playbooks",
            params: { title: props.pageTitle, destinationUID: props.destinationUID },
          })
        }
        style={({ pressed }) => [pressedDefault(pressed), styles.link]}
        hitSlop={8}
      >
        <Text style={styles.text} allowFontScaling={false}>
          VIEW ALL
        </Text>

        <Ionicons name="arrow-forward-sharp" size={12} color="white" />
      </Pressable>
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
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    textTransform: "uppercase",
    fontSize: 12,
    fontFamily: "Neue-Haas-Grotesk",
    color: "white",
  },
  link: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
});
