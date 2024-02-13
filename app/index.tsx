import { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Stack } from "expo-router";
import { DestinationContext, DestinationContextType } from "context/destination";
import Map from "components/home/Map";
import Header from "components/home/Header";
import BottomSheet from "components/home/BottomSheet";
import { styleVars } from "utils/styles";

export default function Home() {
  const { destination } = useContext<DestinationContextType>(DestinationContext);

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <Map region={destination.region} />
      <BottomSheet destination={destination} />
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
