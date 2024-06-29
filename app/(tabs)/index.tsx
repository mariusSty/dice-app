import Dice from "@/components/Dice";
import DiceColorButton from "@/components/DiceColorButton";
import { ContactShadows } from "@react-three/drei";
import { Canvas } from "@react-three/fiber/native";
import { Suspense, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

export default function HomeScreen() {
  const colors = [
    "#ffffff",
    "#ffadad",
    "#ffd6a5",
    "#fdffb6",
    "#caffbf",
    "#9bf6ff",
    "#a0c4ff",
    "#bdb2ff",
    "#ffc6ff",
  ];
  const [diceColor, setDiceColor] = useState("#FFFFFF");

  return (
    <View style={styles.container}>
      <Canvas style={styles.canvas}>
        <directionalLight position={[1, 0, 0]} args={["white", 2]} />
        <directionalLight position={[0, 1, 0]} args={["white", 2]} />
        <directionalLight position={[-1, 0, 0]} args={["white", 2]} />
        <directionalLight position={[0, -1, 0]} args={["white", 2]} />
        <directionalLight position={[0, 0, 1]} args={["white", 2]} />
        <directionalLight position={[0, 0, -1]} args={["white", 2]} />
        <Suspense>
          <Dice color={diceColor} />
        </Suspense>
        <ContactShadows position={[0, -0.5, 0]} />
      </Canvas>

      <View style={styles.colorSwitcherContainer}>
        <ScrollView
          horizontal
          contentContainerStyle={styles.colorSwitcherScrollView}
        >
          {colors.map((color) => (
            <DiceColorButton key={color} color={color} onPress={setDiceColor} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  canvas: {
    flex: 1,
  },
  colorSwitcherContainer: {
    backgroundColor: "#99c1de",
  },
  colorSwitcherScrollView: {
    padding: 30,
    gap: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
