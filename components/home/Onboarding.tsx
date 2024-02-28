import React from "react";
import { StyleSheet, View, Button, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { storeData } from "utils/helpers";

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
        <Button
          title="Choose destination"
          onPress={() => router.push({ pathname: "/search", params: { destinationsOnly: true } })}
        />
      ) : (
        <>
          <Button title="Complete onboarding" onPress={complete} disabled={props.onboardingComplete ? true : false} />
          {props.onboardingComplete && <ActivityIndicator color="white" />}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
