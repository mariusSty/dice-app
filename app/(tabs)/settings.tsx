import DicePreview from "@/components/DicePreview";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { FilamentScene } from "react-native-filament";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Settings() {
  const [dices, setDices] = useState<number>(1);

  function handleAddDice() {
    if (dices < 9) {
      setDices((prev) => prev + 1);
    }
  }

  function handleRemoveDice() {
    if (dices > 1) {
      setDices((prev) => prev - 1);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <FilamentScene>
        <DicePreview />
      </FilamentScene>
      <View style={styles.inputContainer}>
        <Text style={styles.diceText}>{dices}</Text>
        <View style={styles.inputButtonContainer}>
          <Pressable style={styles.inputButton} onPress={handleRemoveDice}>
            <Text style={styles.inputText}>-</Text>
          </Pressable>
          <Pressable style={styles.inputButton} onPress={handleAddDice}>
            <Text style={styles.inputText}>+</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  inputContainer: {
    flex: 1,
    borderRadius: 10,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  diceText: {
    fontSize: 70,
    fontWeight: "bold",
    color: "#304674",
  },
  inputButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    gap: 20,
    marginTop: 30,
    width: "100%",
  },
  inputText: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#304674",
  },
  inputButton: {
    height: 80,
    width: 80,
    backgroundColor: "#99c1de",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
});
