import destinationsData from "data/destinations.json";

export const detectDestination = (lat: number, lng: number, latDelta?: number, lngDelta?: number) => {
  const data = JSON.stringify(destinationsData);
  const json = JSON.parse(data);

  const userDestination = {
    id: "",
    name: "",
    uid: "",
    lat: lat,
    lng: lng,
    region: {
      latitude: lat,
      longitude: lng,
      latitudeDelta: latDelta ? latDelta : 0.05,
      longitudeDelta: lngDelta ? lngDelta : 0.05,
    },
  };

  // Loop destinations and detect if device is within a destination's bounds
  for (let i = 0; i < json.length; i++) {
    let bounds = json[i].bounds;

    if (
      lat >= bounds.latitudeStart &&
      lat <= bounds.latitudeEnd &&
      lng >= bounds.longitudeStart &&
      lng <= bounds.longitudeEnd
    ) {
      userDestination.id = json[i].id;
      userDestination.name = json[i].name;
      userDestination.uid = json[i].uid;
      break;
    }
  }

  return userDestination;
};
