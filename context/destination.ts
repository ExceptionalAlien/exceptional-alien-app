import { createContext } from "react";

export interface Destination {
  name: string;
  uid: string;
  country: string;
  region: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
}

export type DestinationContextType = {
  destination: Destination;
  setDestination: (destination: Destination) => void;
};

export const DestinationContext = createContext<DestinationContextType>({
  destination: {
    name: "",
    uid: "",
    country: "",
    region: {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0,
      longitudeDelta: 0,
    },
  },
  setDestination: () => null,
});
