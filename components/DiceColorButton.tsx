import { Pressable } from "react-native";

export default function DiceColorButton({
  color,
  onPress,
}: {
  color: string;
  onPress: (color: string) => void;
}) {
  return (
    <Pressable
      onPress={() => onPress(color)}
      style={{
        width: 40,
        height: 40,
        borderRadius: 20,
        borderColor: "black",
        borderWidth: 4,
        backgroundColor: color,
      }}
    />
  );
}
