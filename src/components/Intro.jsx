import { Transition } from 'react-transition-group';
import { useRef } from 'react';

import HeadLogo from '../assets/head-icon.png';
import GlitchText from './GlitchText';

const transitionStyles = {
  entering: { opacity: 0 },
  entered:  { opacity: 1 },
  exiting:  { opacity: 1 },
  exited:  { opacity: 0 },
};

const defaultStyle = {
  transition: `opacity 5000ms ease-in-out`,
  opacity: 0,
}

export default function Intro() {
  const nodeRef = useRef(null);

  return (
    <Transition appear nodeRef={nodeRef} in timeout={500}>
      {state => (
          <div
            ref={nodeRef}
            className='z-10 flex flex-col flex-1 gap-4 justify-center items-center'
            style={{
              ...defaultStyle,
              ...transitionStyles[state]
            }}
          >
            <GlitchText>
              <img
                className="w-36"
                alt="Lethal Comapany head logo"
                src={HeadLogo}
              />
            </GlitchText>
            <GlitchText
              className="text-center text-3xl size-fit"
            >
              WELCOME TO THE COMPANY
            </GlitchText>
          </div>
        )
      }
    </Transition>
  )
}