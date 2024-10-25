
import { useThree } from '@react-three/fiber';
import { useProgress } from '@react-three/drei';
import { useRef, useState } from 'react';
import { useEffect } from 'react';
import { Vector3 } from 'three';
import gsap from 'gsap';

import { RADIUS } from '../constants';

const DURATION = 10;

export default function useCinematicTransition() {
  const { camera } = useThree()
  const tl = useRef(gsap.timeline());
  const state = useProgress();
  const [complited, setCompleted] = useState(false);

  useEffect(() => {
    if (!state.active) {
      const rotationData = { angle: Math.PI };
  
      tl.current
        .to(rotationData, {
          angle: Math.PI * 3,
          duration: DURATION,
          ease: "power1.inOut", // Linear easing for constant speed
          repeat: 1,
          onUpdate: () => {
            const angle = rotationData.angle;
            camera.position.x = RADIUS * Math.cos(angle);
            camera.position.z = RADIUS * Math.sin(angle);
            camera.lookAt(new Vector3(1, 10, 0));
          },
        }).to(camera.position, {
          y: 7,
          z: RADIUS * Math.sin(Math.PI),
          duration: 3,
          ease: "power1.inOut",
          onUpdate: () => camera.lookAt(8.5, 7, 0),
        }).to(camera.position, {
          x: 8,
          z: RADIUS * Math.sin(Math.PI), 
          duration: 3,
          ease: "power1.inOut",
          onUpdate: () => camera.lookAt(8.5, 7, 0),
          onComplete: () => setCompleted(true),
        }, "-=0.25");
    }
  }, [state.active]);

  return complited;
}