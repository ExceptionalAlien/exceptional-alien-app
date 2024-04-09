import { createContext } from "react";

export type FiltersType = {
  categories: string[];
  favsOnly: boolean;
  myPlaybooksOnly: boolean;
};

export type FiltersContextType = {
  filters: FiltersType;
  setFilters: (filters: FiltersType) => void;
};

export const FiltersContext = createContext<FiltersContextType>({
  filters: { categories: [], favsOnly: false, myPlaybooksOnly: false },
  setFilters: () => null,
});
