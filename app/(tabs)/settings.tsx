import DicePreview from "@/components/DicePreview";
import { Entypo } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Settings() {
  const [dices, setDices] = useState<string[]>(["#ffffff"]);

  function handleAddDice() {
    setDices((prev) => [...prev, "#ffffff"]);
  }

  function handleRemoveDice(index: number) {
    setDices((prev) => prev.filter((_, prevIndex) => prevIndex != index));
  }

  return (
    <SafeAreaView style={styles.container}>
      {dices.map((color, index) => (
        <View key={index} style={styles.diceContainer}>
          {index !== 0 && (
            <Pressable
              style={styles.removeDiceButton}
              onPress={() => handleRemoveDice(index)}
            >
              <Entypo name="cross" size={30} color="black" />
            </Pressable>
          )}
          <DicePreview diceColor={color} />
        </View>
      ))}
      <View style={styles.diceContainer}>
        <Pressable style={styles.addDiceButton} onPress={handleAddDice}>
          <Entypo name="plus" size={80} color="#99c1de" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 10,
  },
  diceContainer: {
    width: "50%",
    height: 200,
  },
  canvasContainer: {
    flex: 1,
    backgroundColor: "#99c1de",
    borderRadius: 10,
    margin: 10,
  },
  addDiceButton: {
    flex: 1,
    backgroundColor: "#304674",
    borderRadius: 10,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  removeDiceButton: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 1,
    backgroundColor: "#ffadad",
    borderRadius: 50,
  },
});
