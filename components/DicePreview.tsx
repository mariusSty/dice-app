import Dice from "@/components/Dice";
import { ContactShadows } from "@react-three/drei";
import { Canvas } from "@react-three/fiber/native";
import { router } from "expo-router";
import { Suspense } from "react";
import { StyleSheet } from "react-native";

export default function DicePreview({ diceColor }: { diceColor: string }) {
  return (
    <Canvas
      style={styles.canvasContainer}
      onTouchStart={() => router.push("/edit")}
    >
      <directionalLight position={[1, 0, 0]} args={["white", 2]} />
      <directionalLight position={[0, 1, 0]} args={["white", 2]} />
      <directionalLight position={[-1, 0, 0]} args={["white", 2]} />
      <directionalLight position={[0, -1, 0]} args={["white", 2]} />
      <directionalLight position={[0, 0, 1]} args={["white", 2]} />
      <directionalLight position={[0, 0, -1]} args={["white", 2]} />
      <Suspense>
        <Dice color={diceColor} scale={0.13} enableRotation />
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
