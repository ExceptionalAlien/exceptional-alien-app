import { useState } from "react";
import { ScrollView, SafeAreaView } from "react-native";
import { Stack } from "expo-router";
import Destinations from "components/search/Destinations";
import Input from "components/search/Input";

export default function Search() {
  const [query, setQuery] = useState("");

  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          title: "Search",
        }}
      />

      <ScrollView stickyHeaderIndices={[0]}>
        <Input query={query} setQuery={setQuery} />
        <Destinations query={query} />
      </ScrollView>
    </SafeAreaView>
  );
}
