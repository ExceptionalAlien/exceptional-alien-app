import React, { useContext, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { FavsContext, FavsContextType } from "context/favs";
import { BookmarksContext, BookmarksContextType } from "context/bookmarks";
import ListButton from "components/shared/ListButton";
import { getData } from "utils/helpers";

type SavedProps = {
  userID?: number;
};

export default function Saved(props: SavedProps) {
  const { favs, setFavs } = useContext<FavsContextType>(FavsContext);
  const { bookmarks, setBookmarks } = useContext<BookmarksContextType>(BookmarksContext);

  const initLocalData = async () => {
    const favsData = await getData("favGems");
    setFavs(favsData);
    const bookmarksData = await getData("bookmarkedPBs");
    setBookmarks(bookmarksData);
  };

  useEffect(() => {
    if (!props.userID) initLocalData(); // Is local user
  }, []);

  return (
    <View style={styles.container}>
      <ListButton
        title="Favorite Gems"
        icon="heart"
        count={!props.userID && favs ? favs.length : 0}
        disabled={((!props.userID && !favs) || (!props.userID && favs && favs.length === 0)) && true}
      />

      <ListButton
        title="Bookmarked Playbooks"
        icon="bookmarks-outline"
        count={!props.userID && bookmarks ? bookmarks.length : 0}
        route={{
          pathname: "/playbooks",
          params: {
            headerTitle: "Bookmarked",
          },
        }}
        disabled={((!props.userID && !bookmarks) || (!props.userID && bookmarks && bookmarks.length === 0)) && true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 24,
  },
});
