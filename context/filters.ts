import { createContext } from "react";

export type FiltersType = {
  categories: string[];
  favsOnly: boolean;
  bookmarksOnly: boolean;
};

export type FiltersContextType = {
  filters: FiltersType;
  setFilters: (filters: FiltersType) => void;
};

export const FiltersContext = createContext<FiltersContextType>({
  filters: { categories: [], favsOnly: false, bookmarksOnly: false },
  setFilters: () => null,
});
