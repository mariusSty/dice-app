import Dice from "@/components/Dice";
import DiceColorButton from "@/components/DiceColorButton";
import { colors } from "@/constants/DiceColors";
import { ContactShadows } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { StatusBar } from "expo-status-bar";
import { Suspense, useState } from "react";
import { Platform, ScrollView, StyleSheet, View } from "react-native";

export default function EditModalScreen() {
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
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
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
