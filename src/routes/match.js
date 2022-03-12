import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Betting from '../components/Betting';
import CreateMatch from '../components/CreateMatch';

export default function Match() {
  const [stage, setStage] = useState('pending')
  const { state } = useLocation();
  const { owner } = state;

  const changeStage = (newStage) => {
    setStage(newStage)
  }

  return (
    <div className='Match body'>
      { stage === 'pending' &&
        <CreateMatch owner={owner} changeStage={changeStage}/>
      }
      { stage === 'betting' &&
        <Betting owner={owner} changeStage={changeStage} />
      }
    </div>
  )
}
