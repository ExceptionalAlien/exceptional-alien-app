import { createContext } from "react";
import { StoredItem } from "utils/helpers";

export type BookmarksContextType = {
  bookmarks: StoredItem[] | undefined;
  setBookmarks: (bookmarks: StoredItem[]) => void;
};

export const BookmarksContext = createContext<BookmarksContextType>({
  bookmarks: undefined,
  setBookmarks: () => null,
});
