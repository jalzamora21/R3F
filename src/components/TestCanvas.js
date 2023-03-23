import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { moveTowards } from '../utils/math';

const Box = (props) => {
  const speedOnClick = 10;

  // This reference will give us direct access to the mesh
  const mesh = useRef();
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => {
    const targetSpeed = hovered ? 0.05 : 0.5;

    const speedStep = 3;

    const userData = mesh.current.userData;
    userData.currentSpeed ??= targetSpeed;
    // userData.currentSpeed = clamp(userData.currentSpeed, 0, 0.5);

    userData.currentSpeed = moveTowards(userData.currentSpeed, targetSpeed, delta * speedStep);

    mesh.current.rotation.x += delta * userData.currentSpeed;
    mesh.current.rotation.y += delta * userData.currentSpeed;
  });
  // Return view, these are regular three.js elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={(event) => {
        mesh.current.userData.currentSpeed = speedOnClick;
        // setActive(!active);
      }}
      onPointerOver={(event) => {
        console.log('pointer over', event);
        setHover(true);
      }}
      onPointerOut={(event) => setHover(false)}
    >
      <dodecahedronGeometry args={[2]} />
      <meshStandardMaterial color={hovered ? 'cyan' : 'orange'} wireframe={true} />
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
