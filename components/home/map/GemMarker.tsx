import { useState } from "react";
import { Marker } from "react-native-maps";
import { GemType } from "app/gem";

type GemMarkerProps = {
  marker: GemType;
};

export default function GemMarker(props: GemMarkerProps) {
  const [selected, setSelected] = useState(false);

  const icons = {
    FoodAndDrink: require("assets/img/markers/food-and-drink.png"),
    FoodAndDrinkSelected: require("assets/img/markers/food-and-drink-selected.png"),
    Culture: require("assets/img/markers/culture.png"),
    CultureSelected: require("assets/img/markers/culture-selected.png"),
    Nature: require("assets/img/markers/nature.png"),
    NatureSelected: require("assets/img/markers/nature-selected.png"),
    Retail: require("assets/img/markers/retail.png"),
    RetailSelected: require("assets/img/markers/retail-selected.png"),
    Neighbourhoods: require("assets/img/markers/neighbourhoods.png"),
    NeighbourhoodsSelected: require("assets/img/markers/neighbourhoods-selected.png"),
    Wellness: require("assets/img/markers/wellness.png"),
    WellnessSelected: require("assets/img/markers/wellness-selected.png"),
    Events: require("assets/img/markers/events.png"),
    EventsSelected: require("assets/img/markers/events-selected.png"),
    Accommodation: require("assets/img/markers/accommodation.png"),
    AccommodationSelected: require("assets/img/markers/accommodation-selected.png"),
  };

  const pressed = () => {
    setSelected(true);
  };

  return (
    <Marker
      coordinate={props.marker.data.location}
      tracksViewChanges={false}
      icon={
        selected
          ? icons[`${props.marker.data.category.replace(/ /g, "").replace("&", "And")}Selected` as keyof typeof icons]
          : icons[props.marker.data.category.replace(/ /g, "").replace("&", "And") as keyof typeof icons]
      }
      onPress={pressed}
    />
  );
}
