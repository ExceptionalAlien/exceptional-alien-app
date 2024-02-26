import { StyleSheet, View } from "react-native";
import { GemType } from "app/gem";
import BigButton from "components/shared/BigButton";

type GemProps = {
  selectedGem: GemType | undefined;
};

export default function Gem(props: GemProps) {
  return (
    <View style={[styles.container, !props.selectedGem && { display: "none" }]}>
      <BigButton
        title="More Info"
        icon="gem"
        route={{
          pathname: "/gem",
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
