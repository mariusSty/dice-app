import { useCallback } from "react";
import { StyleSheet } from "react-native";
import {
  Camera,
  DefaultLight,
  FilamentView,
  Float3,
  Model,
  RenderCallback,
} from "react-native-filament";
import { useSharedValue } from "react-native-worklets-core";

export default function DicePreview({ diceColor }: { diceColor: string }) {
  const rotation = useSharedValue<Float3>([0, 0, 0]);

  const renderCallback: RenderCallback = useCallback(() => {
    "worklet";
    const newY = rotation.value[1] + 0.0001;
    rotation.value = [0, newY, 0];
  }, [rotation]);

  return (
    <FilamentView style={styles.container} renderCallback={renderCallback}>
      <DefaultLight />
      <Camera />
      <Model source={require("../assets/models/dice.glb")} rotate={rotation} />
    </FilamentView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#99c1de",
    borderRadius: 10,
    margin: 10,
  },
});
