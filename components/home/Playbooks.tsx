import { StyleSheet, View, Text } from "react-native";
import { DestinationType } from "context/destination";

interface PlaybooksProps {
  destination: DestinationType;
}

export default function Playbooks(props: PlaybooksProps) {
  return (
    <View style={styles.container}>
      <Text>Hello!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 16,
  },
});
