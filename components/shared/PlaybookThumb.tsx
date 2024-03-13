import React from "react";
import { StyleSheet, View, Text, useColorScheme, useWindowDimensions, Pressable } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { PlaybookType } from "app/playbook";

type PlaybookThumbProps = {
  playbook: PlaybookType;
  width?: number;
  titleColor?: string;
};

export default function PlaybookThumb(props: PlaybookThumbProps) {
  const colorScheme = useColorScheme();
  const { width } = useWindowDimensions();
  const router = useRouter();
  const blurhash = "L0MtaO?bfQ?b~qj[fQj[fQfQfQfQ";

  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/playbook",
          params: {
            uid: props.playbook.uid,
            title: props.playbook.data.destination?.data.title
              ? props.playbook.data.destination?.data.title
              : "Playbook",
          },
        })
      }
      style={[styles.container, props.width ? { width: props.width } : { flex: 1, maxWidth: (width - 40) / 2 }]}
    >
      <Image
        source={props.playbook.data.image.mobile.url}
        style={styles.image}
        placeholder={blurhash}
        transition={500}
      />

      <View style={styles.textContainer}>
        <LinearGradient colors={["transparent", "rgba(0,0,0,0.5)"]} style={styles.textBackground} />

        <Text style={styles.text} allowFontScaling={false}>
          {props.playbook.data.destination?.data.title && `${props.playbook.data.destination?.data.title} with `}
          {props.playbook.data.creator.data.first_name}{" "}
          {props.playbook.data.creator.data.last_name && props.playbook.data.creator.data.last_name?.toUpperCase()}
        </Text>
      </View>

      <Text
        style={[
          styles.title,
          { color: props.titleColor ? props.titleColor : colorScheme === "light" ? "black" : "white" },
        ]}
        allowFontScaling={false}
      >
        {props.playbook.data.sub_title
          ? props.playbook.data.sub_title.substring(0, 80)
          : props.playbook.data.creator.data.title.substring(0, 40)}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 4,
  },
  image: {
    aspectRatio: "4/3",
  },
  textContainer: {
    position: "absolute",
    aspectRatio: "4/3",
    width: "100%",
    justifyContent: "flex-end",
  },
  textBackground: {
    position: "absolute",
    height: "100%",
    width: "100%",
  },
  text: {
    fontFamily: "Neue-Haas-Grotesk-Med",
    fontSize: 18,
    color: "white",
    padding: 4,
  },
  title: {
    fontFamily: "Neue-Haas-Grotesk",
    fontSize: 14,
  },
});
