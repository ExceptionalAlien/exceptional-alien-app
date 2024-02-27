import { createContext } from "react";

export type DestinationType = {
  id: string;
  name: string;
  uid: string;
  keywords?: string;
  lat: number;
  lng: number;
  region?: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
  bounds?: {
    latitudeStart: number;
    longitudeStart: number;
    latitudeEnd: number;
    longitudeEnd: number;
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
