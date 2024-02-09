import { useContext, useMemo, useRef } from "react";
import { View, StyleSheet } from "react-native";
import { Stack } from "expo-router";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { DestinationContext, DestinationContextType } from "context/destination";
import Map from "components/home/Map";
import Header from "components/home/Header";
import Playbooks from "components/home/Playbooks";
import { styleVars } from "utils/styles";

export default function Home() {
  const { destination } = useContext<DestinationContextType>(DestinationContext);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["35%", "70%"], []);

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <Map region={destination.region} />

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        backgroundStyle={{ borderRadius: 0, backgroundColor: styleVars.eaBlue }}
        handleIndicatorStyle={{ backgroundColor: styleVars.eaLightGrey }}
        animateOnMount={false}
      >
        <BottomSheetScrollView>
          <Playbooks destination={destination} />
        </BottomSheetScrollView>
      </BottomSheet>

      <Header destination={destination} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: styleVars.eaLightGrey,
  },
});
