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
  trending?: boolean;
};

export type DestinationContextType = {
  destination: DestinationType | undefined;
  setDestination: (destination: DestinationType) => void;
};

export const DestinationContext = createContext<DestinationContextType>({
  destination: undefined,
  setDestination: () => null,
});
