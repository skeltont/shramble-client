import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import '../style/Home.scss';

import { makePostRequest } from '../hooks/makeRequest';

export default function Home() {
  const [name, setName] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [join, setJoin] = useState({
    owner: false,
    redirect: false
  })

  const navigate = useNavigate();

  function handleNameChange(e) {
    setName(e.target.value)
  }

  function handleCodeChange(e) {
    setRoomCode(e.target.value)
  }

  function handleCreateRoom(e) {
    makePostRequest("/room", { room: { player_name: name }}, (data) => {
      sessionStorage.setItem('shrambleToken', data['token'])

      setJoin({
        owner: data['owner'],
        redirect: true
      })
    })
  }

  function handleJoinRoom(e) {
    makePostRequest("/join", {
      room: {
        player_name: name,
        room_code: roomCode
      }
    }, (data) => {
      if ('token' in data) {
        sessionStorage.setItem('shrambleToken', data['token'])
      }

      setJoin({
        owner: data['owner'],
        redirect: true,
      })
    })
  }

  useEffect(() => {
    const { owner, redirect } = join;

    if (redirect) {
      navigate('/match', { state: { owner } });
    }
  })

  return (
    <div className="Home body">
      <div className='row'>
        <div>
          <input type="text" className="input-text" placeholder='Who are you' value={name} onChange={handleNameChange} />
        </div>
        <div className='row'>
          <input type="text" className="input-text" placeholder='Enter room code' value={roomCode} onChange={handleCodeChange} />
          <button className='button-small' onClick={handleJoinRoom}>+</button>
        </div>
        <div className='row'>
          <button className="button-wide" onClick={handleCreateRoom}>Create new room</button>
        </div>
      </div>
    </div>
  );
}