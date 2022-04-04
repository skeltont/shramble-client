import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ReCAPTCHA from "react-google-recaptcha"


import '../style/Home.scss'
import Button from '../components/common/Button.tsx'

import { makePostRequest } from '../hooks/makeRequest'

export default function Home() {
  const [name, setName] = useState('')
  const [roomCode, setRoomCode] = useState('')
  const [join, setJoin] = useState({
    owner: false,
    room_code: null,
    redirect: false
  })
  const [loading, setLoading] = useState('')
  const [recaptchaToken, setRecaptchaToken] = useState('')

  const navigate = useNavigate()

  function handleNameChange(e) {
    setName(e.target.value)
  }

  function handleCodeChange(e) {
    setRoomCode(e.target.value)
  }

  async function handleCreateRoom(e) {
    // TODO Figure out way to not manually toggle loading state
    setLoading('creatingNewRoom')
    const response = await makePostRequest("/room", {
      room: {
        player_name: name,
        recaptcha_token: recaptchaToken
      }
    })
    setLoading('')

    if (response.ok) {
      sessionStorage.setItem('shrambleToken', response.data['token'])
      setJoin({
        owner: response.data['owner'],
        room_code: response.data['room_code'],
        redirect: true
      })
    } else {
      // TODO handle error
    }
  }

  async function handleJoinRoom(e) {
    setLoading('joiningRoom')
    const response = await makePostRequest("/join", {
      room: {
        player_name: name,
        room_code: roomCode,
        recaptcha_token: recaptchaToken
      }
    })
    setLoading('')

    if (response.ok && 'token' in response.data) {
      sessionStorage.setItem('shrambleToken', response.data['token'])
      setJoin({
        owner: response.data['owner'],
        room_code: response.data['room_code'],
        redirect: true,
      })
    } else {
      // TODO handle error
    }
    setLoading('')
  }

  function captchaChange(value) {
    setRecaptchaToken(value)
  }

  useEffect(() => {
    const { owner, room_code, redirect } = join

    if (redirect) {
      navigate('/match', { state: { owner, room_code } })
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
                disabled={!name || roomCode.length !== 8 || !recaptchaToken || loading !== ''}
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
            disabled={!name || roomCode || !recaptchaToken || loading !== ''}
            loading={loading === 'creatingNewRoom'}
          />
        </div>
        <div className='row body mg-top-10'>
          <ReCAPTCHA
            sitekey={process.env.REACT_APP_RECAPTCHA_CLIENT}
            onChange={captchaChange}
            theme='dark'
          />
        </div>
      </div>
    </div>
  )
}
