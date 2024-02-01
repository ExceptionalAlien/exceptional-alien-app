import { SafeAreaView, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
import { DestinationType } from "context/destination";
import Title from "./header/Title";
import Nav from "./header/Nav";

interface HeaderProps {
  destination: DestinationType;
}

export default function Header(props: HeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <BlurView style={[styles.container, { paddingTop: insets.top + 12 }]}>
      <SafeAreaView style={styles.wrapper}>
        <Title destination={props.destination} />
        <Nav />
      </SafeAreaView>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    padding: 16,
    paddingBottom: 12,
  },
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
