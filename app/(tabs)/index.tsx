import Tray from "@/components/Tray";
import { FilamentScene } from "react-native-filament";

export default function HomeScreen() {
  return (
    <FilamentScene>
      <Tray />
    </FilamentScene>
  );
}
