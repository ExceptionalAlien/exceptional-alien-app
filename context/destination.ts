import { createContext } from "react";

export type DestinationType = {
  name: string;
  uid: string;
  keywords: string;
  region: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
};

export type DestinationContextType = {
  destination: DestinationType;
  setDestination: (destination: DestinationType) => void;
};

export const DestinationContext = createContext<DestinationContextType>({
  destination: {
    name: "",
    uid: "",
    keywords: "",
    region: {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0,
      longitudeDelta: 0,
    },
  },
  setDestination: () => null,
});
