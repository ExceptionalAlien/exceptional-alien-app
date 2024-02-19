import { StyleSheet, View, Button } from "react-native";
import { useRouter } from "expo-router";
import { storeData } from "utils/helpers";

type OnboardingProps = {
  onboardingComplete: boolean | undefined;
  setOnboardingComplete: React.Dispatch<React.SetStateAction<boolean | undefined>>;
};

export default function Onboarding(props: OnboardingProps) {
  const router = useRouter();

  const complete = () => {
    storeData("onboarding", true);
    props.setOnboardingComplete(true);
  };

  return (
    <View style={styles.container}>
      {!props.onboardingComplete && <Button title="Complete onboarding" onPress={complete} />}

      {props.onboardingComplete && (
        <Button
          title="Choose destination"
          onPress={() => router.push({ pathname: "/search", params: { destinationsOnly: true } })}
        />
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
