import { useFrame, useThree } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { useEffect, useRef } from "react";
import { ballInitPos, ballRadius, cameraPos, force } from "../constants.js";

export default function Ball({ isMainBall, initPosition }) {
  const ballRef = useRef();
  const { camera } = useThree();

  // Set initial camera position once
  useEffect(() => {
    if (isMainBall) {
      camera.position.set(0, 10, 30);
      camera.lookAt(0, 0, 0);
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!ballRef.current || !isMainBall) return;
      var impulse = { x: 0, y: 0, z: 0 };

      console.log("Key pressed:", e.key);
      switch (e.key) {
        case "ArrowUp":
          impulse.z = -force;
          break;
        case "ArrowDown":
          impulse.z = force;
          break;
        case "ArrowLeft":
          impulse.x = -force;
          break;
        case "ArrowRight":
          impulse.x = force;
          break;
      }

      ballRef.current.applyImpulse(impulse);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  useFrame(() => {
    const position = ballRef.current.translation();

    camera.position.set(
      position.x,
      position.y + cameraPos[1],
      position.z + cameraPos[2]
    );
    camera.lookAt(position.x, position.y, position.z);
  });
  return (
    <>
      <RigidBody ref={ballRef} ccd={true}>
        <mesh position={isMainBall ? ballInitPos : initPosition}>
          <sphereGeometry args={[ballRadius, 35, 35]} />
          <meshStandardMaterial color={isMainBall ? "#f00" : "blue"} />
        </mesh>
      </RigidBody>
    </>
  );
}
