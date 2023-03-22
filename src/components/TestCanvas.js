import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { clamp } from 'lodash';

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
    const { currentSpeed } = userData;

    // Move current speed towards target speed
    if (currentSpeed < targetSpeed) userData.currentSpeed += delta * speedStep;
    else if (currentSpeed > targetSpeed) userData.currentSpeed -= delta * speedStep;

    mesh.current.rotation.x += delta * currentSpeed;
    mesh.current.rotation.y += delta * currentSpeed;
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
