import React from "react";
import { StyleSheet, View, Text, useColorScheme } from "react-native";
import { Image } from "expo-image";
import { GemType } from "app/gem";
import BigButton from "components/shared/BigButton";
import QuoteSlider from "components/shared/QuoteSlider";
import Header from "./gem/Header";
import PlaybookSlider from "components/shared/PlaybookSlider";
import { styleVars } from "utils/styles";

type GemProps = {
  selectedGem: GemType | undefined;
};

export default function Gem(props: GemProps) {
  const colorScheme = useColorScheme();

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
            <View style={styles.header}>
              <Image source={require("assets/img/icon-hidden.svg")} style={styles.icon} />

              <View style={styles.text}>
                <Text style={styles.title} allowFontScaling={false}>
                  Hidden Gem
                </Text>

                <Text
                  style={[
                    styles.description,
                    { color: colorScheme === "light" ? styleVars.eaGrey : styleVars.eaLightGrey },
                  ]}
                  allowFontScaling={false}
                >
                  This hidden Gem is included in the Playbooks below. Unlock a Playbook to reveal the Gem.
                </Text>
              </View>
            </View>

            <PlaybookSlider hideTab />
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
  header: {
    marginHorizontal: 16,
    marginTop: 24,
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  icon: {
    width: 48,
    height: 48,
  },
  text: {
    flex: 1,
  },
  title: {
    fontFamily: "Neue-Haas-Grotesk-Med",
    color: styleVars.eaBlue,
    fontSize: 20,
    lineHeight: 20,
  },
  description: {
    fontFamily: "Neue-Haas-Grotesk",
    fontSize: 14,
    color: styleVars.eaGrey,
  },
});
