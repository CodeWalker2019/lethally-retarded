import { useMemo, useState } from 'react';
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from 'three';
import { KTX2Loader } from 'three-stdlib';
import { BlendFunction } from "postprocessing";
import { Pixelation, ChromaticAberration, EffectComposer, Noise, SMAA, Vignette } from '@react-three/postprocessing'
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import Mask from '../assets/mask.gif';
import Duck from '../assets/duck.gif';
import Gift from '../assets/gift.gif';
import Employee from '../assets/emoloyee.gif';
import Cab from '../assets/cab.gif';

import { RADIUS } from '../constants';

import Content from './Content';
import GlitchText from '../components/GlitchText';

const ktx2Loader = new KTX2Loader()
ktx2Loader.setTranscoderPath(`https://unpkg.com/three@0.169.0/examples/jsm/libs/basis/`)

const CONTENT = [
  {
    monitoring: [
      'MONITORING: PAGE_NOT_FOUND_404',
      'Notes:',
      '* Main peace of shit in game',
      '* Gazed by Spore Lizard',
      '* Likes to baluvatys with lopata',
      '* IF you see HIM do NOT trust HIM',
      '* Sometimes valued employee (a little bit)',
      '* Funny dude, soul of the company',
      '* Best BLACK ever',
    ],
    secondScreen: Mask,
  },
  {
    monitoring: [
      'MONITORING: Gussoni',
      'Notes:',
      '* The most profitable employee',
      '* Best camera bodyguard',
      '* Teleport point',
      '* Looses her mind when sees ducks',
      '* House keeper',
    ],
    secondScreen: Duck,
  },
  {
    monitoring: [
      'MONITORING: Unicorn',
      'Notes:',
      '* Sweet summer child',
      '* Likes Spore Lizards',
      '* Obsessed with looting',
      '* Best looter world has ever seen',
      '* Jumps over monsters when scared to death',
      '* Screamer of the century',
      '* Told to the Lootokrad that key is not a loot',
    ],
    secondScreen: Gift,
  },
  {
    monitoring: [
      'MONITORING: TheShadowRampage',
      'Notes:',
      '* Top Gun Jetpacker',
      '* Worst jokes award',
      '* Loves medivnyky',
      '* Approches to his duties professionally',
    ],
    secondScreen: Employee,
  },
  {
    monitoring: [
      'MONITORING: palyanyts1a',
      'Notes:',
      '* NO DATA FOUND',
    ],
    secondScreen: '',
  },
  {
    monitoring: [
      'MONITORING: cbtl',
      'Notes:',
      '* SSS+++ class mechanic',
      '* SSS+++ class driver',
      '* Ass burns a lot',
    ],
    secondScreen: Cab,
  },
];

export default function LethalScene({ hidden }) {
  const [message, setMessage] = useState('');
  const [interacting, setInteracting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeScreenIndex, setActiveScreen] = useState(0);

  const activeScreen = CONTENT.length > activeScreenIndex
    ? CONTENT[activeScreenIndex]
    : CONTENT[CONTENT.length - 1]
  
  const camera = useMemo(() => {
    const cameraInstance = new PerspectiveCamera(90, 1.5, 0.1, 1000);
    cameraInstance.position.z = RADIUS * Math.sin(Math.PI)
    cameraInstance.position.y = 20
    cameraInstance.position.x = RADIUS * Math.cos(Math.PI)
    
    cameraInstance.lookAt(1, 10, 0);
    return cameraInstance;
  }, []);


  return (
    <>
      <Canvas
        camera={camera}
        className={hidden ? "opacity-0" : ""}
        style={{ width: window.innerWidth, height: window.innerHeight }}
      >
        <Noise opacity={1} />
        <EffectComposer>
          <SMAA />
          <ChromaticAberration offset={[0.003, 0.0003]} />
          <Noise premultiply blendFunction={BlendFunction.ADD} />
          <Pixelation granularity={2} />
          <Vignette eskil={false} offset={0.3} darkness={0.7} />
        </EffectComposer>
        <Content
          setActiveScreen={setActiveScreen}
          setInteracting={setInteracting}
          setProgress={setProgress}
          interacting={interacting}
          setMessage={setMessage}
          progress={progress}
          content={activeScreen}
        />
      </Canvas>
      <GlitchText className="font-bold z-40 absolute top-28 left-1/2 -translate-x-1/2 text-4xl">
        {message}
      </GlitchText>
      {interacting && activeScreenIndex !== CONTENT.length - 1 && (
        <GlitchText className="font-bold z-40 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-40 h-40">
          <CircularProgressbar
            value={progress}
            styles={buildStyles({
              pathColor: "#B80A01",
            })}
          />
        </GlitchText>
      )}
    </>
  );
}