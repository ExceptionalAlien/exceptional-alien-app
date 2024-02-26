import { StyleSheet, View, Text } from "react-native";
import { Stack } from "expo-router";

export default function CreatePlaybook() {
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Create a Playbook",
        }}
      />

      <Text style={{ textAlign: "center" }}>WIP - will show Playbook builder</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
});
