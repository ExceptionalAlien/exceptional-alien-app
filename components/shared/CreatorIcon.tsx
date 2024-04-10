import React from "react";
import { StyleSheet, Text, Pressable, useColorScheme } from "react-native";
import { useRouter } from "expo-router";
import { Image } from "expo-image";
import * as Device from "expo-device";
import { CreatorType } from "app/profile";
import { pressedDefault } from "utils/helpers";
import { styleVars } from "utils/styles";

type CreatorIconProps = {
  creator: CreatorType;
  iconOnly?: boolean;
  border?: boolean;
  size?: string; // sml, med, lrg
  pressDisabled?: boolean;
};

export default function CreatorIcon(props: CreatorIconProps) {
  const router = useRouter();
  const colorScheme = useColorScheme();

  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/profile",
          params: { uid: props.creator.uid },
        })
      }
      style={({ pressed }) => [styles.container, pressedDefault(pressed)]}
      hitSlop={8}
      disabled={props.pressDisabled ? true : false}
    >
      {!props.iconOnly && (
        <Text
          style={[styles.text, { color: colorScheme === "light" ? styleVars.eaBlue : "white" }]}
          allowFontScaling={false}
        >
          {props.creator.data.first_name}
          {props.creator.data.last_name && ` ${props.creator.data.last_name?.toUpperCase()}`}
        </Text>
      )}

      <Image
        source={props.creator.data.profile_image.url}
        style={[
          styles.image,
          props.border && { borderWidth: 1, borderColor: "white" },
          {
            width:
              !props.size || props.size === "med" ? 40 : props.size === "sml" ? 32 : Device.deviceType === 2 ? 56 : 48,
            height:
              !props.size || props.size === "med" ? 40 : props.size === "sml" ? 32 : Device.deviceType === 2 ? 56 : 48,
          },
        ]}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  text: {
    fontFamily: "Neue-Haas-Grotesk",
    fontSize: 12,
    textAlign: "right",
  },
  image: {
    borderRadius: 999,
  },
});
