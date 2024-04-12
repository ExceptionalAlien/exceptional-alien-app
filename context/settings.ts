import { createContext } from "react";

export type SettingsType = {
  disableGemDetection: boolean;
};

export type SettingsContextType = {
  settings: SettingsType;
  setSettings: (settings: SettingsType) => void;
};

export const SettingsInit = { disableGemDetection: false };

export const SettingsContext = createContext<SettingsContextType>({
  settings: SettingsInit,
  setSettings: () => null,
});
