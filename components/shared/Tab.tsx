import { StyleSheet, View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { Href } from "expo-router/build/link/href";
import Ionicons from "@expo/vector-icons/Ionicons";
import { pressedDefault } from "utils/helpers";

type TabRoute = {
  pathname: string;
  params: {
    headerTitle?: string;
    destinationUID?: string;
  };
};

type TabProps = {
  title: string;
  cta?: string;
  route?: TabRoute;
};

export default function Tab(props: TabProps) {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.text} allowFontScaling={false}>
        {props.title}
      </Text>

      {props.route && (
        <Pressable
          onPress={() => router.push(props.route as Href)}
          style={({ pressed }) => [pressedDefault(pressed), styles.link]}
          hitSlop={8}
        >
          <Text style={styles.text} allowFontScaling={false}>
            {props.cta}
          </Text>

          <Ionicons name="arrow-forward-sharp" size={12} color="white" />
        </Pressable>
      )}
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
    marginBottom: 8,
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
