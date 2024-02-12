import { useState } from "react";
import { ScrollView, SafeAreaView, View } from "react-native";
import { Stack } from "expo-router";
import { useHeaderHeight } from "@react-navigation/elements";
import Results from "components/search/Results";
import Input from "components/search/Input";

export default function Search() {
  const headerHeight = useHeaderHeight();
  const [query, setQuery] = useState("");

  return (
    <View style={{ paddingTop: headerHeight }}>
      <Stack.Screen
        options={{
          title: "Search",
        }}
      />

      <ScrollView stickyHeaderIndices={[0]}>
        <SafeAreaView>
          <Input query={query} setQuery={setQuery} />
        </SafeAreaView>

        <Results query={query} />
      </ScrollView>
    </View>
  );
}
