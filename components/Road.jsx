import { RigidBody } from "@react-three/rapier";
import {
  roadEdgeHeight,
  roadEdgeLeftPos,
  roadEdgeRightPos,
  roadEdgeWidth,
  roadInitPos,
  roadLength,
  roadWidth,
} from "../constants.js";

function Road() {
  return (
    <RigidBody friction={1} type="fixed">
      <group>
        <mesh position={roadInitPos} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[roadWidth, roadLength]} />

          <meshStandardMaterial color={"#777"} metalness={0.3} />
        </mesh>
        <RoadEdge pos={roadEdgeLeftPos} />
        <RoadEdge pos={roadEdgeRightPos} />
      </group>
    </RigidBody>
  );
}

function RoadEdge({ pos }) {
  return (
    <RigidBody type="fixed">
      <mesh position={pos}>
        <boxGeometry args={[roadEdgeWidth, roadEdgeHeight, roadLength]} />
        <meshStandardMaterial color={"#555"} metalness={0.3} />
      </mesh>
    </RigidBody>
  );
}

export default Road;
