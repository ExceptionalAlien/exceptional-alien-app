import { useState } from "react";
import { ScrollView, Platform } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { useHeaderHeight } from "@react-navigation/elements";
import Results from "components/search/Results";
import Input from "components/search/Input";

export default function Search() {
  const params = useLocalSearchParams<{ destinationsOnly: any }>();
  const { destinationsOnly } = params;
  const headerHeight = useHeaderHeight();
  const [query, setQuery] = useState("");
  const [offset, setOffset] = useState(0); // Hack - used to stop scrollview animating on load on iOS

  const searchClick = () => {
    if (query.length > 1 && !destinationsOnly) alert("WIP - will query Prismic");
  };

  return (
    <ScrollView
      stickyHeaderIndices={[1]}
      contentInsetAdjustmentBehavior="automatic"
      style={{ marginTop: Platform.OS === "android" ? headerHeight : offset }}
      onScroll={() => setOffset(headerHeight)}
      scrollEventThrottle={16}
    >
      <Stack.Screen
        options={{
          title: destinationsOnly ? "Destinations" : "Search",
        }}
      />

      <Input
        query={query}
        setQuery={setQuery}
        placeholder={destinationsOnly ? "Search" : "Destinations, Playbooks, Gems & more"}
        searchClick={searchClick}
      />
      <Results query={query} />
    </ScrollView>
  );
}
