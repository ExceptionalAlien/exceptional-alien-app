import { createContext } from "react";
import { GemType } from "app/gem";

export type GemsContextType = {
  gems: GemType[] | undefined;
  setGems: (gems: GemType[]) => void;
};

export const GemsContext = createContext<GemsContextType>({
  gems: undefined,
  setGems: () => null,
});
