import { PointerLockControls, Environment, Gltf } from "@react-three/drei";
import { useState, useRef, useEffect } from 'react';
import { useThree, useFrame } from "@react-three/fiber";
import { Raycaster, Vector3 } from 'three';

import useCinematicTransition from '../hooks/useCinematicTransition';

import Ship from './Ship'

export default function LethalScene({ content, progress, setActiveScreen, setMessage, setProgress, interacting, setInteracting }) {
  const completed = useCinematicTransition();

  const { camera, scene } = useThree();
  const raycaster = useRef(new Raycaster());
  const [isControlActive, setControlActive] = useState(false);

  useFrame(() => {
    raycaster.current.set(camera.position, camera.getWorldDirection(new Vector3()));

    const intersects = raycaster.current.intersectObjects(scene.children, true);

    const isPointingAtTarget = intersects.some((intersect) => intersect.object.name === "targetMesh");

    if (isPointingAtTarget) setMessage('HOLD "E" TO INTERACT');
    else if (isControlActive) setMessage('');

    if (isPointingAtTarget && isControlActive && interacting) {
      if (progress !== 100) {
        setProgress((state) => state + 5);
        return
      }
    }
  });

  useEffect(() => {
    if (completed) {
      setMessage('CLICK SCREEN TO INTERACT');
      window.addEventListener('click', () => {
        setMessage('')
        setControlActive(true)
      });
      window.addEventListener('keydown', (e) => {
        if (e.key !== 'ESC') return;
        setControlActive(false)
      });
      window.addEventListener('keyup', (e) => {
        if (e.key !== 'e') return;
        setActiveScreen((state) => state + 1);
        setInteracting(false)
        setProgress(0)
      });
      window.addEventListener('keydown', (e) => {
        if (e.key !== 'e') return;
        setInteracting(true)
      });
    }
  }, [completed]);

  return (
    <group>
      <spotLight position={[7, 7, 7]} castShadow intensity={50} shadow-bias={-0.0001} />
      <pointLight position={[10, 10, 10]} />
      <Environment preset="forest" />
      <ambientLight intensity={1} />
      <Ship screens={content} />
      {completed && <PointerLockControls />}
    </group>
  );
}