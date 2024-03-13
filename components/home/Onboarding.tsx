import React from "react";
import { StyleSheet, View, Button, ActivityIndicator, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { storeData } from "utils/helpers";
import { pressedDefault } from "utils/helpers";

type OnboardingProps = {
  onboardingComplete: boolean | undefined;
  setOnboardingComplete: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  showChooseDestination: boolean;
};

export default function Onboarding(props: OnboardingProps) {
  const router = useRouter();

  const complete = () => {
    storeData("onboarding", true);
    props.setOnboardingComplete(true);
  };

  return (
    <View style={styles.container}>
      {props.showChooseDestination ? (
        <Pressable
          onPress={() => router.push({ pathname: "/search", params: { destinationsOnly: true } })}
          style={({ pressed }) => pressedDefault(pressed)}
        >
          <Text style={styles.text} allowFontScaling={false}>
            Choose destination
          </Text>
        </Pressable>
      ) : !props.onboardingComplete ? (
        <>
          <Text style={{ color: "white" }}>WIP - will show onboarding slides</Text>
          <Button title="Complete onboarding" onPress={complete} />
        </>
      ) : (
        <ActivityIndicator color="white" size="large" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 18,
    fontFamily: "Neue-Haas-Grotesk",
  },
});
