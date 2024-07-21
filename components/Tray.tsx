import { useCallback, useMemo } from "react";
import {
  Camera,
  DefaultLight,
  FilamentView,
  getAssetFromModel,
  RenderCallback,
  useBoxShape,
  useFilamentContext,
  useModel,
  useRigidBody,
  useStaticPlaneShape,
  useWorld,
} from "react-native-filament";

export default function Tray() {
  const world = useWorld(0, -9.8, 0);
  const { transformManager } = useFilamentContext();
  const dice = useModel(require("../assets/models/dice.glb"));
  const diceAsset = getAssetFromModel(dice);
  const renderableEntities = useMemo(
    () => diceAsset?.getRenderableEntities(),
    [diceAsset]
  );

  const [meshEntity, meshTransform] = useMemo(() => {
    const entity = renderableEntities?.[0];
    if (entity == null) {
      return [];
    }
    const transform = transformManager.getTransform(entity);
    transformManager.setEntityPosition(entity, [0, 1, 0], true);
    return [entity, transform] as const;
  }, [renderableEntities, transformManager]);
  const floorShape = useStaticPlaneShape(0, 1, 0, 0);
  useRigidBody({
    mass: 0,
    origin: [0, -1.5, 0],
    friction: 100,
    shape: floorShape,
    world,
    id: "floor",
  });
  const boxShape = useBoxShape(0, 0, 0);
  const rigidBody = useRigidBody(
    boxShape == null || meshTransform == null
      ? undefined
      : {
          mass: 1,
          transform: meshTransform,
          shape: boxShape,
          friction: 1,
          world: world,
          id: "dice",
        }
  );
  const renderCallback: RenderCallback = useCallback(
    ({ passedSeconds, timeSinceLastFrame }) => {
      "worklet";

      if (passedSeconds <= 1) {
        return;
      }

      if (meshEntity == null || rigidBody == null) {
        return;
      }
      world.stepSimulation(timeSinceLastFrame, 1, 1 / 60);
      transformManager.updateTransformByRigidBody(meshEntity, rigidBody);
    },
    [rigidBody, meshEntity, transformManager, world]
  );

  return (
    <FilamentView style={{ flex: 1 }} renderCallback={renderCallback}>
      <DefaultLight />
      <Camera />
    </FilamentView>
  );
}
