import { StyleSheet, View, Text } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { PlaybookType } from "app/playbook";

type PlaybookThumbProps = {
  playbook: PlaybookType;
};

export default function PlaybookThumb(props: PlaybookThumbProps) {
  const blurhash = "L0MtaO?bfQ?b~qj[fQj[fQfQfQfQ";

  return (
    <View style={styles.container}>
      <Image
        source={props.playbook.data.image.mobile.url}
        style={styles.image}
        placeholder={blurhash}
        transition={500}
      />

      <View style={styles.textContainer}>
        <LinearGradient colors={["transparent", "rgba(0,0,0,0.5)"]} style={styles.textBackground} />

        <Text style={styles.text} allowFontScaling={false}>
          {props.playbook.data.destination?.data.title ? props.playbook.data.destination?.data.title : "Global"} with{" "}
          {props.playbook.data.creator.data.first_name}{" "}
          {props.playbook.data.creator.data.last_name && props.playbook.data.creator.data.last_name?.toUpperCase()}
        </Text>
      </View>

      <Text style={styles.title} allowFontScaling={false}>
        {props.playbook.data.creator.data.title.substring(0, 40)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 4,
    width: 176,
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
    color: "white",
    fontFamily: "Neue-Haas-Grotesk",
    fontSize: 14,
  },
});