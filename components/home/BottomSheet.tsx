import { StyleSheet, View } from "react-native";
import { DestinationType } from "context/destination";
import Playbooks from "./Playbooks";
import { styleVars } from "utils/styles";

type BottomSheetProps = {
  destination: DestinationType;
};

export default function BottomSheet(props: BottomSheetProps) {
  return (
    <View style={styles.container}>
      <View style={styles.handle} />
      <Playbooks destination={props.destination} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: "65%",
    backgroundColor: styleVars.eaBlue,
    height: "75%",
    width: "100%",
  },
  handle: {
    position: "absolute",
    backgroundColor: styleVars.eaGrey,
    width: 32,
    height: 4,
    top: 8,
    borderRadius: 999,
    left: "50%",
    marginLeft: -16,
  },
});
