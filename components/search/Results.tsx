import { StyleSheet, View } from "react-native";
import Destinations from "./results/Destinations";

type ResultsProps = {
  query: string;
};

export default function Results(props: ResultsProps) {
  return (
    <View style={styles.container}>
      <Destinations query={props.query} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
