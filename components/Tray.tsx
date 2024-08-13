import { useCallback, useEffect, useState } from "react";
import {
  BulletAPI,
  Camera,
  DefaultLight,
  Entity,
  FilamentView,
  Float3,
  RenderCallback,
  RigidBody,
  useBoxShape,
  useFilamentContext,
  useModel,
  useRigidBody,
  useStaticPlaneShape,
  useWorld,
} from "react-native-filament";

export default function Tray() {
  const initialPosition: Float3[] = [
    [-0.5, 3, 0],
    [0, 4, 0],
    [0.5, 5, 0],
  ];
  const world = useWorld(0, -9.8, 0);
  const { transformManager } = useFilamentContext();
  const [dicesEntitiesWithRigidBody, setDicesEntitiesWithRigidBody] = useState<
    {
      entity: Entity;
      rigidBody: RigidBody;
    }[]
  >([]);

  // Dice
  const dice = useModel(require("../assets/models/dice.glb"), {
    instanceCount: 3,
  });
  const boxShape = useBoxShape(0.5, 0.5, 0.5);
  boxShape.localScaling;

  // Floor
  const floorShape = useStaticPlaneShape(0, 1, 0, 0);
  useRigidBody({
    mass: 0,
    origin: [0, -1.5, 0],
    friction: 100,
    shape: floorShape,
    world,
    id: "floor",
  });

  useEffect(() => {
    if (dice.state === "loaded") {
      const instances = dice.asset.getAssetInstances();
      for (const [i, instance] of instances.entries()) {
        const entity = instance.getRoot();
        transformManager.setEntityPosition(entity, initialPosition[i], true);
        const transform = transformManager.getTransform(entity);
        const rigidBody = BulletAPI.createRigidBodyFromTransform(
          1,
          transform,
          boxShape,
          "dice",
          undefined
        );
        rigidBody.activationState = "disable_deactivation";
        rigidBody.setDamping(0.0, 0.5);
        world.addRigidBody(rigidBody);
        setDicesEntitiesWithRigidBody((prev) => [
          ...prev,
          { entity, rigidBody },
        ]);
      }
    }
  }, [dice.state]);

  const renderCallback: RenderCallback = useCallback(
    ({ passedSeconds, timeSinceLastFrame }) => {
      "worklet";

      if (passedSeconds <= 1) {
        return;
      }

      world.stepSimulation(timeSinceLastFrame, 1, 1 / 60);
      for (const { entity, rigidBody } of dicesEntitiesWithRigidBody) {
        transformManager.updateTransformByRigidBody(entity, rigidBody);
      }
    },
    [dicesEntitiesWithRigidBody, transformManager, world]
  );

  const handleReset = () => {
    for (const [
      index,
      { entity, rigidBody },
    ] of dicesEntitiesWithRigidBody.entries()) {
      world.removeRigidBody(rigidBody);
      transformManager.setEntityPosition(entity, initialPosition[index], false);
      const resetTransform = transformManager.getTransform(entity);
      const newRigidBody = BulletAPI.createRigidBodyFromTransform(
        1,
        resetTransform,
        boxShape,
        "dice",
        undefined
      );
      newRigidBody.activationState = "disable_deactivation";
      newRigidBody.setDamping(0.0, 0.5);
      world.addRigidBody(newRigidBody);
      setDicesEntitiesWithRigidBody((prev) => {
        const newState = [...prev];
        newState[index].rigidBody = newRigidBody;
        return newState;
      });
    }
  };

  return (
    <FilamentView
      style={{ flex: 1 }}
      renderCallback={renderCallback}
      onTouchStart={handleReset}
    >
      <DefaultLight />
      <Camera />
    </FilamentView>
  );
}
