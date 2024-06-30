import { Entypo } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";

export default function DiceColorButton({
  color,
  selectedColor,
  onPress,
}: {
  color: string;
  selectedColor: string;
  onPress: (color: string) => void;
}) {
  return (
    <Pressable
      onPress={() => onPress(color)}
      style={[styles.button, { backgroundColor: color }]}
    >
      {selectedColor === color && (
        <Entypo name="check" size={24} color="black" />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderColor: "black",
    borderWidth: 4,
    justifyContent: "center",
    alignItems: "center",
  },
});
