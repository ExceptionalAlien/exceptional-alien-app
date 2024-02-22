import { ScrollView, SafeAreaView } from "react-native";
import { Stack } from "expo-router";

type GemData = {
  title: string;
  category: string;
  location: { latitude: number; longitude: number };
};

export type GemType = {
  uid: string;
  data: GemData;
};

export default function Gem() {
  return (
    <SafeAreaView>
      <ScrollView>
        <Stack.Screen
          options={{
            title: "Gem",
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
