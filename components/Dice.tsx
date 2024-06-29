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
  ...props
}: JSX.IntrinsicElements["group"] & {
  enableRotation?: boolean;
  color?: string;
}) {
  const { nodes, materials } = useGLTF(
    require("../assets/models/dice.glb")
  ) as GLTFResult;
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (mesh.current) {
      return (mesh.current.rotation.y += delta * 0.5);
    }
  });

  return (
    <group {...props} dispose={null}>
      <mesh
        ref={enableRotation ? mesh : null}
        castShadow
        receiveShadow
        geometry={nodes.Object_2.geometry}
        material={materials["Scene_-_Root"]}
        material-color={color}
        rotation={[-Math.PI, 0.5, 0]}
        scale={0.05}
      />
    </group>
  );
}
