import { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Stack } from "expo-router";
import { DestinationContext, DestinationContextType } from "context/destination";
import Map from "components/home/Map";
import Header from "components/home/Header";

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
      <Header destination={destination} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
