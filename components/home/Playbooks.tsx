import { StyleSheet, View } from "react-native";
import * as Device from "expo-device";
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
    <View style={[styles.container, { paddingBottom: insets.bottom + 16, gap: Device.deviceType === 2 ? 24 : 16 }]}>
      <Slider title={`${props.destination.name} PLAYBOOKS`} destination={props.destination} />
      <Slider title="LATEST TRAVEL PLAYBOOKS" />
      <RoundButton title="Create a Playbook" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
  },
});
