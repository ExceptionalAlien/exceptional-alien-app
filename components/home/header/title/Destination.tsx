import { useState, useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import { styleVars } from "utils/styles";

type DestinationProps = {
  name: string;
};

export default function Destination(props: DestinationProps) {
  const [name, setName] = useState("");

  useEffect(() => {
    var timeout: undefined | ReturnType<typeof setTimeout>;
    var random = "";

    const alphabet = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
    ];

    const generateName = (final: string, current: string) => {
      var updated = current;

      for (let i = 0; i < updated.length; i++) {
        var finalChar = final.charAt(i);
        var currentChar = updated.charAt(i);

        // Replace if characters don't match
        if (finalChar.replace("Ñ", "N") !== currentChar) {
          let index = alphabet.indexOf(currentChar);
          let replacement = alphabet[index === 25 ? 0 : index + 1]; // Loop alphabet if index is Z
          updated = updated.substring(0, i) + replacement + updated.substring(i + 1); // Replace char
        }
      }

      timeout = setTimeout(() => {
        setName(updated);

        // Loop until destination name revealed
        if (updated !== final) generateName(final, updated);
      }, 25);
    };

    for (let i = 0; i < props.name.length; i++) {
      let letter = Math.floor(Math.random() * 26);
      random += props.name.charAt(i) === " " ? " " : alphabet[letter]; // Check for space
    }

    setName(random);
    generateName(props.name.toUpperCase(), random); // Shuffle animation
    return () => clearTimeout(timeout);
  }, [props.name]);

  return (
    <Text style={styles.container} allowFontScaling={false}>
      {name}
    </Text>
  );
}

const styles = StyleSheet.create({
  container: {
    fontFamily: "Neue-Haas-Grotesk-Med",
    fontSize: 24,
    lineHeight: 24,
    color: styleVars.eaBlue,
  },
});
