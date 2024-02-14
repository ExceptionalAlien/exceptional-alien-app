import { StyleSheet, View } from "react-native";
import { DestinationType } from "context/destination";
import Slider from "./playbooks/Slider";
import CreateButton from "./playbooks/CreateButton";

type PlaybooksProps = {
  destination: DestinationType;
};

export default function Playbooks(props: PlaybooksProps) {
  return (
    <View style={[styles.container]}>
      <Slider destination={props.destination} />
      <Slider />
      <CreateButton title="Create a Playbook" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 24,
  },
});
