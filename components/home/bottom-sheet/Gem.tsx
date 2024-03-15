import React from "react";
import { StyleSheet, View } from "react-native";
import { GemType } from "app/gem";
import BigButton from "components/shared/BigButton";
import QuoteSlider from "components/shared/QuoteSlider";
import Header from "./gem/Header";

type GemProps = {
  selectedGem: GemType;
};

export default function Gem(props: GemProps) {
  return (
    <View style={[styles.container, !props.selectedGem && { display: "none" }]}>
      <Header gem={props.selectedGem} />
      <QuoteSlider gem={props.selectedGem.uid} playbooks={props.selectedGem.data.playbooks} />

      <BigButton
        title="More Info"
        icon="gem"
        route={{
          pathname: "/gem",
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
});
