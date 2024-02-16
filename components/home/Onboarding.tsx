import { StyleSheet, View, Button } from "react-native";
import { storeData } from "utils/helpers";

type OnboardingProps = {
  setOnboardingShown: React.Dispatch<React.SetStateAction<boolean | undefined>>;
};

export default function Onboarding(props: OnboardingProps) {
  const close = () => {
    storeData("onboarding", true);
    props.setOnboardingShown(true);
  };

  return (
    <View style={styles.container}>
      <Button title="Close onboarding" onPress={close} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
    justifyContent: "center",
  },
});
