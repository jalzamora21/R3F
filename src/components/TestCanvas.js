import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { inverseLerp, moveTowards } from '../utils/math';
import { Color } from 'three';

const Box = (props) => {
  const speedOnClick = 10;
  const colorShiftSpeed = 5;
  const speedStep = 3;
  const hoverColor = new Color('#0077ff');
  const defaultColor = new Color('white');
  const highSpeedColor = new Color('orange');
  const highSpeedThreshold = 0.7;

  const getTargetColor = (currentSpeed, hovered) => {
    if (currentSpeed > highSpeedThreshold) {
      inverseLerp(highSpeedThreshold, speedOnClick, currentSpeed)

      return highSpeedColor.clone().lerp(defaultColor, inverseLerp(speedOnClick, highSpeedThreshold, currentSpeed));
    }
    else if (hovered) return hoverColor;
    else return defaultColor;
  };

  // This reference will give us direct access to the mesh
  const mesh = useRef();
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => {
    const targetSpeed = hovered ? 0.05 : 0.5;

    const userData = mesh.current.userData;
    userData.currentSpeed ??= targetSpeed;
    userData.currentColor ??= defaultColor;
    // userData.currentSpeed = clamp(userData.currentSpeed, 0, 0.5);

    const targetColor = getTargetColor(userData.currentSpeed, hovered);

    if (userData.currentSpeed > highSpeedThreshold) userData.currentColor = highSpeedColor;

    userData.currentSpeed = moveTowards(userData.currentSpeed, targetSpeed, delta * speedStep);
    userData.currentColor.lerp(targetColor, delta * colorShiftSpeed);

    mesh.current.rotation.x += delta * userData.currentSpeed;
    mesh.current.rotation.y += delta * userData.currentSpeed;
    mesh.current.material.color = userData.currentColor;
  });
  // Return view, these are regular three.js elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.1 : 1}
      onClick={(event) => {
        mesh.current.userData.currentSpeed = speedOnClick;
        // setActive(!active);
      }}
      onPointerDown={() => setActive(true)}
      onPointerUp={() => setActive(false)}
      onPointerOver={(event) => {
        console.log('pointer over', event);
        setHover(true);
      }}
      onPointerOut={(event) => setHover(false)}
    >
      <dodecahedronGeometry args={[2]} />
      <meshStandardMaterial wireframe={true} />
    </mesh>
  );
};

const TestCanvas = (props) => {
  return (
    <Canvas>
      <ambientLight />
      <Box></Box>
    </Canvas>
  );
};

export default TestCanvas;
