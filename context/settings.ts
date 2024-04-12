import { createContext } from "react";

export type SettingsType = {
  detectGems: boolean;
};

export type SettingsContextType = {
  settings: SettingsType;
  setSettings: (settings: SettingsType) => void;
};

export const SettingsInit = { detectGems: true };

export const SettingsContext = createContext<SettingsContextType>({
  settings: SettingsInit,
  setSettings: () => null,
});
