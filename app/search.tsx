import { useState } from "react";
import { ScrollView, SafeAreaView, StyleSheet } from "react-native";
import { Stack } from "expo-router";
import Results from "components/search/Results";
import Input from "components/search/Input";

export default function Search() {
  const [query, setQuery] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          title: "Search",
        }}
      />

      <ScrollView stickyHeaderIndices={[0]}>
        <Input query={query} setQuery={setQuery} />
        <Results query={query} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
