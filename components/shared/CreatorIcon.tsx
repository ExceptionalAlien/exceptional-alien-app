import React from "react";
import { StyleSheet, Text, Pressable, useColorScheme } from "react-native";
import { useRouter } from "expo-router";
import { Image } from "expo-image";
import { CreatorType } from "app/profile";
import { pressedDefault } from "utils/helpers";
import { styleVars } from "utils/styles";

type CreatorIconProps = {
  creator: CreatorType;
};

export default function CreatorIcon(props: CreatorIconProps) {
  const router = useRouter();
  const colorScheme = useColorScheme();

  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/profile",
        })
      }
      style={({ pressed }) => [styles.container, pressedDefault(pressed)]}
      hitSlop={8}
    >
      <Text style={[styles.text, { color: colorScheme === "light" ? styleVars.eaBlue : "white" }]}>
        {props.creator.data.first_name}
        {props.creator.data.last_name && ` ${props.creator.data.last_name?.toUpperCase()}`}
      </Text>

      <Image source={props.creator.data.profile_image.url} style={styles.image} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  text: {
    fontFamily: "Neue-Haas-Grotesk",
    fontSize: 12,
    textAlign: "right",
  },
  image: {
    width: 32,
    height: 32,
    borderRadius: 999,
  },
});
