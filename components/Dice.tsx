import { useGLTF } from "@react-three/drei/native";
import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
import * as THREE from "three";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Object_2: THREE.Mesh;
  };
  materials: {
    ["Scene_-_Root"]: THREE.MeshStandardMaterial;
  };
};

export default function Dice({
  color = "#FFFFFF",
  enableRotation = false,
  isSensorEnabled = false,
  sensorX = 0,
  sensorY = 0,
  scale = 0.05,
  ...props
}: JSX.IntrinsicElements["group"] & {
  enableRotation?: boolean;
  color?: string;
  isSensorEnabled?: boolean;
  sensorX?: number;
  sensorY?: number;
  scale?: number;
}) {
  const { nodes, materials } = useGLTF(
    require("../assets/models/dice.glb")
  ) as GLTFResult;
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (mesh.current) {
      if (isSensorEnabled) {
        const x = (mesh.current.rotation.x += sensorX * 0.1);
        const y = (mesh.current.rotation.y += sensorY * 0.1);
        mesh.current.rotation.x = x;
        mesh.current.rotation.y = y;
      } else {
        return (mesh.current.rotation.y += delta * 0.5);
      }
    }
  });

  return (
    <group {...props} dispose={null}>
      <mesh
        ref={enableRotation || isSensorEnabled ? mesh : null}
        castShadow
        receiveShadow
        geometry={nodes.Object_2.geometry}
        material={materials["Scene_-_Root"]}
        material-color={color}
        rotation={[0, Math.PI / 4, 0]}
        scale={scale}
      />
    </group>
  );
}
