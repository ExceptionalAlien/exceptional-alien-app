import { useState } from "react";
import { ScrollView, Platform } from "react-native";
import { Stack } from "expo-router";
import { useHeaderHeight } from "@react-navigation/elements";
import Results from "components/search/Results";
import Input from "components/search/Input";

export default function Search() {
  const headerHeight = useHeaderHeight();
  const [query, setQuery] = useState("");
  const [offset, setOffset] = useState(0); // Hack to stop scrollview animating on load on iOS

  return (
    <ScrollView
      stickyHeaderIndices={[1]}
      contentInsetAdjustmentBehavior="automatic"
      style={{ marginTop: Platform.OS === "android" ? headerHeight : offset }}
      onScroll={() => setOffset(headerHeight)}
    >
      <Stack.Screen
        options={{
          title: "Search",
        }}
      />

      <Input query={query} setQuery={setQuery} />
      <Results query={query} />
    </ScrollView>
  );
}
