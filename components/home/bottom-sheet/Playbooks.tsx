import { StyleSheet, View } from "react-native";
import { DestinationType } from "context/destination";
import PlaybookSlider from "components/shared/PlaybookSlider";
import BigButton from "components/shared/BigButton";

type PlaybooksProps = {
  destination: DestinationType;
};

export default function Playbooks(props: PlaybooksProps) {
  return (
    <View style={[styles.container]}>
      <PlaybookSlider destination={props.destination} />
      <PlaybookSlider />

      <BigButton
        title="Create a Playbook"
        icon="playbook"
        route={{
          pathname: "/create-playbook",
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 24,
  },
});
