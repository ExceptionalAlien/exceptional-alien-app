import { createContext } from "react";

export type FavsContextType = {
  favs: string[] | undefined;
  setFavs: (favs: string[]) => void;
};

export const FavsContext = createContext<FavsContextType>({
  favs: undefined,
  setFavs: () => null,
});
