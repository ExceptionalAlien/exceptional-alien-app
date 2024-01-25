import { SafeAreaView, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";
import Title from "./header/Title";
import Nav from "./header/Nav";
import { Destination } from "./Map";

interface HeaderProps {
  destination: Destination;
}

export default function Header(props: HeaderProps) {
  return (
    <BlurView style={styles.container}>
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
    paddingTop: 12,
  },
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
