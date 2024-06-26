import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, Text, useColorScheme, useWindowDimensions, Pressable } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BookmarksContext, BookmarksContextType } from "context/bookmarks";
import { PlaybookType } from "app/playbook";
import { getData, StoredItem } from "utils/helpers";
import { styleVars } from "utils/styles";

type PlaybookThumbProps = {
  playbook: PlaybookType;
  width?: number;
  titleColor?: string;
};

export default function PlaybookThumb(props: PlaybookThumbProps) {
  const colorScheme = useColorScheme();
  const { width } = useWindowDimensions();
  const router = useRouter();
  const { bookmarks } = useContext<BookmarksContextType>(BookmarksContext);
  const [isUnlocked, setIsUnlocked] = useState(!props.playbook.data.locked ? true : false);
  const [isBookmark, setIsBookmark] = useState(false);

  const checkIfOwned = async () => {
    const unlocked = await getData("unlockedPBs");
    if (unlocked && unlocked.includes(props.playbook.uid)) setIsUnlocked(true);
  };

  const setBookmark = async () => {
    const bookmarksData = await getData("bookmarkedPBs");

    setIsBookmark(
      bookmarksData && bookmarksData.find((item: StoredItem) => item.uid === props.playbook.uid) ? true : false
    );
  };

  useEffect(() => {
    if (!isUnlocked) checkIfOwned();
    setBookmark();
  }, [bookmarks]);

  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/playbook",
          params: {
            uid: props.playbook.uid,
          },
        })
      }
      style={[styles.container, props.width ? { width: props.width } : { flex: 1, maxWidth: (width - 40) / 2 }]}
    >
      <View style={styles.bg} />
      <Image source={props.playbook.data.image.mobile.url} style={styles.image} transition={500} />

      <View style={styles.textContainer}>
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.25)", "rgba(0,0,0,0.5)"]}
          locations={[0, 0.5, 1]}
          style={styles.textBackground}
        />

        <Text style={styles.text} allowFontScaling={false}>
          {props.playbook.data.app_title
            ? props.playbook.data.app_title
            : props.playbook.data.destination?.data.title
            ? `${props.playbook.data.destination?.data.title} with ${props.playbook.data.creator.data.first_name}${
                props.playbook.data.creator.data.last_name
                  ? ` ${props.playbook.data.creator.data.last_name?.toUpperCase()}`
                  : ""
              }`
            : `Global with ${props.playbook.data.creator.data.first_name}${
                props.playbook.data.creator.data.last_name
                  ? ` ${props.playbook.data.creator.data.last_name?.toUpperCase()}`
                  : ""
              }`}
        </Text>

        {!isUnlocked ? (
          <View style={styles.badge}>
            <Ionicons name="lock-closed" size={12} color={styleVars.eaBlue} style={{ paddingBottom: 1 }} />
          </View>
        ) : (
          isBookmark && (
            <View style={styles.badge}>
              <Ionicons name="bookmark" size={12} color={styleVars.eaBlue} />
            </View>
          )
        )}
      </View>

      <Text
        style={[
          styles.title,
          { color: props.titleColor ? props.titleColor : colorScheme === "light" ? "black" : "white" },
        ]}
        allowFontScaling={false}
      >
        {props.playbook.data.sub_title
          ? props.playbook.data.sub_title.substring(0, 60)
          : props.playbook.data.creator.data.title.substring(0, 40)}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 4,
  },
  bg: {
    position: "absolute",
    aspectRatio: "4/3",
    width: "100%",
    backgroundColor: styleVars.eaLightGrey,
  },
  image: {
    aspectRatio: "4/3",
  },
  textContainer: {
    position: "absolute",
    aspectRatio: "4/3",
    width: "100%",
    justifyContent: "flex-end",
  },
  textBackground: {
    position: "absolute",
    height: "100%",
    width: "100%",
  },
  text: {
    fontFamily: "Neue-Haas-Grotesk-Med",
    fontSize: 18,
    color: "white",
    padding: 4,
  },
  badge: {
    position: "absolute",
    backgroundColor: "rgba(255,255,255,0.75)",
    borderRadius: 999,
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    top: 8,
    right: 8,
  },
  title: {
    fontFamily: "Neue-Haas-Grotesk",
    fontSize: 14,
  },
});
