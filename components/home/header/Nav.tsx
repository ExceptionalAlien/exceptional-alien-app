import { View, StyleSheet, Pressable } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { styleVars } from "utils/styles";
import { pressedDefault } from "utils/helpers";

export default function Nav() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Search */}
      <Pressable onPress={() => router.push("/search")} style={({ pressed }) => pressedDefault(pressed)} hitSlop={12}>
        <Ionicons name="search-outline" size={28} color={styleVars.eaBlue} />
      </Pressable>

      {/* Profile */}
      <Pressable onPress={() => router.push("/profile")} style={({ pressed }) => pressedDefault(pressed)} hitSlop={12}>
        <Image source={require("assets/img/icon-person.svg")} style={styles.profile} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 24,
    paddingRight: 8,
  },
  profile: {
    width: 24,
    height: 24,
    tintColor: styleVars.eaBlue,
  },
});
