import { useMemo, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { DestinationType } from "context/destination";
import Slider from "./playbooks/Slider";
import { styleVars } from "utils/styles";

type PlaybooksProps = {
  destination: DestinationType;
};

export default function Playbooks(props: PlaybooksProps) {
  const insets = useSafeAreaInsets();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["35%", "50%", "75%"], []);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      backgroundStyle={{ borderRadius: 0, backgroundColor: styleVars.eaBlue }}
      handleIndicatorStyle={{ backgroundColor: styleVars.eaLightGrey }}
      animateOnMount={false}
    >
      <BottomSheetScrollView>
        <View style={[styles.container, { paddingBottom: insets.bottom + 16 }]}>
          <Slider destination={props.destination} />
          <Slider destination={props.destination} />
        </View>
      </BottomSheetScrollView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
    marginTop: 12,
  },
});
