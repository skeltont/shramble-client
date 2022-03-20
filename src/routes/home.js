import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import '../style/Home.scss';
import Button from '../components/common/Button.js'

import { makePostRequest } from '../hooks/makeRequest';

export default function Home() {
  const [name, setName] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [join, setJoin] = useState({
    owner: false,
    redirect: false
  })
  const [loading, setLoading] = useState('');

  const navigate = useNavigate();

  function handleNameChange(e) {
    setName(e.target.value)
  }

  function handleCodeChange(e) {
    setRoomCode(e.target.value)
  }

  async function handleCreateRoom(e) {
    setLoading('creatingNewRoom')
    let response = await makePostRequest("/room", { room: { player_name: name } })

    console.log(response)
    sessionStorage.setItem('shrambleToken', response.data['token'])
    setJoin({
      owner: response.data['owner'],
      redirect: true 
    })
  }

  function handleJoinRoom(e) {
    setLoading('joiningRoom')
    let data = makePostRequest("/join", {
      room: {
        player_name: name,
        room_code: roomCode
      }
    })
    if ('token' in data) {
      sessionStorage.setItem('shrambleToken', data['token'])
      setJoin({
        owner: data['owner'],
        redirect: true,
      })
    } else {
      // handle error
    }
    setLoading('')
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
              <Button 
                text='Join' 
                onClick={handleJoinRoom}
                className='input-left small' 
                disabled={!name || roomCode.length !== 8 || loading !== ''} 
                loading={loading === 'joiningRoom'} 
              />
            </div>
          </div>
        </div>
        <div className="row body or mg-top-10 mg-bottom-10">
          <div>OR</div>
        </div>
        <div className='row'>
          <Button 
            text="Create new room"
            onClick={handleCreateRoom}
            disabled={!name || loading !== ''} 
            loading={loading === 'creatingNewRoom'}
          />
        </div>
      </div>
    </div>
  );
}