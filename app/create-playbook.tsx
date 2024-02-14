import { ScrollView, SafeAreaView } from "react-native";
import { Stack } from "expo-router";

export default function Playbook() {
  return (
    <SafeAreaView>
      <ScrollView>
        <Stack.Screen
          options={{
            title: "Create a Playbook",
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
