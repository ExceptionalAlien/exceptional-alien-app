import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Destinations from "./results/Destinations";

type ResultsProps = {
  query: string;
};

export default function Results(props: ResultsProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ paddingBottom: insets.bottom }}>
      <Destinations query={props.query} />
    </View>
  );
}
