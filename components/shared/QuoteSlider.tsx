import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { PlaybookType, Slice } from "app/playbook";
import CreatorIcon from "./CreatorIcon";
import { getData } from "utils/helpers";
import { styleVars } from "utils/styles";

type QuoteProps = {
  slice: Slice["primary"];
  size?: string;
};

function Quote(props: QuoteProps) {
  return (
    <View style={[styles.quote, { aspectRatio: props.size === "sml" ? "6/4" : "4/4" }]}>
      <Text style={[styles.text, { fontSize: props.slice.description[0].text.length > 140 ? 14 : 16 }]}>
        {props.size === "sml"
          ? props.slice.description[0].text.substring(0, 240).trimEnd()
          : props.slice.description[0].text}
        {props.size === "sml" && props.slice.description[0].text.length > 240 && "..."}
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
  size?: string; // sml or med (default)
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
      renderItem={({ item }) => <Quote slice={item.primary} size={props.size} />}
      horizontal
      decelerationRate="fast"
      snapToInterval={248}
      contentContainerStyle={{
        gap: 8,
        paddingLeft: 16,
        paddingRight: 16,
      }}
      showsHorizontalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  quote: {
    borderWidth: 1,
    borderColor: styleVars.eaBlue,
    padding: 8,
    width: 240,
  },
  text: {
    fontFamily: "Neue-Haas-Grotesk",
    color: styleVars.eaBlue,
  },
  creator: {
    position: "absolute",
    bottom: 0,
    right: 0,
    padding: 8,
  },
});
