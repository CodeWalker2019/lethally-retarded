import { useEffect, useState } from 'react';
import LethalScene from './3d/Scene';
import SoundPlayer from './components/SoundPlayer';
import Intro from './components/Intro';

function App() {
  const [displayIntro, setDisplayIntro] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setDisplayIntro(false);
    }, 10000)
  }, []);

  return (
    <div className="App relative">
      <div className='absolute top-0 left-0 w-screen h-screen flex flex-col'>
        <SoundPlayer />
        {displayIntro && <Intro />}
      </div>
      <LethalScene hidden={displayIntro} />
    </div>
  );
}

export default App;
