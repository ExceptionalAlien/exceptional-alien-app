import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, useColorScheme } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { PlaybookType, Slice } from "app/playbook";
import CreatorIcon from "./CreatorIcon";
import { getData } from "utils/helpers";
import { styleVars } from "utils/styles";

type QuoteProps = {
  slice: Slice["primary"];
};

function Quote(props: QuoteProps) {
  const colorScheme = useColorScheme();
  const description = props.slice.description[0].text;

  return (
    <View style={[styles.quote, { borderColor: colorScheme === "light" ? styleVars.eaBlue : "white" }]}>
      <Text
        style={[
          styles.text,
          { fontSize: description.length > 160 ? 14 : 16, color: colorScheme === "light" ? styleVars.eaBlue : "white" },
        ]}
        allowFontScaling={false}
      >
        {description.substring(0, 320).trimEnd()}
        {description.length > 320 && "..."}
      </Text>

      <View style={styles.creator}>
        <CreatorIcon
          creator={props.slice.creator.data?.first_name ? props.slice.creator : props.slice.playbookCreator}
        />
      </View>
    </View>
  );
}

type QuoteSliderProps = {
  gem: string;
  playbooks: [{ playbook: PlaybookType }];
};

export default function QuoteSlider(props: QuoteSliderProps) {
  const [quotes, setQuotes] = useState<Slice[]>([]);

  const getQuotes = async () => {
    const playbookQuotes: Slice[] = [];
    const unlocked = await getData("unlockedPBs");

    // Loop all Playbooks that feature Gem
    for (let i = 0; i < props.playbooks.length; i++) {
      let playbook = props.playbooks[i].playbook;

      // Only show quotes from unlocked Playbooks
      if (!playbook.data.locked || (unlocked && unlocked.includes(playbook.uid))) {
        let slices = playbook.data.slices;

        // Loop slices in Playbook
        for (let i = 0; i < slices.length; i++) {
          // Get slice with Gem quote
          if (slices[i].primary.gem.uid === props.gem) {
            let slice = slices[i];
            slice.primary.playbookCreator = playbook.data.creator; // Include Playbook creator with quote
            playbookQuotes.push(slices[i]);
          }
        }
      }
    }

    setQuotes(playbookQuotes);
  };

  useEffect(() => {
    getQuotes();
  }, [props.gem]);

  return (
    <FlatList
      data={quotes}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <Quote slice={item.primary} />}
      horizontal
      decelerationRate="fast"
      snapToInterval={248}
      contentContainerStyle={{
        gap: 8,
        paddingLeft: 16,
        paddingRight: 16,
        minWidth: "100%",
      }}
      showsHorizontalScrollIndicator={false}
      style={!quotes.length && { display: "none" }}
    />
  );
}

const styles = StyleSheet.create({
  quote: {
    borderWidth: 1,
    padding: 8,
    width: 240,
    aspectRatio: "4/4",
  },
  text: {
    fontFamily: "Neue-Haas-Grotesk",
  },
  creator: {
    position: "absolute",
    bottom: 0,
    right: 0,
    padding: 8,
  },
});
