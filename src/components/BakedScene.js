import { Canvas, useFrame, extend, useThree } from '@react-three/fiber';
import { Raycaster, Vector2, MeshBasicMaterial, sRGBEncoding } from 'three';
import {Suspense, useEffect, useRef, useState} from 'react';
import {OrbitControls, useGLTF, useTexture} from '@react-three/drei';

const BakedSceneGeometry = (props) => {
  const texture = useTexture('/static/bakedScene/baked.jpg', (texture) => {
    texture.flipY = false
    texture.encoding = sRGBEncoding
  });
  const { scene } = useGLTF('/static/bakedScene/portal.glb');

  useEffect(() => {
    scene.traverse((child) =>
    {
      const bakedMaterial = new MeshBasicMaterial({ map: texture })
      const portalMaterial = new MeshBasicMaterial({ color: 0xffffff })

      child.material = bakedMaterial

      const portalLightMesh = scene.children.find((child) => child.name === 'Emission')
      portalLightMesh.material = portalMaterial
    })
  }, [scene]);

  // This reference will give us direct access to the mesh
  const mesh = useRef();

  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => {});

  // Return view, these are regular three.js elements expressed in JSX
  return (
    <primitive
      {...props}
      ref={mesh}
      object={scene}
    >
      {/*<meshStandardMaterial wireframe={true} map={texture} />*/}
    </primitive>
  );
};

const BakedScene = (props) => {
  return (
    <Canvas>
      <OrbitControls />
      <ambientLight />
      <Suspense fallback={null}>
        <BakedSceneGeometry></BakedSceneGeometry>
      </Suspense>
    </Canvas>
  );
};

export default BakedScene;
