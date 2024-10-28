import { Canvas } from "@react-three/fiber";
import { Physics, RigidBody } from "@react-three/rapier";
import { lerp } from "three/src/math/MathUtils.js";
import "./App.css";
import Ball from "./components/Ball.jsx";
import Road from "./components/Road.jsx";
import {
  ballRadius,
  cameraPos,
  roadEdgeLeftPos,
  roadEdgeWidth,
  roadWidth,
} from "./constants.js";
function App() {
  return (
    <>
      {" "}
      <Scene />
    </>
  );
}

function Obstacle({ pos, size }) {
  return (
    <RigidBody type="fixed">
      <mesh position={pos}>
        <boxGeometry args={size} />
        <meshStandardMaterial color={"#999"} metalness={0.3} />
      </mesh>
    </RigidBody>
  );
}
function Obstacles() {
  const N = 10;
  const zsAndWidths = [];
  for (let i = 0; i < N; i++) {
    zsAndWidths.push({
      z: Math.random() * -1000,
      width: lerp(0, roadWidth - ballRadius * 8, Math.random()),
    });
  }

  // const
  var obstacles = [];
  for (let i = 0; i < N; i++) {
    var startX =
      roadEdgeLeftPos[0] + roadEdgeWidth / 2 + zsAndWidths[i].width / 2;
    const pos = [startX, 2, zsAndWidths[i].z];
    const left = (
      <Obstacle key={i} pos={pos} size={[zsAndWidths[i].width, 4, 1]} />
    );
    obstacles.push(left);
    // const rightWidth = obstacles.push(<>{left}</>);
  }
  return <>{obstacles}</>;
}
function Scene() {
  return (
    <Canvas
      camera={{ position: cameraPos, fov: 60 }}
      style={{ height: "100vh", width: "100vw", backgroundColor: "black" }}
    >
      <Physics gravity={[0, -10, 0]}>
        <ambientLight intensity={0.4} />
        <directionalLight intensity={0.5} position={[0, 2, 5]} />
        {/* <RandomBalls /> */}
        {/* <OrbitControls></OrbitControls> */}
        <Obstacles />
        <Road />
        <Ball isMainBall={true} />
      </Physics>
    </Canvas>
  );
}

export default App;
