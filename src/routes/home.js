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
      <div className="form">
        <div className="row">
          <div className="input-group">
            <label htmlFor="name">Name </label>
            <input id="name" type="text" placeholder='Who are you' value={name} onChange={handleNameChange} />
          </div>
        </div>
        <div className='row extra-space'>
          <div className="input-group">
            <label htmlFor="roomcode">Room Code </label>
            <div className="flex-row">
              <input id="roomcode" disabled={!name} type="text" className="button-right" placeholder='Enter room code' value={roomCode} onChange={handleCodeChange} />
              <button disabled={!name || roomCode.length !== 8} className='input-left button small' onClick={handleJoinRoom}>Join</button>
            </div>
          </div>
        </div>
        <div className="row body or mg-top-10 mg-bottom-10">
          <div>OR</div>
        </div>
        <div className='row'>
          <button disabled={!name} className="button" onClick={handleCreateRoom}>Create new room</button>
        </div>
      </div>
    </div>
  );
}