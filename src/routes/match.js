import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useInterval } from '../hooks/useInterval';
import CreateMatch from '../components/CreateMatch';
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

  function checkStage() {
    fetch("http://localhost:4000/room", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.getItem('shrambleToken')
      }
    }).then((res) => res.json())
      .then(data => {
        if (data['stage'] !== stage) {
          setStage(data['stage'])
        }
        if (data['room_code'] !== roomCode) {
          setRoomCode(data['room_code'])
        }
      })
      .catch((error) => console.log(error));
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
      { stage === 'onging' &&
        <Ongoing owner={owner} changeStage={changeStage} />
      }
      { stage === 'results' &&
        <Results owner={owner} changeStage={changeStage} />
      }
    </div>
  )
}
