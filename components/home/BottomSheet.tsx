import { StyleSheet, View, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { GestureDetector, Gesture, Directions } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  withTiming,
  Easing,
  useAnimatedStyle,
  useAnimatedRef,
  measure,
} from "react-native-reanimated";
import { DestinationType } from "context/destination";
import Playbooks from "./bottom-sheet/Playbooks";
import { styleVars } from "utils/styles";

type BottomSheetProps = {
  destination: DestinationType;
  selectedGem: string | undefined;
};

export default function BottomSheet(props: BottomSheetProps) {
  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  const container = useAnimatedRef();
  const offset = useSharedValue(0);

  const flingUp = Gesture.Fling()
    .direction(Directions.UP)
    .onStart(() => {
      const containerMeasurement = measure(container);
      const collapsedHeight = (height / 100) * 35; // 35% of window
      const expandedOffset = 0 - (containerMeasurement!.height - collapsedHeight); // Calculate offset to show full container
      offset.value = withTiming(expandedOffset, { duration: 200, easing: Easing.out(Easing.quad) }); // Expand
    });

  const flingDown = Gesture.Fling()
    .direction(Directions.DOWN)
    .onStart(() => {
      offset.value = withTiming(0, { duration: 200, easing: Easing.out(Easing.quad) }); // Collapse
    });

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: offset.value }],
  }));

  return (
    <GestureDetector gesture={flingUp}>
      <GestureDetector gesture={flingDown}>
        <Animated.View
          style={[
            styles.container,
            animatedStyles,
            { paddingBottom: insets.bottom + 16, minHeight: (height / 100) * 35 },
          ]}
          ref={container}
        >
          <View style={styles.handle} />
          <Playbooks destination={props.destination} selectedGem={props.selectedGem} />
        </Animated.View>
      </GestureDetector>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: "65%",
    backgroundColor: styleVars.eaBlue,
    width: "100%",
    paddingTop: 24,
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
