import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { GemType } from "app/gem";
import BigButton from "components/shared/BigButton";
import QuoteSlider from "components/shared/QuoteSlider";
import Header from "./gem/Header";

type GemProps = {
  selectedGem: GemType | undefined;
};

export default function Gem(props: GemProps) {
  return (
    <>
      {props.selectedGem && !props.selectedGem.hidden ? (
        <View style={styles.container}>
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
      ) : (
        props.selectedGem && (
          <View style={styles.container}>
            <Text
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                padding: 16,
                textAlign: "center",
                marginTop: 24,
              }}
            >
              WIP - Will show purchasable Playbooks that hidden gem is featured in
            </Text>
          </View>
        )
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 24,
  },
});
