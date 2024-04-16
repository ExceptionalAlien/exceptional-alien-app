import React, { useContext, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { FavsContext, FavsContextType } from "context/favs";
import { BookmarksContext, BookmarksContextType } from "context/bookmarks";
import ListButton from "components/shared/ListButton";
import { getData } from "utils/helpers";

export default function Saved() {
  const { favs, setFavs } = useContext<FavsContextType>(FavsContext);
  const { bookmarks, setBookmarks } = useContext<BookmarksContextType>(BookmarksContext);

  const initLocalData = async () => {
    const favsData = await getData("favGems");
    setFavs(favsData); // Update context
    const bookmarksData = await getData("bookmarkedPBs");
    setBookmarks(bookmarksData); // Update context
  };

  useEffect(() => {
    initLocalData();
  }, []);

  return (
    <View style={styles.container}>
      <ListButton
        title="Favorite Gems"
        icon="heart"
        count={favs ? favs.length : 0}
        route={{
          pathname: "/saved-list",
          params: {
            savedType: "favs",
          },
        }}
        disabled={(!favs || (favs && favs.length === 0)) && true}
      />

      <ListButton
        title="Bookmarked Playbooks"
        icon="bookmarks"
        count={bookmarks ? bookmarks.length : 0}
        route={{
          pathname: "/saved-list",
          params: {
            savedType: "bookmarks",
          },
        }}
        disabled={(!bookmarks || (bookmarks && bookmarks.length === 0)) && true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 24,
  },
});
