import { createContext } from "react";

export type BookmarksContextType = {
  bookmarks: string[] | undefined;
  setBookmarks: (bookmarks: string[]) => void;
};

export const BookmarksContext = createContext<BookmarksContextType>({
  bookmarks: undefined,
  setBookmarks: () => null,
});
