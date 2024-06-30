import Dice from "@/components/Dice";
import DiceColorButton from "@/components/DiceColorButton";
import { colors } from "@/constants/DiceColors";
import { ContactShadows } from "@react-three/drei";
import { Canvas } from "@react-three/fiber/native";
import { Gyroscope } from "expo-sensors";
import { Subscription } from "expo-sensors/build/Pedometer";
import { StatusBar } from "expo-status-bar";
import { Suspense, useEffect, useState } from "react";
import { Platform, ScrollView, StyleSheet, View } from "react-native";

export default function EditModalScreen() {
  const [diceColor, setDiceColor] = useState("#FFFFFF");
  const [{ x, y }, setData] = useState({
    x: 0,
    y: 0,
  });
  const [subscription, setSubscription] = useState<Subscription | null>(null);

  Gyroscope.setUpdateInterval(16);

  const _subscribe = () => {
    setSubscription(
      Gyroscope.addListener((gyroscopeData) => {
        setData(gyroscopeData);
      })
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

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
          <Dice
            isSensorEnabled
            color={diceColor}
            sensorX={x}
            sensorY={y}
            scale={0.07}
          />
        </Suspense>
        <ContactShadows position={[0, -1.5, 0]} />
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
