import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DestinationType } from "context/destination";
import Slider from "./playbooks/Slider";

type PlaybooksProps = {
  destination: DestinationType;
};

export default function Playbooks(props: PlaybooksProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom + 12 }]}>
      <Slider title={`${props.destination.name} PLAYBOOKS`} destination={props.destination} />
      <Slider title="LATEST TRAVEL PLAYBOOKS" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 24,
    marginTop: 12,
  },
});
