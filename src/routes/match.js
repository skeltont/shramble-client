import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { useInterval } from '../hooks/useInterval';
import { makeGetRequest } from '../hooks/makeRequest';
import CreateMatch from '../components/CreateMatch.tsx';
import Betting from '../components/Betting';
import Ongoing from '../components/Ongoing';
import Results from '../components/Results';

export default function Match() {
  const [stage, setStage] = useState('pending')
  const [roomCode, setRoomCode] = useState(null)
  const { state } = useLocation();
  const { owner } = state;

  useEffect(() => {
    checkStage()
  }, [])

  const changeStage = (newStage) => {
    setStage(newStage)
  }

  async function checkStage() {
    const response = await makeGetRequest("/room")

    if (response.ok) {
      const { data } = response

      if (data['stage'] !== stage) {
        setStage(data['stage'])
      }
      if (data['room_code'] !== roomCode) {
        setRoomCode(data['room_code'])
      }
    }
  }

  useInterval(async () => {
    checkStage()
  }, 2500)

  return (
    <div className='Match body'>
      <h2>
        {roomCode}
      </h2>
      { stage === 'pending' &&
        <CreateMatch owner={owner} changeStage={changeStage}/>
      }
      { stage === 'betting' &&
        <Betting owner={owner} changeStage={changeStage} />
      }
      { stage === 'ongoing' &&
        <Ongoing owner={owner} changeStage={changeStage} />
      }
      { stage === 'results' &&
        <Results owner={owner} changeStage={changeStage} />
      }
    </div>
  )
}
