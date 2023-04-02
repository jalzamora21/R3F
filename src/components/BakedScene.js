import { Canvas, useFrame, extend, useThree } from '@react-three/fiber';
import { Raycaster, Vector2, MeshBasicMaterial, sRGBEncoding } from 'three';
import { Suspense, useEffect, useRef, useState } from 'react';
import { OrbitControls, useGLTF, useTexture } from '@react-three/drei';
import { Physics, usePlane, useSphere } from '@react-three/cannon';
import pingSound from '../resources/ping.mp3';
import { useControls } from 'leva';

const ping = new Audio(pingSound);

const BouncyBall = (props) => {
  const { bounceFactor } = useControls('BouncyBall', {
    bounceFactor: { value: 0.8, min: 0, max: 2 },
  });

  // useRef to solve stale state problem
  const bounceFactorRef = useRef(bounceFactor);
  bounceFactorRef.current = bounceFactor;

  const onCollide = (e) => {
    const impactVelocity = e.contact.impactVelocity;
    ping.currentTime = 0;
    ping.play();

    const impulse = [0, impactVelocity * bounceFactorRef.current, 0];
    const worldPoint = [0, 0, 0];
    sphereApi.applyImpulse(impulse, worldPoint);
  };
  const [ref, sphereApi] = useSphere(() => ({ onCollide, ...props }));
  return (
    <mesh
      ref={ref}
      onClick={() => {
        const impulse = [0, 10, 0];
        const worldPoint = [0, 0, 0];
        sphereApi.applyImpulse(impulse, worldPoint);
      }}
    >
      <sphereGeometry />
    </mesh>
  );
};

const PhysicsPlane = (props) => {
  const [ref] = usePlane(() => ({ ...props }));
};

const BakedSceneGeometry = (props) => {
  const texture = useTexture('/static/bakedScene/baked.jpg', (texture) => {
    texture.flipY = false;
    texture.encoding = sRGBEncoding;
  });
  const { scene } = useGLTF('/static/bakedScene/portal.glb');

  useEffect(() => {
    scene.traverse((child) => {
      const bakedMaterial = new MeshBasicMaterial({ map: texture });
      const portalMaterial = new MeshBasicMaterial({ color: 0xffffff });

      child.material = bakedMaterial;

      const portalLightMesh = scene.children.find((child) => child.name === 'Emission');
      portalLightMesh.material = portalMaterial;
    });
  }, [scene]);

  // This reference will give us direct access to the mesh
  const mesh = useRef();

  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => {});

  // Return view, these are regular three.js elements expressed in JSX
  return (
    <primitive {...props} ref={mesh} object={scene}>
      {/*<meshStandardMaterial wireframe={true} map={texture} />*/}
    </primitive>
  );
};

const BakedScene = (props) => {
  return (
    <Canvas>
      <Physics>
        <OrbitControls />
        <ambientLight />
        <Suspense fallback={null}>
          <BouncyBall
            mass={1}
            position={[0, 2, 0]}
          ></BouncyBall>
          <PhysicsPlane rotation={[-Math.PI / 2, 0, 0]}></PhysicsPlane>
          <BakedSceneGeometry></BakedSceneGeometry>
        </Suspense>
      </Physics>
    </Canvas>
  );
};

export default BakedScene;
