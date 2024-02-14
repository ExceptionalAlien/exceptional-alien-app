import { ScrollView, SafeAreaView } from "react-native";
import { Stack } from "expo-router";
import { Creator } from "./profile";

type PlaybookImage = {
  mobile: {
    url: string;
  };
};

type Destination = {
  data: {
    title: string;
  };
};

type PlaybookData = {
  title: string;
  image: PlaybookImage;
  creator: Creator;
  destination: Destination;
};

export type PlaybookType = {
  uid: string;
  data: PlaybookData;
};

export default function Playbook() {
  return (
    <SafeAreaView>
      <ScrollView>
        <Stack.Screen
          options={{
            title: "Playbook",
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
