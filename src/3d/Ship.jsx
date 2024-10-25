import { Gltf, useGLTF, Html } from '@react-three/drei';
import { DoubleSide } from 'three';

import GlitchText from '../components/GlitchText'

import style from './style.module.css';

export default function Ship({ screens }) {
  return (
    <group>
      <Gltf src={'scene.gltf'} />
      <group>
        <mesh>
          <Html scale={0.1} rotation-y={-Math.PI / 2} position={[9.383, 7.07, 0.35]} transform occlude>
            <div className={style.monitoring}>
              {screens.monitoring.map((text) => (
                <GlitchText className="text-2xl">
                  <div>{text}</div>
                </GlitchText>
              ))}
            </div>
          </Html>
        </mesh>
        <mesh>
          <Html scale={0.1} rotation-y={Math.PI / 2.85} position={[8.98, 7.05, 2.152]} transform occlude>
            <div className={style.item}>
              <GlitchText>
                <img src={screens.secondScreen} alt="" />
              </GlitchText>
            </div>
          </Html>
        </mesh>
        <mesh name="targetMesh" position={[8.45, 6.2, 0.4]} rotation={[Math.PI / 2, 0, 0]} scale={[1, 1, 1]}>
          <planeGeometry args={[0.5, 0.5]} />
          <meshBasicMaterial transparent opacity={0} color="green" side={DoubleSide} />
        </mesh>
      </group>
    </group>
  );
}

useGLTF.preload('scene.gltf')
