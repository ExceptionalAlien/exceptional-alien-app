import { Image } from "expo-image";
import { StyleSheet, View, Text } from "react-native";

type PlaybookImage = {
  mobile: {
    url: string;
  };
};

export type PlaybookData = {
  title: string;
  image: PlaybookImage;
};

type PlaybookProps = {
  data: PlaybookData;
};

export default function Playbook(props: PlaybookProps) {
  return (
    <View style={styles.container}>
      <Image source={props.data.image.mobile.url} style={styles.image} />
      <Text style={styles.text}>{props.data.title}</Text>
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
  },
  text: {
    fontFamily: "Neue-Haas-Grotesk-Med",
    fontSize: 16,
    color: "white",
  },
});
