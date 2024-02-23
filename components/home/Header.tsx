import { StyleSheet, Platform, useColorScheme } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
import { DestinationType } from "context/destination";
import Title from "./header/Title";
import Nav from "./header/Nav";

type HeaderProps = {
  destination: DestinationType;
};

export default function Header(props: HeaderProps) {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();

  return (
    <BlurView
      style={[
        styles.container,
        { paddingTop: insets.top + 12 },
        Platform.OS === "android" && {
          backgroundColor: colorScheme === "light" ? "rgba(255, 255, 255, 0.8)" : "rgba(124, 124, 124, 0.8)",
        },
      ]}
    >
      <Title destination={props.destination} />
      <Nav />
    </BlurView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    paddingHorizontal: 16,
    paddingBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
