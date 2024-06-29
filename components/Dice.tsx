import { useGLTF } from "@react-three/drei/native";
import React from "react";
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
  ...props
}: JSX.IntrinsicElements["group"] & { color?: string }) {
  const { nodes, materials } = useGLTF(
    require("../assets/models/dice.glb")
  ) as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_2.geometry}
        material={materials["Scene_-_Root"]}
        material-color={color}
        rotation={[-Math.PI, 0, 0]}
        scale={0.05}
      />
    </group>
  );
}
