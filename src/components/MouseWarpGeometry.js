import { Canvas, useFrame, extend, useThree } from '@react-three/fiber';
import { useControls } from 'leva';
import { Color, Raycaster, Vector2 } from 'three';
import { inverseLerp, moveTowards } from '../utils/math';
import { useRef, useState } from 'react';
import { shaderMaterial } from '@react-three/drei';

const ColorShiftMaterial = shaderMaterial(
  { time: 0, color: new Color(1, 1, 1), color2: new Color(0.5, 0, 1), u_mouse: new Vector2(0, 0) },
  /*glsl*/`
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // fragment shader
  /*glsl*/`
    uniform float time;
    uniform vec3 color;
    uniform vec3 color2;
    uniform vec2 u_mouse;
    varying vec2 vUv;
    
    void main() {
      float mouseDistance = abs(distance(vUv, u_mouse))*1.0;
      gl_FragColor.rgba = vec4(mouseDistance, mouseDistance, mouseDistance, 1.0);
      // gl_FragColor.rgba = mouseDistance < 50.0 ? vec4(color, 1.0) : vec4(color2, 1.0);
      // gl_FragColor.rgba = vec4(u_mouse, 1.0, 1.0);
    }
  `
);

extend({ ColorShiftMaterial });

const PlaneWarp = (props) => {
  const levaProperties = useControls('ClickMeGeometry', {
    speedOnClick: { value: 30, min: 1, max: 100 },
    colorShiftSpeed: { value: 5, min: 1, max: 15 },
    speedStep: { value: 3, min: 1, max: 6 },
    hoverColor: '#0077ff',
    defaultColor: '#fff',
    highSpeedColor: '#ff7f00',
    highSpeedThreshold: { value: 0.7, min: 0.1, max: 100 },
  });

  levaProperties.hoverColor = new Color(levaProperties.hoverColor);
  levaProperties.defaultColor = new Color(levaProperties.defaultColor);
  levaProperties.highSpeedColor = new Color(levaProperties.highSpeedColor);

  const {
    speedOnClick,
    colorShiftSpeed,
    speedStep,
    hoverColor,
    defaultColor,
    highSpeedColor,
    highSpeedThreshold,
  } = levaProperties;

  // This reference will give us direct access to the mesh
  const mesh = useRef();
  // Set up state for the hovered and active state
  const [uvPosition, setUvPosition] = useState(new Vector2(0, 0));
  console.log(uvPosition);
  const [active, setActive] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => {
    // const targetSpeed = hovered ? 0.05 : 0.5;
    //
    // const userData = mesh.current.userData;
    // userData.currentSpeed ??= targetSpeed;
    // userData.currentColor ??= defaultColor;
    // // userData.currentSpeed = clamp(userData.currentSpeed, 0, 0.5);
    //
    // const targetColor = getTargetColor(userData.currentSpeed, hovered);
    //
    // if (userData.currentSpeed > highSpeedThreshold) userData.currentColor = highSpeedColor;
    //
    // userData.currentSpeed = moveTowards(
    //   userData.currentSpeed,
    //   targetSpeed,
    //   userData.currentSpeed * delta * speedStep,
    // );
    // userData.currentColor.lerp(targetColor, Math.min(delta * colorShiftSpeed, 1));
    //
    // mesh.current.rotation.x += delta * userData.currentSpeed;
    // mesh.current.rotation.y += delta * userData.currentSpeed;
    // mesh.current.material.color = userData.currentColor;
  });

  const { camera, scene } = useThree();

  const raycaster = new Raycaster();
  const pointer = new Vector2();

  // Return view, these are regular three.js elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.1 : 1}
      onClick={() => {
        // mesh.current.userData.currentSpeed = speedOnClick;
        // setActive(!active);
      }}
      // onPointerDown={() => setActive(true)}
      // onPointerUp={() => setActive(false)}
      // onPointerOver={(event) => {
      //   setHover(true);
      // }}
      // onPointerOut={() => setHover(false)}
      onPointerMove={(event) => {
        pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
        raycaster.setFromCamera( pointer, camera );
        const intersects = raycaster.intersectObjects( scene.children );
        const uvPos = intersects[0]?.uv;
        setUvPosition(new Vector2(uvPos.x, uvPos.y));
      }}
    >
      <planeGeometry args={[20, 10, 20, 10]} />
      {/*<meshStandardMaterial wireframe={true} />*/}
      <colorShiftMaterial wireframe={true} u_mouse={uvPosition} />
    </mesh>
  );
};

const MouseWarpGeometry = (props) => {
  return (
    <Canvas>
      <ambientLight />
      <PlaneWarp></PlaneWarp>
    </Canvas>
  );
};

export default MouseWarpGeometry;
