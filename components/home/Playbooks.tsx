import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DestinationType } from "context/destination";
import Slider from "./playbooks/Slider";
import RoundButton from "components/shared/RoundButton";

type PlaybooksProps = {
  destination: DestinationType;
};

export default function Playbooks(props: PlaybooksProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom + 12 }]}>
      <Slider title={`${props.destination.name} PLAYBOOKS`} destinationUID={props.destination.uid} />
      <Slider title="LATEST TRAVEL PLAYBOOKS" />
      <RoundButton title="Create a Playbook" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    gap: 24,
  },
});
