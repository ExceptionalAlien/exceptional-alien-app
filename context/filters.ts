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

export const FiltersInit = { categories: [], favsOnly: false, myPlaybooksOnly: false };

export const FiltersContext = createContext<FiltersContextType>({
  filters: FiltersInit,
  setFilters: () => null,
});
