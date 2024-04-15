import { createContext } from "react";
import { StoredItem } from "utils/helpers";

export type FavsContextType = {
  favs: StoredItem[] | undefined;
  setFavs: (favs: StoredItem[]) => void;
};

export const FavsContext = createContext<FavsContextType>({
  favs: undefined,
  setFavs: () => null,
});
