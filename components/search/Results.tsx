import { View } from "react-native";
import Destinations from "./results/Destinations";

type ResultsProps = {
  query: string;
};

export default function Results(props: ResultsProps) {
  return (
    <View>
      <Destinations query={props.query} />
    </View>
  );
}
