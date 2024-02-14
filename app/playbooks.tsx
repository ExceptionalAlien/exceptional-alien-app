import { ScrollView, SafeAreaView } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";

export default function Profile() {
  const params = useLocalSearchParams<{ title: string; destinationUID: string }>();
  const { title, destinationUID } = params;

  return (
    <SafeAreaView>
      <ScrollView>
        <Stack.Screen
          options={{
            title: title,
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
