import React, { useContext } from "react";
import { FlatList, StyleSheet, View, Text, Pressable, useColorScheme } from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FavsContext, FavsContextType } from "context/favs";
import { BookmarksContext, BookmarksContextType } from "context/bookmarks";
import { StoredItem, pressedDefault } from "utils/helpers";
import { styleVars } from "utils/styles";

function Item(props: { item: StoredItem; type: string }) {
  const router = useRouter();
  const colorScheme = useColorScheme();

  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: props.type === "favs" ? "/gem" : "/playbook",
          params: {
            uid: props.item.uid,
          },
        })
      }
      style={({ pressed }) => [pressedDefault(pressed), styles.button]}
      hitSlop={8}
    >
      <Ionicons
        name={props.type === "favs" ? "heart" : "bookmark"}
        size={28}
        color={props.type === "favs" ? styleVars.eaRed : styleVars.eaBlue}
      />

      <View style={styles.text}>
        <Text
          style={[styles.title, { color: colorScheme === "light" ? "black" : styleVars.eaBlue }]}
          allowFontScaling={false}
        >
          {props.item.title}
        </Text>

        <Text style={styles.subTitle} allowFontScaling={false}>
          {props.item.subTitle}
          {props.type === "favs" && ` in ${props.item.destination}`}
        </Text>
      </View>
    </Pressable>
  );
}

export default function SavedList() {
  const params = useLocalSearchParams<{ savedType: string }>();
  const { savedType } = params;
  const { favs } = useContext<FavsContextType>(FavsContext);
  const { bookmarks } = useContext<BookmarksContextType>(BookmarksContext);

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: savedType === "bookmarks" ? "Bookmarked" : "Favorites",
        }}
      />

      <FlatList
        data={savedType === "bookmarks" ? bookmarks?.reverse() : favs?.reverse()}
        keyExtractor={(item) => item.uid}
        renderItem={({ item }) => <Item item={item} type={savedType!} />}
        contentContainerStyle={{
          gap: 16,
          paddingVertical: 16,
        }}
        contentInsetAdjustmentBehavior="automatic"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    marginHorizontal: 16,
    flexDirection: "row",
    gap: 8,
  },
  text: {
    flex: 1,
  },
  title: {
    fontFamily: "Neue-Haas-Grotesk-Med",
    fontSize: 24,
  },
  subTitle: {
    fontFamily: "Neue-Haas-Grotesk",
    fontSize: 16,
    color: styleVars.eaGrey,
  },
});
