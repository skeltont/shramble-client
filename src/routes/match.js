import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ActionCable from 'actioncable';

import CreateMatch from '../components/CreateMatch.tsx';
import Betting from '../components/Betting';
import Ongoing from '../components/Ongoing';
import Results from '../components/Results';

const WEBSOCKET_URL = process.env.REACT_APP_WEBSOCKET_URL;

export default function Match() {
  const [stage, setStage] = useState('pending')
  const { state } = useLocation();
  const { owner, room_stage, room_code } = state;

  const cable = ActionCable.createConsumer(WEBSOCKET_URL)

  function createSubscription() {
    cable.subscriptions.create(
      {
        channel: 'RoomChannel',
        room_code: room_code
      },
      { received: message => handleReceivedMessage(message) }
    )
  }

  function handleReceivedMessage(message) {
    setStage(message['stage'])
  }

  useEffect(() => {
    if (room_stage) setStage(room_stage)
    createSubscription()
  }, [])

  return (
    <div className='Match body'>
      <h2>
        {room_code}
      </h2>
      { stage === 'pending' &&
        <CreateMatch owner={owner} />
      }
      { stage === 'betting' &&
        <Betting owner={owner} />
      }
      { stage === 'ongoing' &&
        <Ongoing owner={owner} />
      }
      { stage === 'results' &&
        <Results owner={owner} />
      }
    </div>
  )
}
