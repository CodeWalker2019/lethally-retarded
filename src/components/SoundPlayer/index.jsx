import { useEffect, useState } from 'react';
import useSound from 'use-sound';

import SoundIcon from '../../assets/sound.png'
import MutedSoundIcon from '../../assets/mute.png'
import OST from '../../assets/ost.mp3';
import GlitchText from '../GlitchText';
import style from './style.module.scss';

export default function SoundPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [play, { stop }] = useSound(OST, {
    onend: () => setIsPlaying(false),
  });

  const handleToggleSound = () => {
    if (isPlaying) stop();
    else play();
    setIsPlaying(!isPlaying);
  };

  return (
    <GlitchText className='z-30 absolute top-0 left-14 w-7 h-7'>
      <button className={style.soundButton} onClick={handleToggleSound}>
        <img src={isPlaying ? SoundIcon : MutedSoundIcon} alt="sound icon" />
      </button>
    </GlitchText>
  )
}