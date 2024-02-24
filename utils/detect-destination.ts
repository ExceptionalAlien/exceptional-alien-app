import { LocationObject } from "expo-location";
import destinationsData from "data/destinations.json";

export const detectDestination = (location: LocationObject) => {
  const data = JSON.stringify(destinationsData);
  const json = JSON.parse(data);

  const userDestination = {
    id: "",
    name: "",
    uid: "",
    region: {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    },
  };

  // Loop destinations and detect if device is within a destination's bounds
  for (let i = 0; i < json.length; i++) {
    let bounds = json[i].bounds;

    if (
      location.coords.latitude >= bounds.latitudeStart &&
      location.coords.latitude <= bounds.latitudeEnd &&
      location.coords.longitude >= bounds.longitudeStart &&
      location.coords.longitude <= bounds.longitudeEnd
    ) {
      userDestination.id = json[i].id;
      userDestination.name = json[i].name;
      userDestination.uid = json[i].uid;
      break;
    }
  }

  return userDestination;
};
