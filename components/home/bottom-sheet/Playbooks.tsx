import React from "react";
import { StyleSheet, View } from "react-native";
import { DestinationType } from "context/destination";
import { GemType } from "app/gem";
import PlaybookSlider from "components/shared/PlaybookSlider";
import BigButton from "components/shared/BigButton";

type PlaybooksProps = {
  destination: DestinationType;
  selectedGem: GemType | undefined;
};

export default function Playbooks(props: PlaybooksProps) {
  return (
    <View style={[styles.container, props.selectedGem && { display: "none" }]}>
      {props.destination.uid && <PlaybookSlider destination={props.destination} />}
      <PlaybookSlider />

      <BigButton
        title="Create a Playbook"
        icon="playbook"
        route={{
          pathname: "/create-playbook",
        }}
        bgColor="white"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 24,
  },
});
