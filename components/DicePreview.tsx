import Dice from "@/components/Dice";
import { ContactShadows } from "@react-three/drei";
import { Canvas } from "@react-three/fiber/native";
import { Suspense } from "react";
import { StyleSheet } from "react-native";

export default function DicePreview({ diceColor }: { diceColor: string }) {
  console.log("render", diceColor);
  return (
    <Canvas style={styles.canvasContainer}>
      <directionalLight position={[1, 0, 0]} args={["white", 2]} />
      <directionalLight position={[0, 1, 0]} args={["white", 2]} />
      <directionalLight position={[-1, 0, 0]} args={["white", 2]} />
      <directionalLight position={[0, -1, 0]} args={["white", 2]} />
      <directionalLight position={[0, 0, 1]} args={["white", 2]} />
      <directionalLight position={[0, 0, -1]} args={["white", 2]} />
      <Suspense>
        <Dice color={diceColor} scale={2.5} enableRotation />
      </Suspense>
      <ContactShadows position={[0, -2, 0]} />
    </Canvas>
  );
}

const styles = StyleSheet.create({
  canvasContainer: {
    flex: 1,
    backgroundColor: "#99c1de",
    borderRadius: 10,
    margin: 10,
  },
});
