import { StyleSheet, View, Text } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { styleVars } from "utils/styles";

type PlaybookImage = {
  mobile: {
    url: string;
  };
};

type Creator = {
  data: {
    first_name: string;
    last_name: string;
    title: string;
  };
};

type Destination = {
  data: {
    title: string;
  };
};

export type PlaybookData = {
  title: string;
  image: PlaybookImage;
  creator: Creator;
  destination: Destination;
};

type PlaybookProps = {
  data: PlaybookData;
};

export default function Playbook(props: PlaybookProps) {
  const blurhash = "L0MtaO?bfQ?b~qj[fQj[fQfQfQfQ";

  return (
    <View style={styles.container}>
      <Image source={props.data.image.mobile.url} style={styles.image} placeholder={blurhash} transition={500} />

      <View style={styles.textContainer}>
        <LinearGradient colors={["transparent", "rgba(0,0,0,0.35)"]} style={styles.textBackground} />

        <Text style={styles.text} allowFontScaling={false}>
          {props.data.destination?.data.title ? props.data.destination?.data.title : "Global"} with{" "}
          {props.data.creator.data.first_name}{" "}
          {props.data.creator.data.last_name && props.data.creator.data.last_name?.toUpperCase()}
        </Text>
      </View>

      <Text style={styles.title} allowFontScaling={false}>
        {props.data.creator.data.title.substring(0, 40)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 4,
    width: 168,
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
    fontSize: 16,
    color: "white",
    padding: 4,
  },
  title: {
    color: "white",
    fontFamily: "Neue-Haas-Grotesk",
    fontSize: 14,
  },
});
