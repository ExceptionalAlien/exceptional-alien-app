import { ScrollView, SafeAreaView, Pressable } from "react-native";
import { Stack, useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { styleVars } from "utils/styles";
import { pressedDefault } from "utils/helpers";

export default function Profile() {
  const router = useRouter();

  return (
    <SafeAreaView>
      <ScrollView>
        <Stack.Screen
          options={{
            title: "Profile",
            headerRight: () => (
              <Pressable onPress={() => router.push("/")} style={({ pressed }) => pressedDefault(pressed)}>
                <Ionicons name="settings-outline" size={24} color={styleVars.eaBlue} />
              </Pressable>
            ),
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
