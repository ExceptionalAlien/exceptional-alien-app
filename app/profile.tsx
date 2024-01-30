import { ScrollView, SafeAreaView } from "react-native";
import { Stack } from "expo-router";

export default function Profile() {
  return (
    <SafeAreaView>
      <ScrollView>
        <Stack.Screen
          options={{
            title: "Profile",
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
