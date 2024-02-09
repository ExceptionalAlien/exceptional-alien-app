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

export type PlaybookData = {
  title: string;
  image: PlaybookImage;
  creator: Creator;
};

type PlaybookProps = {
  data: PlaybookData;
};

export default function Playbook(props: PlaybookProps) {
  return (
    <View style={styles.container}>
      <Image source={props.data.image.mobile.url} style={styles.image} transition={500} />

      <View style={styles.textContainer}>
        <LinearGradient colors={["transparent", "rgba(0,0,0,0.35)"]} style={styles.textBackground} />

        <Text style={styles.text} allowFontScaling={false}>
          {props.data.creator.data.first_name} {props.data.creator.data.last_name}
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
    width: 160,
  },
  image: {
    aspectRatio: "4/3",
    backgroundColor: styleVars.eaLightGrey,
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
    fontSize: 20,
    color: "white",
    padding: 4,
  },
  title: {
    color: "white",
    fontFamily: "Helvetica-Monospaced",
    fontSize: 12,
  },
});
