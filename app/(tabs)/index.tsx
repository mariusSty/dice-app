import Dice from "@/components/Dice";
import { ContactShadows } from "@react-three/drei";
import { Canvas } from "@react-three/fiber/native";
import useControls from "r3f-native-orbitcontrols";
import { Suspense } from "react";
import { View } from "react-native";

export default function HomeScreen() {
  const [OrbitControls, events] = useControls();

  return (
    <View style={{ flex: 1 }} {...events}>
      <Canvas>
        <OrbitControls enablePan={false} enableZoom={false} />
        <directionalLight position={[1, 0, 0]} args={["white", 2]} />
        <directionalLight position={[0, 1, 0]} args={["white", 2]} />
        <directionalLight position={[-1, 0, 0]} args={["white", 2]} />
        <directionalLight position={[0, -1, 0]} args={["white", 2]} />
        <directionalLight position={[0, 0, 1]} args={["white", 2]} />
        <directionalLight position={[0, 0, -1]} args={["white", 2]} />
        <Suspense>
          <Dice />
        </Suspense>
        <ContactShadows position={[0, -0.5, 0]} />
      </Canvas>
    </View>
  );
}
